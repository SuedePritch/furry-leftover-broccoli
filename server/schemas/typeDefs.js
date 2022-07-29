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

    #STORES
    stores: [Store]
    store(_id: ID!): Store


    # CATEGORIES
    categories: [Category]
    category(_id: ID!): Category



    # PRODUCTS
    allproducts: [Products]
    products: [Products]
    product(_id: ID!): Products

    # USERS
    user: User


    # ORDER & INVENTORY
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    findAll-adminAddInventory: [AdminAddInventory]
    findOne-adminAddInventory: (_id: ID!): AdminAddInventory
    
}









type Mutation {
    # USER
    addUser(username: String!, email: String! password: String!): Auth
    login(email: String!, password: String!): Auth


    # ORDERS & INVENTORY
    addOrder(products: [ID]!): Order
    sellProduct(_id: ID!, quantity: Int!): Products

    # ADMIN

    ##PRODUCTS

    adminUpdateQuantity(_id: ID!, quantity: Int!): Products
    adminUpdateParStock(_id: ID!, parStock: Int!): Products
    adminUpdatePrice(_id: ID!, price: Int!): Products
    adminUpdateCost(_id: ID!, cost: Int!): Products
    adminUpdateDescription(_id: ID!, description: String!): Products
    adminUpdateName(_id: ID!, name: String!): Products
    adminUpdateProductCategory(_id: ID!, category: [ID]!): Products
    adminDeleteProduct(_id: ID!): Products

    ##CATEGORY

    adminCreateCategory(store: [ID]!): Store
    adminAddRemoveProductFromCategory(_id: ID!, products: [ID]!): Category
    adminCreateProduct(name: String!, description: String!, images: [String], price: Int!, cost: Int!, parStock: Int!, quantity: Int!, category: [ID]! ): Category

    ##ADDINVENTORY

    adminUpdateAddInventory(_id: ID!, products: String!): AdminAddInventory
    adminAddProductAddInventory(_id: ID!, products: String!): AdminAddInventory
    adminSetDeliveryDate(_id: ID!, deliveryDate: String!): AdminAddInventory
    adminDeleteAddInventory(_id: ID!): AdminAddInventory


}

`;

module.exports = typeDefs;
