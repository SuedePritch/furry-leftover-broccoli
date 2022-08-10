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
export const GET_ALL_PRODUCTS_ADMIN = gql`
query allProducts {
    allproducts {
      _id
      name
      description
      images
      price
      cost
      parStock
      quantity
      category{
        _id
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

export const GET_ALL_CATEGORIES = gql`
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
export const GET_ALL_CATEGORIES_ADMIN = gql`
query Categories {
  categories {
    _id
    name
    products {
      _id
      name
    }
  }
}
`
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

export const GET_ALL_DELIVERIES = gql`
query Query {
  findAllDelivery {
    _id
    createdAt
    products {
      _id
      name
      cost
      quantity
      parStock
    }
    deliveryDate
  }
}
`
export const GET_DELIVERY_BY_ID = gql`
query Query($id: ID!) {
  findOneDelivery(_id: $id) {
    _id
    createdAt
    products {
      _id
      name
      cost
      quantity
    }
    deliveryDate
  }
}
`


export const GET_SHIPPED_PRODUCTITEM = gql`
query ShippedProductItem($isShipped: Boolean) {
  shippedProductItem(isShipped: $isShipped) {
    _id
    quantityInc
    isShipped
    products {
      _id
      name
      description
      price
      cost
      parStock
      quantity
    }
    delivery {
      _id
    }
  }
}
`

export const GET_NOT_COMPLETE_DELIVERY = gql`
query FindNotCompleteDelivery($isComplete: Boolean) {
  findNotCompleteDelivery(isComplete: $isComplete) {
    _id
    createdAt
    isComplete
    productItem {
      _id
      quantityInc
      isShipped
      products {
        _id
      }
    }
  }
}
`
