import mongoose from 'mongoose';

const model = mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  password: String,
});

const User = mongoose.model("User", model);
export default User;