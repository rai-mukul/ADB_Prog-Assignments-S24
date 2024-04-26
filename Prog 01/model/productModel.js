const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    code: {
        type: Number, 
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    main_category: String,
    sub_category: String,
    image: String,
    ratings: Number,
    no_of_ratings: String,
    actual_price: String,
    discount_price: String
});

module.exports = mongoose.model('Product', productSchema, 'products');
