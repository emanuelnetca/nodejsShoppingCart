const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schma is going to define the structure of the documents that we are gonna store

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;