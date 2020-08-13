const { AuthenticationError } = require('apollo-server-express');
const { User, Offering, Subject, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc'); //replace with process.env.STRIPE_KEY

const resolvers = {
  Query: {
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

        // generate price id using the product id
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
    updateOffering: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Offering.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
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
