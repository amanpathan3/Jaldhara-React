// const express = require("express");
// const router = express.Router();
// const Category = require("../models/CategorySales");

// router.post("/category-sales-update", async (req, res) => {
//   try {
//     const { products } = req.body;

//     if (!products || !Array.isArray(products)) {
//       return res.status(400).json({ error: "Products missing or invalid" });
//     }

//     // Fetch all categories from DB
//     const categories = await Category.find();

//     // Create map: category -> revenue_in_paise
//     const catMap = new Map();
//     categories.forEach(c => {
//       catMap.set(c.category, Math.round(Number(c.revenue) * 100));
//     });

//     // Add revenue for selected products
//     products.forEach(prod => {
//       const category = prod.pCategory;
//       const price = Math.round(Number(prod.finalPrice) * 100);
//       const qty = Number(prod.quantity) || 1;
//       const incoming = price * qty;

//       const prev = catMap.get(category) || 0;
//       catMap.set(category, prev + incoming);
//     });

//     // Save updates to DB
//     for (const [category, paise] of catMap.entries()) {
//       await Category.findOneAndUpdate(
//         { category },
//         { revenue: paise / 100 },
//         { upsert: true }
//       );
//     }

//     res.json({ message: "Category Sales Updated" });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Category = require("../models/CategorySales");

// POST /api/dashboard/category-sales-update
router.post("/category-sales-update", async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ error: "Products missing or invalid" });
    }

    // Log payload for debugging
    console.log("Selected products for category update:", products);

    // Fetch all categories from DB
    const categories = await Category.find();

    // Create map: category -> revenue in paise
    const catMap = new Map();
    categories.forEach(c => {
      catMap.set(c.category, Math.round(Number(c.revenue) * 100));
    });

    // Process each product
    products.forEach(prod => {
      // Skip invalid products
      if (!prod.pCategory || prod.finalPrice == null || isNaN(prod.finalPrice)) {
        console.warn("Skipping invalid product:", prod);
        return;
      }

      const category = prod.pCategory;
      const price = Math.round(Number(prod.finalPrice) * 100);
      const qty = Number(prod.quantity) || 1;
      const incoming = price * qty;

      const prev = catMap.get(category) || 0;
      catMap.set(category, prev + incoming);
    });

    // Update DB
    for (const [category, paise] of catMap.entries()) {
      await Category.findOneAndUpdate(
        { category },
        { revenue: paise / 100 },
        { upsert: true } // create if not exists
      );
    }

    res.json({ message: "Category Sales Updated" });

  } catch (err) {
    console.error("Category Sales Update Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
