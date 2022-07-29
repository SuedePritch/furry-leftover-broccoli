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
    category(_id: ID!): Category
    allproducts: [Products]
    products: [Products]
    product(_id: ID!): Products
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    
}

type Mutation {
addUser(username: String!, email: String! password: String!): Auth
addOrder(products: [ID]!): Order
login(email: String!, password: String!): Auth
sellProduct(_id: ID!, quantity: Int!): Products
addProduct(category: ID!): Category
}

`;

module.exports = typeDefs;
