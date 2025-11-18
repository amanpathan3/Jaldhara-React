const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Your custom ID
  pName: String,
  pSize: String,
  pPrice: Number,
  pGst: Number,
  pDiscount: Number,
  pFinalPrice: Number,
  pCategory: String
});

module.exports = mongoose.model("Product", ProductSchema);
