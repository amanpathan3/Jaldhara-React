const express = require("express");
const router = express.Router();
const Category = require("../models/CategorySales");

router.post("/category-sales-update", async (req, res) => {
  try {
    const { products } = req.body;
    const categories = await Category.find();
    const map = new Map(categories.map(c => [c.category, c]));

    products.forEach(prod => {
      const price = Number(prod.finalPrice) || 0;
      const qty = Number(prod.quantity) || 1;
      const revenue = price * qty;

      if (map.has(prod.pCategory)) {
        map.get(prod.pCategory).revenue += revenue;
      }
    });

    for (const c of map.values()) await c.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
