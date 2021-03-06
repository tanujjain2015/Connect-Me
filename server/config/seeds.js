const db = require('./connection');
const { User, Subject, Offering, Feedback, Order } = require('../models');

db.once('open', async () => {
  //Feedback Seeds
  // await Feedback.deleteMany();

  // const feedbacks = await Feedback.insertMany([
  //   { feedback: 'This is feedback 1' },
  //   { feedback: 'This is feedback 2' },
  //   { feedback: 'This is feedback 3' },
  //   { feedback: 'This is feedback 4' },
  //   { feedback: 'This is feedback 5' }
  // ]);
  // console.log('feedback seeded');

  //Subject Seeds
  await Subject.deleteMany();

  const subjects = await Subject.insertMany([
    { 
      subject: 'Computer Science',
      _id: '5f3ca2bc002bf133b95fb974'
    },
    { subject: 'Science',
      _id: '5f3ca2bc002bf133b95fb975' 
    },
    { 
      subject: 'Math',
      _id: '5f3ca2bc002bf133b95fb976' 
    },
    { subject: 'Biology',
      _id: '5f3ca2bc002bf133b95fb977' 
    },
    { subject: 'Geography',
      _id: '5f3ca2bc002bf133b95fb978'
    },
    { subject: 'Foreign Languages',
    _id: '5f3d3d583b77278add543cbc'
  }

  ]);

  console.log('subjects seeded');


//User seeds
  await User.deleteMany();

  const users = await User.create(
    {
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    tutor: true,
    bio: "filling it up for time being",
    image: "TBD",
    location: "AMER",
    // timezone: "UTC",
    // orders: [ //need to change the name in the schema
    //   {
    //     // products: [products[0]._id, products[0]._id, products[1]._id]
    //   }
    // ],
    // feedback: [
    //   {
    //     feedbacks: [feedbacks[0]._id, feedbacks[3]._id]
    //   }
    // ]

  },

 {
  firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    tutor: false,
    bio: "filling it up for time being",
    image: "TBD",
    location: "APAC",
    // timezone: "UTC + 3",
    // orders: [
    //   {
    //      ordervalues: [offerings[0]._id, offerings[1]._id, offerings[2]._id]
    //   }
    //]
  }
  
  );
 console.log('users seeded');

  //Offering Seeds
  await Offering.deleteMany();

  const offerings = await Offering.insertMany([
    { 
      name: "React beginners",
      description: "This class will help you have an idea of how React.js works",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 90.00,
      quantity: 1,
      user: users[0]._id,
      subject: {
        _id: subjects[0]._id,
        subject: subjects[0].subject
      }
      // ,subjects[0]._id,
      // subject: subjects[0].subject
    },
    { 
      name: "Angular JS",
      description: "This class will help you have an idea of how Angular.js works",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 210.00,
      quantity: 1,
      user: users[0]._id,
      subject: {
        _id: subjects[0]._id,
        subject: subjects[0].subject
      }
      // ,subjects[0]._id,
      // subject: subjects[0].subject
    },
    { 
      name: "Javascript Basics",
      description: "Covers the basics of Javascript. Needs prior knowledge of HTML and CSS",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 110.00,
      quantity: 1,
      user: users[0]._id,
      // subject: subjects[1]._id,
      // subject: subjects[1].subject
      subject: {
        _id: subjects[1]._id,
        subject: subjects[1].subject
      }
    },
    { 
      name: "Introduction to physics",
      description: "An introductory course which focuses on Physis theorems",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 110.00,
      quantity: 1,
      user: users[0]._id,
      // subject: subjects[1]._id,
      // subject: subjects[1].subject
      subject: {
        _id: subjects[1]._id,
        subject: subjects[1].subject
      }
    },
    {
      name: "Algebra Advanced",
      description: "Covers the advance levels of Algebra. Needs prior knowledge of theorems and formulae",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 190.00,
      quantity: 1,
      user:users[0]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[2]._id,
        subject: subjects[2].subject
      }
    },
    {
      name: "Integration beginners",
      description: "Intoductory course to Mathematics Integration.",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 190.00,
      quantity: 1,
      user:users[0]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[2]._id,
        subject: subjects[2].subject
      }
    },
    {
      name: "Biology Basics",
      description: "Covers the basic level of Biology concepts. No prior knowledge needed.",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 100.00,
      quantity: 10,
      user:users[0]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[3]._id,
        subject: subjects[3].subject
      }
    },
    {
      name: "Life Science concentration",
      description: "Interdisciplinary course for Careers in Medicine or Public health",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 210.00,
      quantity: 10,
      user:users[0]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[3]._id,
        subject: subjects[3].subject
      }
    },
    {
      name: "GIS, Mapping, and Spatial Analysis",
      description: "Focuses on concepts, tools, and techniques to make great maps",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 200.00,
      quantity: 10,
      user:users[0]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[4]._id,
        subject: subjects[4].subject
      }
    },
    {
      name: "Geographical Information Systems - Part 1",
      description: "Theoretical and practical foundations of geographic information systems(GIS)",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 200.00,
      quantity: 10,
      user:users[0]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[4]._id,
        subject: subjects[4].subject
      }
    },
    {
      name: "German - Level A1",
      description: "Covers the basics of German Language. Achieved level after the completion of this course will be A1.",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 130.00,
      quantity: 20,
      user:users[0]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[5]._id,
        subject: subjects[5].subject
      }
    },
    {
      name: "Spanish - Level A1",
      description: "Covers the basics of Spanish Language. Achieved level after the completion of this course will be A1.",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 130.00,
      quantity: 20,
      user:users[1]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[5]._id,
        subject: subjects[5].subject
      }
    },
    {
      name: "Portuguese - Level A1",
      description: "Covers the basics of Portuguese Language. Achieved level after the completion of this course will be A1.",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 130.00,
      quantity: 20,
      user:users[1]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[5]._id,
        subject: subjects[5].subject
      }
    },
    {
      name: "English - Level A1",
      description: "Covers the basics of English Language. Achieved level after the completion of this course will be A1.",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 130.00,
      quantity: 20,
      user:users[0]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[5]._id,
        subject: subjects[5].subject
      }
    },
    {
      name: "French - Level A1",
      description: "Covers the basics of French Language. Achieved level after the completion of this course will be A1.",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 130.00,
      quantity: 20,
      user:users[0]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[5]._id,
        subject: subjects[5].subject
      }
    },
    {
      name: "Italian - Level A1",
      description: "Covers the basics of Italian Language. Achieved level after the completion of this course will be A1.",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 130.00,
      quantity: 20,
      user:users[1]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[5]._id,
        subject: subjects[5].subject
      }
    },
    {
      name: "Slovakian - Level A1",
      description: "Covers the basics of Slovakian Language. Achieved level after the completion of this course will be A1.",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 130.00,
      quantity: 20,
      user:users[0]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[5]._id,
        subject: subjects[5].subject
      }
    },
    {
      name: "Hungarian - Level A1",
      description: "Covers the basics of Hungarian Language. Achieved level after the completion of this course will be A1.",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 130.00,
      quantity: 20,
      user:users[0]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[5]._id,
        subject: subjects[5].subject
      }
    },
    {
      name: "Hindi - Level A1",
      description: "Covers the basics of Hindi Language. Achieved level after the completion of this course will be A1.",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 130.00,
      quantity: 20,
      user:users[0]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[5]._id,
        subject: subjects[5].subject
      }
    },
    {
      name: "Czech - Level A1",
      description: "Covers the basics of Czech Language. Achieved level after the completion of this course will be A1.",
      image:"https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082014/js1_0.png?itok=9fCD5b30",
      price: 130.00,
      quantity: 20,
      user:users[1]._id,
      // subject: subjects[2]._id, 
      // subject: subjects[2].subject
      subject: {
        _id: subjects[5]._id,
        subject: subjects[5].subject
      }
    }
    // {
    //   name: '',
    //   price: 90.00,
    //   quantity: 1,
    //   subject: subjects[3]._id
    // },
    // {
    //   name: '',
    //   price: 90.00,
    //   quantity: 1,
    //   subject: subjects[4]._id
    // },
    // {
    //   name: '',
    //   price: 90.00,
    //   quantity: 1,
    //   subject: subjects[0]._id
    // },
    // {
    //   name: '',
    //   price: 90.00,
    //   quantity: 1,
    //   subject: subjects[0]._id
    // },
    // {
    //   name: '',
    //   price: 90.00,
    //   quantity: 1,
    //   subject: subjects[0]._id
    // },
    // {
    //   name: '',
    //   price: 90.00,
    //   quantity: 1,
    //   subject: subjects[0]._id
    // },
    // {
    //   name: '',
    //   price: 90.00,
    //   quantity: 1,
    //   subject: subjects[0]._id
    // },
    // {
    //   name: '',
    //   price: 90.00,
    //   quantity: 1,
    //   subject: subjects[0]._id
    // },
    // {
    //   name: '',
    //   price: 90.00,
    //   quantity: 1,
    //   subject: subjects[0]._id
    // }
  ]);

  console.log('offerings seeded');


  // //Order Seeds
  // await Order.deleteMany();

  // const ordervalues = await Order.insertMany([
  //   {
  //     purchaseDate: '',
  //     offerings: [ //need to change the name in the schema
  //       {
  //         offerings: [offerings[0]._id, offerings[1]._id]
  //       }
  //     ]
  //   }
  // ]);

  // console.log('orders seeded');



  process.exit();
});
