const mongoose = require('mongoose');
const { Schema } = mongoose;

const deliverySchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    productItem: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ProductItem'
        }
    ],
    deliveryDate: {
        type: Date,
        default: ((Date.now())+  86400000*1)
    },
    isComplete: {
        type: Boolean,
        required: true,
        default: false,
    }
})

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;