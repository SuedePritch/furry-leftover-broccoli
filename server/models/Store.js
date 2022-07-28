const mongoose = require('mongoose');
const { Schema } = mongoose;

const storeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
    },
    category: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
],

});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;