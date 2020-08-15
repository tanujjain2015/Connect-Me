import gql from 'graphql-tag';


export const QUERY_OFFERINGS = gql`
  query getOfferings($subject: ID) {
    offerings(subject: $subject) {
      _id
      price
      quantity
      subject
    }
  }
`;

export const QUERY_ALL_OFFERINGS = gql`
  {
    offerings {
     _id
    quantity
    price
    subject {
      _id
      subject
    }
   user
  }
  }
`;

export const QUERY_SUBJECTS = gql`
{
  subjects {
     _id
    subject
  }
}
`;

export const QUERY_USER = gql`
{
  user {
    firstName
    lastName
    orders {
      _id
      purchaseDate
      offerings {
        _id
        name
        description
        price
        quantity
        image
      }
    }
  }
}
`;


export const QUERY_CHECKOUT = gql`
  query getCheckout($offerings: [ID]!) {
    checkout(offerings: $offerings) {
      session
    }
  }
`;

//QUERY_ME
export const QUERY_ME = gql`
  {
    me {
        _id
        firstName
        lastName
        email
        role
        tutor
        bio
        location
        timezone
        orders {
          _id
        }
        feedback {
          _id
        }
  }
`;

export const QUERY_USER_BY_SUBJECT= gql`
{
  user(email: String) {
    firstName
    lastName
    orders {
      _id
      purchaseDate
      offerings {
        _id
        name
        description
        price
        quantity
        image
      }
    }
  }
}
`;

#query user for myprofile
export const QUERY_PROFILE = gql`
query user($email: String!) {
  user(email: $email) {
    _id
    firstName
    lastName
    email
    tutor
    bio
    image
    # orders {
    #   _id
    #   purchaseDate
    # }
  }
}
`;