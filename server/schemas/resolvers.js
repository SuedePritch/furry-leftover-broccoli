const { User, Store, Category, Order, Products, ProductItem, InOrder, Delivery } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const stripe = require('stripe')('sk_test_51LUdzuAFQla15oHnF33bPTaw63RS6AgoQrH9YAnvQSQdtgcaPpP60LURTy8nCaT6vAcO7iliyLMS8TJXJ1QfGiW100bOquz9EJ');



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


    // order: async (parent, { _id }, context) => {
    //   const user = await User.findById(
    //     {_id: context.user._id}
    //     );

    //   return user.orders.id(_id);
    // },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      console.log("hello")
      const order = new Order({ products: args.products});
      const line_items = [];

      
      // const { products } = await order.populate('products');
      const products = await Promise.all(args.products.map(productID => {
        return Products.findById(productID)
      }))

      for(let i=0; i< products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'cad',
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
      console.log(session);
      return { session: session.id };  
    },


    //INVENTORY
    //GET ALL DELIVERY ORDERS

    findAllDelivery: async (parent, { _id }, context) => {
      // if(context.user.isAdmin){
        return await Delivery.find().populate('products');
      // }
    },

    // GET ONE DELIVERY ORDER
    findOneDelivery: async (parent, { _id }, context) => {
      // if(context.user.isAdmin){
      return await Delivery.findById(_id).populate('products');
      // }
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

    //ADMIN

    //PRODUCTS

    //adds 1 to the quantity
    addQuantity: async ( parent, {_id, quantity}, context) => {
      if(context.user.isAdmin){
      const add = Math.abs(quantity)* 1;
      return await Products.findByIdAndUpdate(_id, { $inc: { quantity: add}}, {new: true});
      }
    },

    //removes 1 from quantity
    removeQuantity: async ( parent, {_id, quantity}, context) => {
      if(context.user.isAdmin){
      const remove = Math.abs(quantity)* 1;
      return await Products.findByIdAndUpdate(_id, { $inc: { quantity: -remove}}, {new: true});
      }
    },

    //update price
    updatePrice: async ( parent, {_id, price}, context) => {
      if(context.user.isAdmin){
      const newPrice = Math.abs(price)
      return await Products.findByIdAndUpdate(_id, { $set: { price: newPrice}}, {new: true});
      }
    },

    //update cost
    updateCost: async ( parent, {_id, cost}, context) => {
      if(context.user.isAdmin){
      const newCost = Math.abs(cost)
      return await Products.findByIdAndUpdate(_id, { $set: { cost: newCost}}, {new: true});
      }
    },

    //update description
    updateDescription: async ( parent, { _id, description }, context) => {
      if(context.user.isAdmin){
      return await Products.findByIdAndUpdate( _id, { $set: {description: description}}, {new: true})
      }
    },

    //update name
    updateName: async ( parent, { _id, name }, context) => {
      if(context.user.isAdmin){
      return await Products.findByIdAndUpdate( _id, { $set: {name: name}}, {new: true})
      }
    },

    // update product's category
    updateCategory: async ( parent, { _id, category}, context) => {
      if(context.user.isAdmin){
      return await Products.findByIdAndUpdate( _id, { $set: {category: category }}, {new: true})
      }
    },

    //delete product
    deleteProduct: async (parent, { _id }, context) => {
      if(context.user.isAdmin){
      return await Products.findByIdAndDelete( _id );
      }
    },
    updateProductRow: async (parent, {_id, quantity, cost, price, description, name, category, parStock}, context) => {
      if(context.user.isAdmin){
      return await Products.findByIdAndUpdate( _id, { $set: {
        name: name, 
        description: description, 
        price: price, 
        cost:cost, 
        parStock: parStock, 
        quantity: quantity, 
        category: category
      }}, { new: true});
    }
    },


    //CATEGORY

    //create category
    createCategory: async (parent, args, context) => {
      // if(context.user.isAdmin){
      return await Category.create(args);
      // }
    },

    //add product to category
    addProductToCat: async (parent, { _id, products }, context) => {
      if(context.user.isAdmin){
      return await Category.findByIdAndUpdate(_id, { $addToSet: {products: products}}, {new: true})
      }
    },

    //remove product from category
    removeProductFromCat: async (parent, products, context) => {
      if(context.user.isAdmin){
      const productId = products._id;
      return await Category.findByIdAndUpdate(_id, {$pull: {products: productId}}, {new: true})
      }
    },

    createProductAddToCat: async( parent, products, context) => {
      if(context.user.isAdmin){
      const newProduct = await Products.create(products);
      return await Category.findByIdAndUpdate(newProduct.category , {$push: {products: newProduct._id}}, {new: true})
      }
    },
    createProduct: async(parent, products, context) => {
      // if(context.user.isAdmin){
      return await Products.create(products);
      // }
    },


  // ADDINVENTORY
  createDelivery: async ( parent, args, context) => {
    // if(context.user.isAdmin){
    return await Delivery.create(args)
    // }
  },
  createProductItem: async ( parent, args, context) => {
    return await ProductItem.create(args)
  },

  // update a delivery
  updateProductItem: async ( parent, { _id,  isShipped, quantity }) => {
    return await ProductItem.findByIdAndUpdate( _id, { $set: { isShipped: isShipped, quantity: quantity }}, {new: true})
  },

  //add product to delivery
  addProductDelivery: async ( parent, productItem) => {
    const newProduct = await ProductItem.create(productItem);
    return await Delivery.findByIdAndUpdate( newProduct.delivery, { $push: { productItem: newProduct._id}}, {new: true})
  },

  //set delivery date
  setDeliveryDate: async ( parent, { _id, deliveryDate }) => {
    return await Delivery.findByIdAndUpdate(_id, { $set: {deliveryDate: deliveryDate}}, {new: true})
  },

  //delete a delivery
  deleteDelivery: async ( parent, { _id }, context) => {
    if(context.user.isAdmin){
    return await Delivery.findByIdAndDelete( _id );
    }
  },
  //remove item from the delivery
  deleteProductItem: async ( parent, { _id }, context) => {
    // if(context.user.isAdmin){
    return await ProductItem.findByIdAndDelete( _id );
    // }
  }
    },
};

module.exports = resolvers;
