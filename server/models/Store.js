const mongoose = require('mongoose');
const { Schema } = mongoose;

const storeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;