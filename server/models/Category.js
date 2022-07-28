const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trime: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }] 
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
