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
      # name
      # description
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

  # mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $tutor:String,  $location: String, $bio: String) {
  #   addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, tutor:$tutor, location: $location, bio:$bio) {
  #     token
  #     user {
  #       _id
  #       # firstName
  #       # lastName
  #       # email
  #       # password
  #       # role
  #       # # tutor
  #       # bio
  #       # image
  #       # location
  #     }
  #   }
  # }
`;


export const UPDATE_USER = gql`
    # mutation updateUser($input: userDetails
    # ) {updateUser(input: $input
    #     ) {
    #       _id
    #       firstName
    #       lastName
    #       email
    #       password
    #       # role
    #       tutor
    #       bio
    #       # image
    #       location
    #       # timezone
    #       # orders {
    #       #   _id
    #       # }
    #       # feedback {
    #       #   _id
    #       # }
    #     }
    # }

    mutation updateUser($input: userDetails) {
      updateUser(input: $input) {
          _id
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
              quantity
              price
              subject {
                _id
                subject
              }
              user
            }
          }
        }
      }
`;


export const ADD_OFFERING = gql`
mutation addOffering($name: String!, $description: String!, $quantity: Int,$price: Float,$userid: String, $subjectid: String) {
  addOffering(name: $name, description: $description, quantity: $quantity,price: $price,userid: $userid, subjectid: $subjectid) {
    name
    description
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


export const UPLOAD_FILE = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

export const UPLOAD_FILE_STREAM = gql`
  mutation SingleUploadStream($file: Upload!) {
    singleUploadStream(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

export const ADD_SUBJECT = gql`
  mutation addSubject($subject: String!) {
   addSubject(subject: $subject) {
    _id
    subject
  }
}
`;

export const REMOVE_SUBJECT = gql`
  mutation removeSubject($subjectid: String!) {
   removeSubject(subjectid: $subjectid) {
    _id
  }
}
`;

