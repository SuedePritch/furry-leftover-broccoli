const mongoose = require('mongoose');
const { Schema } = mongoose;

const deliverySchema = new Schema({
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
        type: Date
    }
})

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;