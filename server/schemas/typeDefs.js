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

type Order {
    _id: ID
    purchaseDate: String
    products: [Products]
}
type OrderInc {
    _id: ID
    createdAt: {
        type: String
        products: [Products]
        deliveryDate: String
    }
}

type User {
    _id: ID
    username: String
    email: String
    password: String
    creditCard: Int
    isAdmin: Boolean
    premium: Boolean
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
    stores: [Store]
    store(_id: ID!): Store
    categories: [Category]
    products: [Products]
    product(_id: ID!): Products
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    findAll-adminAddInventory: [AdminAddInventory]
    findOne-adminAddInventory: (_id: ID!): AdminAddInventory
    
}

type Mutation {
addUser(username: String!, email: String! password: String!): Auth
addOrder(products: [ID]!): Order
login(email: String!, password: String!): Auth
sellProduct(_id: ID!, quantity: Int!): Products



adminUpdateQuantity(_id: ID!, quantity: Int!): Products
adminUpdateParStock(_id: ID!, parStock: Int!): Products
adminUpdatePrice(_id: ID!, price: Int!): Products
adminUpdateCost(_id: ID!, cost: Int!): Products
adminUpdateDescription(_id: ID!, description: String!): Products
adminUpdateName(_id: ID!, name: String!): Products
adminUpdateProductCategory(_id: ID!, category: [ID]!): Products
adminDeleteProduct(_id: ID!): Products
adminCreateCategory(store: [ID]!): Store
adminAddRemoveProductFromCategory(_id: ID!, products: [ID]!): Category
adminCreateProduct(name: String!, description: String!, images: [String], price: Int!, cost: Int!, parStock: Int!, quantity: Int!, category: [ID]! ): Category
adminUpdateAdminAddInventory(_id: ID!, products: String!): AdminAddInventory
adminAddProductAdminAddInventory(_id: ID!, products: String!): AdminAddInventory
adminSetDeliveryDate(_id: ID!, deliveryDate: String!): AdminAddInventory
adminDeleteAdminAddInventory(_id: ID!): AdminAddInventory
}

`;

module.exports = typeDefs;
