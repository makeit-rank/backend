import mongoose from 'mongoose';
const product = mongoose.Schema({
    title: String,
    price: Number,
    specification: Object,
    various_size: Object,
    customizable: Array,
    images: Object,
    user_id: String,
})

const Product = mongoose.model('Products', product);
export default Product;