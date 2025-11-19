const express = require("express");
const router = express.Router();
const Daily = require("../models/DailySales");

router.post("/daily-sales-update", async (req, res) => {
  try {
    const { date, amount } = req.body;
    if (!date || amount == null) return res.status(400).json({ error: "Date or amount missing" });

    const existing = await Daily.findOne({ date });
    if (existing) {
      existing.revenue += amount / 100;  // amount is in paise
      await existing.save();
    } else {
      await Daily.create({ date, revenue: amount / 100 });
    }

    res.json({ message: "Daily Sales Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
