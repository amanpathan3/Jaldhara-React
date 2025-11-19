const express = require("express");
const router = express.Router();
const Monthly = require("../models/MonthlySales");

router.post("/monthly-sales-update", async (req, res) => {
  try {
    const { month, amount } = req.body;
    let record = await Monthly.findOne({ month });
    if (record) {
      record.revenue += amount / 100;
      await record.save();
    } else {
      await Monthly.create({ month, revenue: amount / 100 });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
