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

  
export const SELL_PRODUCT = gql`
mutation SellProduct($id: ID!, $quantity: Int!) {
  sellProduct(_id: $id, quantity: $quantity) {
    _id
    quantity
  }
}
`

 export const DELETE_PRODUCT = gql`
 mutation DeleteProduct($id: ID!) {
    deleteProduct(_id: $id) {
      _id
    }
  }
 ` 

 export const CREATE_PRODUCT_ADD_CAT = gql`
 mutation CreateProductAddToCat($name: String!, $description: String!, $images: [String], $price: Float!, $cost: Float!, $parStock: Int!, $quantity: Int!, $category: [ID]!) {
    createProductAddToCat(name: $name, description: $description, images: $images, price: $price, cost: $cost, parStock: $parStock, quantity: $quantity, category: $category) {
      _id
    }
  }
 `

 export const ADD_PRODUCT_DELIVERY = gql`
 mutation AddProductDelivery($quantityInc: Int!, $products: ID!, $delivery: ID!) {
  addProductDelivery(quantityInc: $quantityInc, products: $products, delivery: $delivery) {
    _id
    createdAt
    productItem {
      _id
      quantityInc
      # products {
      #   _id
      #   name
      #   price
      #   cost
      #   parStock
      #   quantity
      # }
      delivery {
        _id
      }
    }
  }
}
 `

 export const UPDATE_PRODUCT_ITEM = gql`
 mutation UpdateProductItem($id: ID!, $isShipped: Boolean, $quantityInc: Int) {
  updateProductItem(_id: $id, isShipped: $isShipped, quantityInc: $quantityInc) {
    _id
    quantityInc
    IsShipped
    products {
      _id
    }
    delivery {
      _id
    }
    inOrder {
      _id
    }
  }
}
 `

 export const REMOVE_DELETE_PRODUCTITEM = gql`
 mutation DeleteProductItem($id: ID!, $delivery: String) {
  deleteProductItem(_id: $id, delivery: $delivery) {
    _id
  }
}
 `




    