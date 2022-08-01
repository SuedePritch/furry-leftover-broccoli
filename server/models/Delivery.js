const mongoose = require('mongoose');
const { Schema } = mongoose;

const deliverySchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Products'
        }
    ],
    deliveryDate: {
        type: Date,
        default: ((Date.now())+  86400000*1)
    }
})

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;