import gql from 'graphql-tag';

export const QUERY_OFFERINGS = gql`
  query getOfferings($subject: ID) {
    offerings(subject: $subject) {
      _id
      subject
      price
      quantity
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