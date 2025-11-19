const express = require("express");
const router = express.Router();

const Daily = require("../models/DailySales");
const Monthly = require("../models/MonthlySales");
const Category = require("../models/CategorySales");

// GET Dashboard Data
router.get("/", async (req, res) => {
  try {
    const daily = await Daily.find();
    const monthly = await Monthly.find();
    const category = await Category.find();

    res.json({ daily, monthly, category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
