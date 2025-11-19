const express = require("express");
const router = express.Router();
const Category = require("../models/CategorySales");

router.post("/category-sales-update", async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ error: "Products missing or invalid" });
    }

    // Fetch existing categories and convert to paise
    const categories = await Category.find();
    const catMap = new Map();
    categories.forEach(c => catMap.set(c.category, c.revenue * 100));

    // Update incoming product revenue
    products.forEach(p => {
      const category = p.pCategory;
      const price = Math.round(Number(p.pPrice) * 100);  // FIXED
      const qty = Number(p.quantity) || 1;               // FIXED

      if (!category || isNaN(price)) {
        console.log("Invalid product received:", p);
        return;
      }

      const incoming = price * qty;
      const previous = catMap.get(category) || 0;

      catMap.set(category, previous + incoming);
    });

    // Save updated data to DB
    for (const [category, paiseRevenue] of catMap.entries()) {
      await Category.findOneAndUpdate(
        { category },
        { revenue: paiseRevenue / 100 },
        { upsert: true }
      );
    }

    res.json({ message: "Category Sales Updated" });

  } catch (err) {
    console.error("Category Sales Update Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
