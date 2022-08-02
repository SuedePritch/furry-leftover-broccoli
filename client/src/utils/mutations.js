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
export const UPDATE_PRODUCT_ROW = gql`
mutation UpdateProductRow($id: ID!, $name: String, $description: String, $price: Float, $cost: Float, $parStock: Int, $quantity: Int) {
    updateProductRow(_id: $id, name: $name, description: $description, price: $price, cost: $cost, parStock: $parStock, quantity: $quantity) {
      _id
      cost
      description
      name
      parStock
      price
      quantity
    }
  }
  `

    