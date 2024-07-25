const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

// Import the router files
const uploadRoutes = require("./routes/uploadRoutes");

// Use the routers
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the PDF upload server!");
});

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
