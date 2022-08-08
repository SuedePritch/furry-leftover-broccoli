const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now(),
    },
    productItem: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ProductItem',
        },
    ],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;