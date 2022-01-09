import mongoose from "mongoose";

const review = mongoose.Schema({
  product_id: String,
  name: String,
  star: Number,
  description: String,
  timestamp: Number,
});
const Review = mongoose.model("Review", review);
export default Review;
