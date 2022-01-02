import mongoose from 'mongoose';
// Seller Id,User Id, Gst Id,pickup address,
const seller = mongoose.Schema({
    user_id : String,
    shop_name: String,   
    gst_id : String,
    pickup_address : Object,
    products : Array,
});

export default mongoose.model('Seller', seller);