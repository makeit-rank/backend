import mongoose from "mongoose";
const product = mongoose.Schema({
  title: String,
  price: Number,
  specification: Object,
  various_size: Array,
  requiredAttachments: Array,
  images: Array,
  user_id: String,
  star: {
    type: Number,
    default: 0,
  },
  count: Number,
  shop_name: String,
  search_key: String,
});

const Product = mongoose.model("Products", product);
export default Product;
