const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify:false},
  () => {
    console.log("Connected to MongoDB");
  }
);

