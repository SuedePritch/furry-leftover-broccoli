import { gql } from '@apollo/client';

export const GET_ME = gql`
query user {
user {
    username
    email
    premium
    orders {
        _id
        purchaseDate
        products {
            name
            price
            cost
        }
    }
    
    }
}
`;
export const GET_ALL_PRODUCTS = gql`
query allProducts {
    products {
        _id
        name
        description
        images
        price
        category {git add
            _id
            name
        }
    }
}
`;

export const GET_SINGLE_CATEGORY = gql`
query Categories {
    categories {
      _id
      name
      products {
        _id
         name
        images
        price
      }
    }
  }
`