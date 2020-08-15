const { gql } = require('apollo-server-express');

const typeDefs = gql`

type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }


  type Subject {
    _id: ID
    subject: String
  }

  type Offering {
    _id: ID
    # name: String
    # description: String
    # image: String
    quantity: Int
    price: Float
    subject: Subject
    userid: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    offerings: [Offering]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    role: String
    tutor: Boolean
    bio: String
    image: String
    location: String
    timezone: String
    orders: [Order]
    feedback: [Feedback]
  }

  type Feedback {
    _id: ID
    feedback: String,
    createdAt: String,
    userId: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(email: String!): User
    subjects: [Subject]
    offerings(subject: ID, name: String): [Offering]
    offering(_id: ID!): Offering 
    offeringbyUserID(userid: String!): Offering 
    feedback: Feedback
    order(_id: ID!): Order
    checkout(offerings: [ID]!): Checkout
  }

  type Mutation {
    singleUpload(file: Upload!): File!,
    singleUploadStream(file: Upload!): File!
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addSubject(subject: String!): Subject
    removeSubject(subjectid: String!): Subject 
    addOrder(products: [ID]!): Order
    #updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateUser(input: userDetails): User
    addOffering(quantity: Int,price: Float,userid: String, subjectid: String) : Offering
    updateOffering(_id: ID!, quantity: Int!): Offering
    login(email: String!, password: String!): Auth
  }

  input userDetails {
    firstName: String
    lastName: String
    email: String
    password: String
    role: String
    tutor: Boolean
    bio: String
    image: String
    location: String
    timezone: String
  }

  # input OfferingDetails {
  #   quantity: Int
  #   price: Float
  #   userid: String
  #   subjectid: subjectid
  # }

 

  type Checkout {
    session: ID
  }
`;

module.exports = typeDefs;
