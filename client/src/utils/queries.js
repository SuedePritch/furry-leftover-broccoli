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
