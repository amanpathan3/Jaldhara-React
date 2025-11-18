const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Your custom ID
  name: String,
  lastPurchaseDate: String,
  products: [
    {
      name: String,
      size: String,
      price: Number,
      qty: Number,
      finalPrice: Number
    }
  ]
});

module.exports = mongoose.model("Customer", CustomerSchema);
