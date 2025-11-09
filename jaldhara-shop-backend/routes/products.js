const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// ✅ Path to JSON file
const dataPath = path.join(__dirname, "../products.json");

// 🟢 Function to read products
const readProducts = () => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading products.json:", error);
    return [];
  }
};

// 🟡 Function to write products
const writeProducts = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// 🔹 GET - Fetch all products
router.get("/", (req, res) => {
  const products = readProducts();
  res.json(products);
});

// 🔹 POST - Add a new product
router.post("/", (req, res) => {
  const products = readProducts();
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    ...req.body,
  };
  products.push(newProduct);
  writeProducts(products);
  res.json({ message: "✅ Product added successfully", product: newProduct });
});

// 🔹 PUT - Update product by id
router.put("/:id", (req, res) => {
  const products = readProducts();
  const { id } = req.params;
  const index = products.findIndex((p) => p.id == id);

  if (index === -1) {
    return res.status(404).json({ message: "❌ Product not found" });
  }

  products[index] = { ...products[index], ...req.body };
  writeProducts(products);
  res.json({ message: "✅ Product updated successfully", product: products[index] });
});

// 🔹 DELETE - Delete product by id
router.delete("/:id", (req, res) => {
  const products = readProducts();
  const { id } = req.params;
  const index = products.findIndex((p) => p.id == id);

  if (index === -1) {
    return res.status(404).json({ message: "❌ Product not found" });
  }

  products.splice(index, 1);
  writeProducts(products);
  res.json({ message: "🗑️ Product deleted successfully" });
});

module.exports = router;
