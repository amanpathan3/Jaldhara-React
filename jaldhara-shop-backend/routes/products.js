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

// DELETE
router.delete("/:id", async (req, res) => {
  const deleted = await Product.findOneAndDelete({ id: req.params.id });

  if (!deleted) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
});

module.exports = router;
