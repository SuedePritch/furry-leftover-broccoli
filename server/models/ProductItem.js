const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductItemSchema = new Schema({
    quantityInc: {
        type: Number,
        min: 1,
    },
    isShipped: {
        type: Boolean,
        default: false
    },
    products: 
        {
            type: Schema.Types.ObjectId,
            ref: 'Products',
        },
    delivery: {
        type: Schema.Types.ObjectId,
        ref: 'Delivery',
    },
});

const ProductItem = mongoose.model('ProductItem', ProductItemSchema);

module.exports = ProductItem;