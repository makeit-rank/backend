import mongoose from 'mongoose';

const model = mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  password: String,
  address: Array,
});

const User = mongoose.model("User", model);
export default User;