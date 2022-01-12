import mongoose from "mongoose";
const order = mongoose.Schema({
  product_id: String,
  size: String,
  AttachedFiles: Array,
  user_id: String,
  status: Object,
  created_at: Number,
  product_details: Object,
  seller_details: Object,
});

export default new mongoose.model("Order", order);
