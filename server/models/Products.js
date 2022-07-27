const mongoose = require('mongoose');
const { Schema } = mongoose;

const productsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String
    },
    images : [
        {
            type: String
        }
    ],
    price: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    parStock: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: false,
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }],
});

const Products = mongoose.model('Products', productsSchema);

module.exports = Products;