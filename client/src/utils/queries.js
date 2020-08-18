import gql from 'graphql-tag';

export const QUERY_OFFERINGS = gql`
  query offeringBySubject($subject: ID) {
    offerings(subject: $subject) {
      name
      description
      _id
      price
      quantity
      subject {
        _id
        subject
      }
      # user{
      #   _id
      # }
    }
  }
`;

export const QUERY_USEROFFERINGS = gql`
query searchOffering($name: String) {
  searchOffering(name: $name) {
    name
    price
    quantity
    subject {
      _id
      subject
    }
  }
}
`;


export const QUERY_ALL_OFFERINGS = gql`
  {
    offerings {
      _id
      name
      description
      price
      quantity
      user {
        _id
      }
      subject {
        _id
        subject
      }
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
  users {
    firstName
    lastName
    email
    password
    tutor
    bio
    image
    location
    orders {
      _id
      purchaseDate
      offerings {
        _id
        name
        description
        price
        quantity
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
      tutor
      bio
      tutor
      location
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
        # image
      }
    }
  }
}
`;
//query user for myprofile
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
    location
    orders {
      _id
      purchaseDate
      offerings {
        _id
        name
        description
        quantity
        price
        subject {
          _id
          subject
        }
        user {
          _id
        }
      }
    }
    
  }
}
`;