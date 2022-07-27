const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Store {
    _id: ID
    name: String
    adminId: User
}

type Category {
    _id: ID
    name: String
}

type Products {
    _id: ID
    name: String
    description: String
    images: String
    price: Int
    cost: Int
    parStock: Int
    quanitity: Int
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
    products(category: ID, name: String): [Products]
    product(_id: ID!): Products
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
}

type Mutation {
addUser(username: String!, email: String! password: String!): Auth
addOrder(products: [ID]!): Order
login(email: String!, password: String!): Auth
}

`;

module.exports = typeDefs;
