const mongoose = require('mongoose');
const { Schema } = mongoose;

const InOrderSchema = new Schema({
    createdAt: {
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

const InOrder = mongoose.model('InOrder', InOrderSchema);

module.exports = InOrder;