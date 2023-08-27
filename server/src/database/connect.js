require("dotenv").config();
const mongoose = require("mongoose");

const mongoUri = process.env.mongoURI;
console.log("mongouri ", mongoUri)
const connectDB = () => {
  mongoose
    .connect("mongodb+srv://rajshende220802:rajshende2208@cluster0.38tyyow.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
      console.log("MongoDB Connected");
    });
};
module.exports = connectDB;
