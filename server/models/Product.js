import mongoose from 'mongoose';
const product = mongoose.Schema({
    title: String,
    price: Number,
    specification: Array,
    various_size: Array,
    curstomizable: Array,
    images: Array,
    seller_id: String,
})
