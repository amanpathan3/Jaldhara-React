const mongoose = require("mongoose");

const CategorySalesSchema = new mongoose.Schema({
  category: { type: String, required: true },
  revenue: { type: Number, required: true }
});

module.exports = mongoose.model("CategorySales", CategorySalesSchema);
