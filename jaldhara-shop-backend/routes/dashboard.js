const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../dashboard.json");

// READ - Get all dashboard data
router.get("/", (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Unable to read file" });
        res.json(JSON.parse(data));
    });
});

// CREATE - Add new data (example: new monthly sales or daily sales)
router.post("/", (req, res) => {
    const newData = req.body; // Pass full object like {monthlySales: [...], ...}

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Unable to read file" });

        const dashboard = JSON.parse(data);
        dashboard.push(newData);

        fs.writeFile(filePath, JSON.stringify(dashboard, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Unable to write file" });
            res.status(201).json({ message: "Data added successfully" });
        });
    });
});

// UPDATE - Update existing data (example: monthlySales for first object)
router.put("/", (req, res) => {
    const updatedData = req.body;

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Unable to read file" });

        const dashboard = JSON.parse(data);
        dashboard[0] = { ...dashboard[0], ...updatedData };

        fs.writeFile(filePath, JSON.stringify(dashboard, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Unable to write file" });
            res.json({ message: "Data updated successfully" });
        });
    });
});

// DELETE - Delete all dashboard data
router.delete("/", (req, res) => {
    fs.writeFile(filePath, JSON.stringify([], null, 2), (err) => {
        if (err) return res.status(500).json({ error: "Unable to write file" });
        res.json({ message: "All data deleted successfully" });
    });
});

module.exports = router;
