import mongoose from 'mongoose';
const product = mongoose.Schema({
    title: String,
    price: Number,
    specification: Array,
    various_size: Array,
    requiredAttachments: Array,
    images: Array,
    user_id: String,
    star : Number,
    count : Number, 
});

const Product = mongoose.model('Products', product);
export default Product;