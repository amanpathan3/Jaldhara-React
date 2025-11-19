const mongoose = require("mongoose");

const dailySalesSchema = new mongoose.Schema({
  date: { type: String, required: true },
  revenue: { type: Number, default: 0 },
});

module.exports = mongoose.model("DailySales", dailySalesSchema);
