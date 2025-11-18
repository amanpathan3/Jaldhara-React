const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema({
  monthlySales: [
    { month: String, revenue: Number }
  ],
  dailySales: [
    { date: String, revenue: Number }
  ],
  categorySales: [
    { category: String, revenue: Number }
  ]
});

module.exports = mongoose.model("Dashboard", DashboardSchema);
