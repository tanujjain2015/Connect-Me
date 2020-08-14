const { AuthenticationError } = require('apollo-server-express');
const { User, Offering, Subject, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc'); //replace with process.env.STRIPE_KEY

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('User');
    
        return userData;
      }
    
      throw new AuthenticationError('Not logged in');
    },
        // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('User');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.offerings',
          populate: 'subject'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    subjects: async () => {
      return await Subject.find();
    },
    offerings: async (parent, { subject, name }) => {
      const params = {};

      if (subject) {
        params.subject = subject;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Offering.find(params).populate('subject');
    },
    offering: async (parent, { _id }) => {
      return await Offering.findById(_id).populate('subject');
    },

    //Retrieve offering by userID
    offeringbyUserID: async (parent, { userid }, context) => {
      return await Offering.find({userid: userid}).populate('subject');
    },
    
  
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.offerings',
          populate: 'subject'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },

    checkout: async (parent, args, context) => {
      const order = new Order ({offerings: args.offerings});
      const { offerings } = await order.populate('offerings').execPopulate();
      const url = new URL(context.headers.referer).origin;

      const line_items = [];

      for (let i = 0; i < offerings.length; i++) {
        // generate offering id
        const offering = await stripe.offerings.create({
          name: offering[i].name,
          // description: offerings[i].description,
          // images: [`${url}/images/${offerings[i].image}`]
        });

        // generate price id using the offering id
        const price = await stripe.prices.create({
          offering: offering.id,
          unit_amount: offerings[i].price * 100,
          currency: 'usd',
        });

        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      })

      return { session: session.id}

    }
  },
  
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addSubject: async (parent, args, context) => {
      //console.log(context.user.tutor)
      console.log(args);
      console.log(context.user);
      if (context.user ) {
        const subject = await Subject.create(args);
        console.log(subject);
        return subject;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    removeSubject: async (parent, {subjectid}, context) => {
      if (context.user) {
        //console.log(context.user);
        console.log(subjectid);
        //const bookCreate = await Book.create({ ...input, username: context.user.username });

        const updatedSubject = await Subject.findByIdAndUpdate(
          { _id: subjectid },
          { $pull: {_id: subjectid} },
          { new: true, runValidators: true }
        );
    
        return updatedSubject;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    addOffering: async (parent,  {input}, context) => {
      if (context.user ) {
        //const subjectDetails = await Offering.findById(input.subjectId)
        const offering = await Offering.create(input);
        return offering;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    addOrder: async (parent, { offerings }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ offerings });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
