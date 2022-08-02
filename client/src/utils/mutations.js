import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            username
            password
            email
        }
    }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`
export const CREATE_DELIVERY = gql`
    mutation createDelivery($products: [ID]) {
    createDelivery(products: $products) {
            products {
                _id
            }
  }
}
`

export const ADD_QUANTITY = gql`
mutation AddQuantity($id: ID!, $quantity: Int!) {
    addQuantity(_id: $id, quantity: $quantity) {
      _id
      name
      quantity
    }
  }
`

export const REMOVE_FROM_DELIVERY = gql`
mutation RemoveItemFromDelivery($id: ID!, $products: String!) {
    removeItemFromDelivery(_id: $id, products: $products) {
      _id
      products {
        _id
      }
    }
  }
`

export const DELETE_DELIVERY = gql`
mutation DeleteDelivery($id: ID!) {
    deleteDelivery(_id: $id) {
      _id
    }
  }
`


    