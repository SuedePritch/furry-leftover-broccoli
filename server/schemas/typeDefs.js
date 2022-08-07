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
type: ProductItem {
    _id: ID
    quantity: Int
    IsShipped: Boolean
    products: Products
}

type InOrder {
    _id: ID
    purchaseDate: String
    productItem: [ProductItem]
}
type OutOrder {
    _id: ID
    purchaseDate: String
    productItem: [ProductItem]
}
type Delivery {
    _id: ID
    createdAt: String
    products: [Products]
    deliveryDate: String
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
    productsbycategory: [Products]
    products: [Products]
    product(_id: ID!): Products

    # USERS
    user: User




    # ORDER & INVENTORY
    inOrder(_id: ID!): InOrder
    checkout(productItem: [ID]!, quantity: Int!, products: [ID]!): Order
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
    createDelivery(products:[ID], createdAt:String, deliveryDate: String):Delivery
    updateProductDelivery(_id: ID!, products: String!): Delivery
    addProductDelivery(_id: ID!, products: String!): Delivery
    setDeliveryDate(_id: ID!, deliveryDate: String!): Delivery
    deleteDelivery(_id: ID!): Delivery
    removeItemFromDelivery(_id: ID!, products: String!): Delivery


}

`;

module.exports = typeDefs;
