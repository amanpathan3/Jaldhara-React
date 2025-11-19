const express = require("express");
const router = express.Router();
const Daily = require("../models/DailySales");

// POST /api/dashboard/daily-sales-update
router.post("/daily-sales-update", async (req, res) => {
  try {
    const { date, amount } = req.body;
    let record = await Daily.findOne({ date });
    if (record) {
      record.revenue += amount / 100;
      await record.save();
    } else {
      await Daily.create({ date, revenue: amount / 100 });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
