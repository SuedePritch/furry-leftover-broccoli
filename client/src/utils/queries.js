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
    allproducts {
        _id
        name
        description
        images
        price
        category {
            _id
            name
        }
    }
}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const GET_SINGLE_PRODUCT = gql`
query product($id: ID!) {
    product(_id: $id) {
        _id
        name
        description
        images
        price
        category {
            _id
            name
        }
    }
  }
`;


export const GET_SINGLE_CATEGORY = gql`
query Category($id: ID!) {
    category(_id: $id) {
      name
      products  {
        _id
        name
        price
        images
      }
    }
  }
`

