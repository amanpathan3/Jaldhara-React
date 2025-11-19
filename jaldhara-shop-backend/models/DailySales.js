const mongoose = require("mongoose");

const DailySalesSchema = new mongoose.Schema({
  date: { type: String, required: true },
  totalSales: { type: Number, required: true },
  orders: { type: Number, required: true }
});

module.exports = mongoose.model("DailySales", DailySalesSchema);
