const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminAddInventorySchema = new Schema({
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

const AdminAddInventory = mongoose.model('AdminAddInventory', adminAddInventorySchema);

module.exports = AdminAddInventory;