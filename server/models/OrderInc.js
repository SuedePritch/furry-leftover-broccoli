const mongoose = require('mongoose');
const { OrderInc } = require('.');
const { Schema } = mongoose;

const orderIncSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Products'
        }
    ],
    deliveryDate: {
        type: Date,
        default: ((Date.now)+  86400000*1)
    }
})

const OrderInc = mongoose.model('OrderInc', orderIncSchema);

module.exports = OrderInc;