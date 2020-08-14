const { gql } = require('apollo-server-express');

const typeDefs = gql`

  # type File {
  #     filename: String!
  #     mimetype: String!
  #     encoding: String!
  #   }


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
    profileImg: String
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
    # singleUpload(file: Upload!): File!
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addSubject(subject: String!): Subject
    removeSubject(_id: ID!): Subject 
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    addOffering(input: OfferingDetails) : Offering
    updateOffering(_id: ID!, quantity: Int!): Offering
    login(email: String!, password: String!): Auth
  }

  input OfferingDetails {
    subjectId: ID
    quantity: Int
    price: Float
    userid: String
  }

  type Checkout {
    session: ID
  }
`;

module.exports = typeDefs;
