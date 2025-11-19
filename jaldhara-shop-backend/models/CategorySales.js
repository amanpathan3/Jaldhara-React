const mongoose = require("mongoose");

const categorySalesSchema = new mongoose.Schema({
  category: { type: String, required: true },
  revenue: { type: Number, default: 0 },
});

module.exports = mongoose.model("CategorySales", categorySalesSchema);
