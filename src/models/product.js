//models

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
 productDescription: {
    type: String
 }
});


const product = mongoose.model("products", productSchema);

module.exports = product;
