const { AuthenticationError } = require('apollo-server-express');
const { User, Offering, Subject, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc'); //replace with process.env.STRIPE_KEY
const fs = require('fs');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('User')
          // .populate('offerings')
    
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
    offerings: async () => {
      return await Offering.find();
    },
    // offerings: async (parent,{subject} ) => {
    //   const params = {};

    //   if (subject) {
    //     params.subject = subject;
    //   }

    //   if (name) {
    //     params.name = {
    //     $regex: name
    //    };
    //   }

    //   return await Subject.find(params).populate('subject');
    // },
    
    offeringBySubject: async (parent, { subject }) => {
      console.log(subject)
      const params = {};
      params.subject = subject;

      console.log(params);
      return await Offering.find(params);
    },
    offering: async (parent, { _id }) => {
      return await Offering.findById(_id).populate('subject');
    },

    //Retrieve offering by userID
    // offeringbyUserID: async (parent, { userid }, context) => {
    //   return await Offering.find({userid: userid}).populate('subject');
    // },
    
  
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

    // checkout: async (parent, args, context) => {
    //   const order = new Order ({offerings: args.offerings});
    //   const { offerings } = await order.populate('offerings').execPopulate();
    //   const url = new URL(context.headers.referer).origin;

    //   const line_items = [];

    //   for (let i = 0; i < offerings.length; i++) {
    //     // generate offering id
    //     const offering = await stripe.offerings.create({
    //       order : order.id,
    //       // description: offerings[i].description,
    //       // images: [`${url}/images/${offerings[i].image}`]
    //     });

    //     // generate price id using the offering id
    //     const price = await stripe.prices.create({
    //       price: order.price,
    //       unit_amount: offerings[i].price * 100,
    //       currency: 'usd',
    //     });

    //     // add price id to the line items array
    //     line_items.push({
    //       price: price.id,
    //       quantity: 1
    //     });
    //   }

    checkout: async (parent, args, context) => {
      const order = new Order ({offerings: args.offerings});
      const { offerings } = await order.populate('offerings').execPopulate();
      const url = new URL(context.headers.referer).origin;

      const line_items = [];

      for (let i = 0; i < offerings.length; i++) {
        // generate product id
        const offering = await stripe.offerings.create({
          id: offerings[i].id,
          _id: offerings[i]._id,
          price: offerings[i].price,
          quantity: offerings[i].quantity,
          // subject: offerings[i].subject,
          // user: offerings[i].user,
          // name: offerings[i].name,
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

    singleUpload: (parent, args) => {
      console.log(args)
      return args.file.then(file => {
        const {createReadStream, filename, mimetype} = file

        const fileStream = fs.createReadStream(filename)

        fileStream.pipe(fs.createWriteStream(`./uploadedFiles/${filename}`))
        
        return file;
      });
    },

    singleUploadStream: async (parent, args) => {
      console.log(args)
      const file = await args.file
      const {createReadStream, filename, mimetype} = file
      const fileStream = fs.createReadStream(filename)

      //Here stream it to S3
      // Enter your bucket name here next to "Bucket: "
      const uploadParams = {Bucket: 'apollo-file-upload-test', Key: filename, Body: fileStream};
      const result = await s3.upload(uploadParams).promise()

      console.log(result)


      return file;
    },

    addUser: async (parent, args) => {
      console.log(args);
      const user = await User.create(args);
      const token = signToken(user);


      return { token, user };
    },
    updateUser: async (parent, {input}, context) => {
      console.log(input)
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, input, { new: true });
      }

      throw new AuthenticationError('Not logged in');
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
        const updatedSubject = await Subject.findByIdAndDelete(
          { _id: subjectid }
        );
        return updatedSubject;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    addOffering: async (parent, args, context) => {
      console.log(args)
      if (context.user ) {
        const subjectDetails = await Subject.findById(args.subjectid);
        args.subject = subjectDetails;
        // const userDetails = await User.findById(args.userid);
        // console.log(userDetails);
        // args.user = userDetails;

        const offering =  await Offering.create(args);
        return offering;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateOffering: async (parent, args, context) => {
      if (context.user ) {
        console.log(args);
        const offering =  await Offering.findByIdAndUpdate(args._id, args.input, { new: true });
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