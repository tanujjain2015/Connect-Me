import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const ADD_ORDER = gql`
  mutation addOrder($offerings: [ID]!) {
    addOrder(offerings: $offerings) {
      purchaseDate
      offerings {
        _id
      name
      description
      price
      quantity
      subject {
        name
      } 
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const UPDATE_USER = gql`
    mutation updateUser(
        $input: userDetails
    ) {
      updateUser(
        input: $input
        ) {
          _id
          firstName
          lastName
          email
          password
          role
          tutor
          bio
          image
          location
          timezone
          orders {
            _id
          }
          feedback {
            _id
          }
        }
    }
`;