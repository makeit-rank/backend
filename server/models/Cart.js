import mongoose from "mongoose";
const cart = mongoose.Schema({
  product_id: String,
  size: String,
  attachedFiles: Array,
  user_id: String,
  product_details: Object,
});

const Cart = new mongoose.model("Cart", cart);
export default Cart;
