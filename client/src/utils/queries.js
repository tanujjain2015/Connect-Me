import gql from 'graphql-tag';

export const QUERY_OFFERINGS = gql`

  # query{
  #     me {
  #     _id
  #     firstName
  #     LastName
  #     email
  #     role
  #     tutor
  #     bio
  #     image
  #     location
  #     timezone
  #     orders
  #     feedback
  #     savedBooks {
  #         _id
  #         bookId
  #         authors
  #         image
  #         link
  #         title
  #     }
  #     }
  #   }

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
      name
      description
      price
      quantity
      subject {
        name
      }
    }
  }
`;

export const QUERY_SUBJECTS = gql`
{
  subjects {
    _id
    # name
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
      tutor
      bio
      # orders {
      #   _id
      #   purchaseDate
      # }
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
    # orders {
    #   _id
    #   purchaseDate
    # }
  }
}
`;