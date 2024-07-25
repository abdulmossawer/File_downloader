const mongoose = require("mongoose");
require("dotenv").config();

// Define the MongoDB connection URL
const uri = process.env.MONGO_URI; // Replace 'mydatabase' with your database name

if (!uri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
