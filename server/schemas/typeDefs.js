const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Subject {
    _id: ID
    name: String
  }

  type Offering {
    _id: ID
    # name: String
    # description: String
    # image: String
    quantity: Int
    price: Float
    subject: Subject
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
    orders: [Order]
    feedback: [Feedback]
  }

  type Feedback {
    _id: ID
    feedback: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    subjects: [Subject]
    offerings(subject: ID, name: String): [Offering]
    offering(_id: ID!): Offering 
    user: User
    feedback: Feedback
    order(_id: ID!): Order
    checkout(offerings: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(offerings: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateOffering(_id: ID!, quantity: Int!): Offering
    login(email: String!, password: String!): Auth
  }

  type Checkout {
    session: ID
  }
`;

module.exports = typeDefs;
