const { User, Store, Category, Order, Products } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');



const resolvers = {
  Query: {
    //STORE

    // All Stores
    stores: async () => {
      return await Store.find().populate('category').populate('adminId');
    },

    //Single Store
    store: async (parent, { _id }, context) => {
      return await Store.findById(_id).populate('category').populate('adminId')
    },





    //CATEGORY

    //All Categories
    categories: async () => {
      return await Category.find().populate('products');
    },

    //Single Category
    category: async (parent, { _id }) => {
      return await Category.findById(_id).populate('products')
    },






    //PRODUCTS
    //All Products
    allproducts:async (parent) =>{
      return await Products.find({})
    },

     //Single Product
      product: async (parent, { _id }) => {
      return await Products.findById({_id});
    },

    //Products by Category or Name
    //products is a lousy name for this but here we are
    products: async (parent, {category, name}) => {
      const params = {};
      if(category) {
        params.category = category;
      }
      if (name) {
        params.name = {
          $regex: name
        };
      }
      return await Products.find(params).populate('category');
    },
      





    //USER
    //Single User
    user: async (parent, { _id }, context)=> {  
      if (context.user) {
      return User.findOne({
          _id: context.user._id 
          });
      }
      throw new AuthenticationError('You need to be logged in! resolvers');
  
    },





    //SHOPPING CART & STRIPE
    //Cart for user
    order: async (parent, { _id }, context) => {
      const user = await User.findById(
        {_id: context.user._id}
        );

      return user.orders.id(_id);
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products});
      const line_items = [];

      const { products } = await order.populate('products');

      for(let i=0; i< products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'cdn',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };  
    }
    
  },






  Mutation: {
    //USER
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },





    //ORDERS AND INVENTORY
    addOrder: async (parent, { products }, context) => {
      if(context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order }});

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    sellProduct: async (parent, {_id, quantity}) => {
      const decrement = Math.abs(quantity)* -1;
      return await Products.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true});
    },

    },
};






module.exports = resolvers;
