const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://a7mdM7mud:6420052042004@ahmedtrika.0laoncq.mongodb.net/?retryWrites=true&w=majority&appName=ahmedTrika"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
