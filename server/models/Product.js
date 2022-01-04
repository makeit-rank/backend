import mongoose from 'mongoose';
const product = mongoose.Schema({
    title: String,
    price: Number,
    specification: Array,
    various_size: Array,
    customizable: Array,
    images: Array,
    user_id: String,
})

const Product = mongoose.model('Products', product);
export default Product;