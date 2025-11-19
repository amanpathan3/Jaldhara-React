const mongoose = require("mongoose");

const monthlySalesSchema = new mongoose.Schema({
  month: { type: String, required: true },
  revenue: { type: Number, default: 0 },
});

module.exports = mongoose.model("MonthlySales", monthlySalesSchema);
