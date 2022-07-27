const { User, Store, Category, Order, Products } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');



const resolvers = {
  Query: {
    stores: async () => {
      return await Store.find();
    },
    store: async (parent, { _id }) => {
      return await Store.findById(_id)
    },
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, {category, name}) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = name
      }

     return await Products.find(params).populate('category'); 
    },
    product: async (parent, { _id }) => {
      return await Products.findById(_id).populate('category');
    },
    user: async (parent, args)=> {
      const user = await User.findById(user._id).populate({
        path: 'orders.products',
        populate: 'category'
      });

      user.orders.sort((a,b) => b.purchaseDate = a.purchaseDate);

      return user
    },
    order: async (parent, { _id }) => {
      const user = await User.findById(user._id).populate({
        path: 'orders.products',
        populate: 'category'
      });

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
    }

    },
};

module.exports = resolvers;
