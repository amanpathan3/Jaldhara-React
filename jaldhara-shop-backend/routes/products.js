
// const express = require("express");
// const router = express.Router();
// const Product = require("../models/productModel");

// // GET all products
// router.get("/", async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// // POST - Add new product
// router.post("/", async (req, res) => {
//   const last = await Product.findOne().sort({ id: -1 });
//   const newId = last ? last.id + 1 : 1;

//   const newProduct = new Product({ id: newId, ...req.body });
//   await newProduct.save();

//   res.json({ message: "Product added", product: newProduct });
// });

// // PUT - Update product
// router.put("/:id", async (req, res) => {
//   const updated = await Product.findOneAndUpdate(
//     { id: req.params.id },
//     req.body,
//     { new: true }
//   );

//   if (!updated) return res.status(404).json({ message: "Product not found" });
//   res.json({ message: "Product updated", product: updated });
// });

// // UPDATE STOCK
// router.put("/stock/:id", async (req, res) => {
//   try {
//     const { addStock } = req.body;

//     if (addStock === undefined)
//       return res.status(400).json({ message: "addStock is required" });

//     const product = await Product.findOne({ id: req.params.id });

//     if (!product)
//       return res.status(404).json({ message: "Product not found" });

//     product.pStock = product.pStock + Number(addStock);
//     await product.save();

//     res.json({
//       message: "Stock updated",
//       updatedStock: product.pStock,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Error updating stock" });
//   }
// });

// // DELETE
// router.delete("/:id", async (req, res) => {
//   const deleted = await Product.findOneAndDelete({ id: req.params.id });

//   if (!deleted) return res.status(404).json({ message: "Product not found" });
//   res.json({ message: "Product deleted" });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET UNIQUE PRODUCT NAMES (No duplicate names)
router.get("/unique-names", async (req, res) => {
  try {
    const names = await Product.distinct("pName");
    res.json(names);
  } catch (err) {
    res.status(500).json({ message: "Error fetching names" });
  }
});

// UPDATE DISCOUNT BY PRODUCT NAME (All sizes)
router.put("/update-discount", async (req, res) => {
  try {
    const { productName, discount } = req.body;

    if (!productName || discount === undefined) {
      return res.status(400).json({ message: "productName and discount required" });
    }

    const products = await Product.find({ pName: productName });

    if (products.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    for (let product of products) {
      const price = product.pPrice;

      // GST amount
      const gstAmount = (price * product.pGst) / 100;

      // Discount amount
      const discountAmount = (price * discount) / 100;

      // Final price formula
      const finalPrice = price + gstAmount - discountAmount;

      product.pDiscount = discount;
      product.pFinalPrice = finalPrice;

      await product.save();
    }

    res.json({ message: "Discount updated for all product sizes" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating discount" });
  }
});


// POST - Add new product
router.post("/", async (req, res) => {
  const last = await Product.findOne().sort({ id: -1 });
  const newId = last ? last.id + 1 : 1;

  const newProduct = new Product({ id: newId, ...req.body });
  await newProduct.save();

  res.json({ message: "Product added", product: newProduct });
});

// PUT - Update product
router.put("/:id", async (req, res) => {
  const updated = await Product.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product updated", product: updated });
});

// UPDATE STOCK (Manual)
router.put("/stock/:id", async (req, res) => {
  try {
    const { addStock } = req.body;
    if (addStock === undefined) return res.status(400).json({ message: "addStock is required" });

    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.pStock += Number(addStock);
    await product.save();

    res.json({ message: "Stock updated", updatedStock: product.pStock });
  } catch (err) {
    res.status(500).json({ message: "Error updating stock" });
  }
});

// DEDUCT STOCK AFTER BILLING
router.put("/deduct-stock", async (req, res) => {
  try {
    const { items } = req.body; // items = [{ id, quantity }, ...]

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items array is required" });
    }

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { id: item.id },
        update: { $inc: { pStock: -Number(item.quantity) } },
      },
    }));

    const result = await Product.bulkWrite(bulkOps);

    res.json({ message: "Stock updated after billing", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating stock after billing" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const deleted = await Product.findOneAndDelete({ id: req.params.id });
  if (!deleted) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
});

module.exports = router;

