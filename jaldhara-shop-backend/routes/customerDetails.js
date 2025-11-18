const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModel");

// GET all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

// POST - Add customer
router.post("/", async (req, res) => {
  const last = await Customer.findOne().sort({ id: -1 });
  const newId = last ? last.id + 1 : Date.now();

  const newCustomer = new Customer({
    id: newId,
    ...req.body
  });

  await newCustomer.save();
  res.json({ message: "Customer added", customer: newCustomer });
});

// PUT update
router.put("/:id", async (req, res) => {
  const updated = await Customer.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: "Customer not found" });
  res.json({ message: "Customer updated", customer: updated });
});

// DELETE customer
router.delete("/:id", async (req, res) => {
  const deleted = await Customer.findOneAndDelete({ id: req.params.id });

  if (!deleted) return res.status(404).json({ message: "Customer not found" });
  res.json({ message: "Customer deleted" });
});

module.exports = router;
