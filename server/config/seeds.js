const db = require('./connection');
const { User, Subject, Offering, Feedback, Order } = require('../models');

db.once('open', async () => {
  //Feedback Seeds
  await Feedback.deleteMany();

  const feedbacks = await Feedback.insertMany([
    { feedback: '' },
    { feedback: '' },
    { feedback: '' },
    { feedback: '' },
    { feedback: '' }
  ]);

  console.log('feedback seeded');

  //Subject Seeds
  await Subject.deleteMany();

  const subjects = await Subject.insertMany([
    { name: 'Computer Science' },
    { name: 'Science' },
    { name: 'Maths' },
    { name: 'Biology' },
    { name: 'Geography' }
  ]);

  console.log('subjects seeded');

//Offering Seeds
  await Offering.deleteMany();

  const offerings = await Offering.insertMany([
    {
      name: '',
      price: 90.00,
      quantity: 1,
      subject: subjects[0]._id
    },
    {
      name: '',
      price: 90.00,
      quantity: 1,
      subject: subjects[1]._id
    },
    {
      name: '',
      price: 90.00,
      quantity: 1,
      subject: subjects[2]._id
    },
    {
      name: '',
      price: 90.00,
      quantity: 1,
      subject: subjects[3]._id
    },
    {
      name: '',
      price: 90.00,
      quantity: 1,
      subject: subjects[4]._id
    },
    {
      name: '',
      price: 90.00,
      quantity: 1,
      subject: subjects[0]._id
    },
    {
      name: '',
      price: 90.00,
      quantity: 1,
      subject: subjects[0]._id
    },
    {
      name: '',
      price: 90.00,
      quantity: 1,
      subject: subjects[0]._id
    },
    {
      name: '',
      price: 90.00,
      quantity: 1,
      subject: subjects[0]._id
    },
    {
      name: '',
      price: 90.00,
      quantity: 1,
      subject: subjects[0]._id
    },
    {
      name: '',
      price: 90.00,
      quantity: 1,
      subject: subjects[0]._id
    },
    {
      name: '',
      price: 90.00,
      quantity: 1,
      subject: subjects[0]._id
    }
  ]);

  console.log('offerings seeded');

  //Order Seeds
  await Order.deleteMany();

  const orders = await Order.insertMany([
    {
      purchaseDate: '',
      offerings: [ //need to change the name in the schema
        {
          offerings: [offerings[0]._id, offerings[1]._id]
        }
      ]
    }
  ]);

  console.log('orders seeded');



//User seeds
  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [ //need to change the name in the schema
      {
        // products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
