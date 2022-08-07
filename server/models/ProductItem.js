const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductItemSchema = new Schema({
    quantity: {
        type: Number,
        min: 1,
    },
    IsShipped: {
        type: Boolean,
        default: false
    },
    products: 
        {
            type: Schema.Types.ObjectId,
            ref: 'Products',
        },
});

const ProductItem = mongoose.model('ProductItem', ProductItemSchema);

module.exports = ProductItem;