const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  amount: Number,
  picture: String,
  category: String,
  description: String
});
const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
