import mongoose from 'mongoose'

const review =  mongoose.Schema({
    product_id : String,
    name: String,
    star:Number,
    headline : String,
    images : Array,
    description : String,
    timestamp : String
})
const Review = mongoose.model('Review', review);
export default Review;