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
  const updated = await Product.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product updated", product: updated });
});

// UPDATE STOCK
router.put("/stock/:id", async (req, res) => {
  try {
    const { addStock } = req.body;

    if (addStock === undefined)
      return res.status(400).json({ message: "addStock is required" });

    const product = await Product.findOne({ id: req.params.id });

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    product.pStock = product.pStock + Number(addStock);
    await product.save();

    res.json({
      message: "Stock updated",
      updatedStock: product.pStock,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating stock" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const deleted = await Product.findOneAndDelete({ id: req.params.id });

  if (!deleted) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
});

module.exports = router;
