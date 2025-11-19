const mongoose = require("mongoose");

const MonthlySalesSchema = new mongoose.Schema({
  month: { type: String, required: true },
  revenue: { type: Number, required: true }
});

module.exports = mongoose.model("MonthlySales", MonthlySalesSchema);
