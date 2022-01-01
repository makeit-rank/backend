const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

const model = mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  password: String,
});

export const User = mongoose.model("User", model);
