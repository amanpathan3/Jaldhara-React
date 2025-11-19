const express = require("express");
const router = express.Router();
const Category = require("../models/CategorySales");

router.post("/category-sales-update", async (req, res) => {
  try {
    const { products } = req.body;
    if (!products || !Array.isArray(products)) return res.status(400).json({ error: "Products missing or invalid" });

    // Fetch all categories
    const categories = await Category.find();
    const catMap = new Map();
    categories.forEach(c => catMap.set(c.category, c.revenue * 100)); // store in paise

    products.forEach(p => {
      const category = p.pCategory;
      const price = Math.round(p.finalPrice * 100);
      const qty = Number(p.quantity) || 1;
      const incoming = price * qty;
      const prev = catMap.get(category) || 0;
      catMap.set(category, prev + incoming);
    });

    // Update all categories
    for (const [cat, revPaise] of catMap.entries()) {
      const existing = await Category.findOne({ category: cat });
      if (existing) {
        existing.revenue = revPaise / 100;
        await existing.save();
      } else {
        await Category.create({ category: cat, revenue: revPaise / 100 });
      }
    }

    res.json({ message: "Category Sales Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
