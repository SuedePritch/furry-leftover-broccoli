const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Store {
    _id: ID
    name: String
    adminId: User
    category: [Category]
}

type Category {
    _id: ID
    name: String
    products: [Products]
}

type Products {
    _id: ID
    name: String
    description: String
    images: [String]
    price: Float
    cost: Float
    parStock: Int
    quantity: Int
    category: [Category]
}


type ProductItem {
    _id: ID
    quantity: Int
    IsShipped: Boolean
    products: Products
    delivery: Delivery
    inOrder: InOrder
}


type InOrder {
    _id: ID
    purchaseDate: String
    productItem: [ProductItem]
}
type Order {
    _id: ID
    purchaseDate: String
    productItem: [ProductItem]
}
type Delivery {
    _id: ID
    createdAt: String
    productItem: [ProductItem]
    deliveryDate: String
}

type User {
    _id: ID
    username: String
    email: String
    password: String
    creditCard: Int
    isAdmin: Boolean
    isWarehouse: Boolean
    orders: [Order] 
}

type Checkout {
    session: ID
}

type Auth {
    token: ID!
    user: User
}








type Query {

    #STORES
    stores: [Store]
    store(_id: ID!): Store


    # CATEGORIES
    categories: [Category]
    category(_id: ID!): Category



    # PRODUCTS
    allproducts: [Products]
    productsbycategory: [Products]
    products: [Products]
    product(_id: ID!): Products

    # USERS
    user: User




    # ORDER & INVENTORY
    findAllInOrder: [InOrder]
    inOrder(_id: ID!): InOrder
    checkout(products: [ID]!): Checkout
    findAllDelivery: [Delivery]
    findOneDelivery (_id: ID!): Delivery
    
}









type Mutation {
    # USER
    addUser(username: String!, email: String! password: String!): Auth
    login(email: String!, password: String!): Auth


    # ORDERS & INVENTORY
    addOrder(products: [ID]!): Order
    sellProduct(_id: ID!, quantity: Int!): Products

    # ADMIN

    #PRODUCTS

    addQuantity(_id: ID!, quantity: Int!): Products
    removeQuantity(_id: ID!, quantity: Int!): Products
    updatePrice(_id: ID!, price: Float!): Products
    updateCost(_id: ID!, cost: Float!): Products
    updateDescription(_id: ID!, description: String!): Products
    updateName(_id: ID!, name: String!): Products
    updateCategory(_id: ID!, category: [ID]!): Products
    deleteProduct(_id: ID!): Products
    updateProductRow(_id: ID!, name: String, description: String, images: [String], price: Float, cost: Float, parStock: Int, quantity: Int, category: [ID]): Products      


    #CATEGORY

    createCategory(name: String!, products: [ID]): Category
    addProductToCat(_id: ID!, products: [ID]!): Category
    removeProductFromCat(_id: ID!, products: [ID]!): Category
    createProductAddToCat(name: String!, description: String!, images: [String], price: Float!, cost: Float!, parStock: Int!, quantity: Int!, category: [ID]! ): Category
    createProduct(name: String, description: String, images: [String], price: Float, cost: Float, parStock: Int, quantity: Int, category: [ID]): Products

    ##ADDINVENTORY
    createProductItem(quantity: Int, products: ID!, delivery: ID, inOrder: ID): ProductItem
    createDelivery(productItem:[ID], createdAt:String, deliveryDate: String):Delivery
    updateProductDelivery(_id: ID!, productItem: [ID]!): Delivery

    addProductDelivery(quantity: Int!, isShipped: Boolean, products: ID!, delivery: ID!): Delivery
    setDeliveryDate(_id: ID!, deliveryDate: String!): Delivery
    deleteDelivery(_id: ID!): Delivery
    removeItemFromDelivery(_id: ID!, productItem: ID!): Delivery

    createInOrder(productItem:[ID], createdAt:String): InOrder
    updateProductInOrder(_id: ID!, productItem: [ID]!): InOrder
    removeProductInOrder(_id: ID!, productItem: ID!): InOrder
    deleteProductInOrder(_id: ID!): InOrder
    deleteProductItem(_id: ID!): ProductItem
    updateProductItem(_id: ID!, isShipped: Boolean, quantity: Int): ProductItem


}

`;

module.exports = typeDefs;
