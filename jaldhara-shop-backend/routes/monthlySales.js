const express = require("express");
const router = express.Router();
const Monthly = require("../models/MonthlySales");

router.post("/monthly-sales-update", async (req, res) => {
  try {
    const { month, amount } = req.body;
    if (!month || amount == null) return res.status(400).json({ error: "Month or amount missing" });

    const existing = await Monthly.findOne({ month });
    if (existing) {
      existing.revenue += amount / 100;
      await existing.save();
    } else {
      await Monthly.create({ month, revenue: amount / 100 });
    }

    res.json({ message: "Monthly Sales Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
