const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  url: String,
  filename: String,
  type: String,
});

//Create a file model
const File = mongoose.model("File", fileSchema);
module.exports = File;
