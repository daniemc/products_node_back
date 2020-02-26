const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3
    }
}, {
    timestamps: true
});

const product = mongoose.model('product', productSchema);

module.exports = product