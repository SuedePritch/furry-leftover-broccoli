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
