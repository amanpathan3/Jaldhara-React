const express = require("express");
const fs = require("fs");
const router = express.Router();

const DATA_FILE = "./customerDetails.json";

// Read JSON file
function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// Write JSON file
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ----------------------
// GET ALL CUSTOMERS
// ----------------------
router.get("/", (req, res) => {
  const data = readData();
  res.json(data);
});

// ----------------------
// ADD NEW CUSTOMER (POST)
// ----------------------
router.post("/", (req, res) => {
  const customers = readData();
  const newCustomer = req.body;

  newCustomer.id = Date.now(); // Auto ID
  customers.push(newCustomer);

  writeData(customers);
  res.json({ message: "Customer added", customer: newCustomer });
});

// ----------------------
// UPDATE CUSTOMER (PUT)
// ----------------------
router.put("/:id", (req, res) => {
  const customers = readData();
  const customerId = parseInt(req.params.id);
  const updatedData = req.body;

  const index = customers.findIndex(c => c.id === customerId);
  if (index === -1) return res.status(404).json({ message: "Customer not found" });

  customers[index] = { ...customers[index], ...updatedData };
  writeData(customers);

  res.json({ message: "Customer updated", customer: customers[index] });
});

// ----------------------
// DELETE CUSTOMER
// ----------------------
router.delete("/:id", (req, res) => {
  const customers = readData();
  const customerId = parseInt(req.params.id);

  const filtered = customers.filter(c => c.id !== customerId);
  writeData(filtered);

  res.json({ message: "Customer deleted" });
});

module.exports = router;
