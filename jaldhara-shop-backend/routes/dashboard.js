const express = require("express");
const router = express.Router();
const Dashboard = require("../models/Dashboard");

// ======================
// GET Dashboard
// ======================
router.get("/", async (req, res) => {
  try {
    let dashboard = await Dashboard.findOne();
    if (!dashboard) {
      dashboard = new Dashboard({
        monthlySales: [
          { month: "Jan", revenue: 0 },
          { month: "Feb", revenue: 0 },
          { month: "Mar", revenue: 0 },
          { month: "April", revenue: 0 },
          { month: "May", revenue: 0 },
          { month: "June", revenue: 0 },
          { month: "July", revenue: 0 },
          { month: "Aug", revenue: 0 },
          { month: "Semp", revenue: 0 },
          { month: "Oct", revenue: 0 },
          { month: "Nov", revenue: 0 },
          { month: "Dec", revenue: 0 },
        ],
        dailySales: [{ date: new Date().toISOString().split("T")[0], revenue: 0 }],
        categorySales: [
          { category: "CPVC", revenue: 0 },
          { category: "UPVC", revenue: 0 },
          { category: "SWR", revenue: 0 },
          { category: "Others", revenue: 0 },
        ],
      });
      await dashboard.save();
    }
    res.json([dashboard]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ======================
// PUT Dashboard
// ======================
router.put("/", async (req, res) => {
  try {
    const data = req.body; // frontend sends full dashboard object including _id
    if (!data._id) return res.status(400).json({ error: "_id is required" });

    const dashboard = await Dashboard.findById(data._id);
    if (!dashboard) return res.status(404).json({ error: "Dashboard not found" });

    // Update all arrays
    dashboard.monthlySales = data.monthlySales || dashboard.monthlySales;
    dashboard.dailySales = data.dailySales || dashboard.dailySales;
    dashboard.categorySales = data.categorySales || dashboard.categorySales;

    await dashboard.save();
    res.json(dashboard);
  } catch (error) {
    console.error("Error updating dashboard:", error);
    res.status(500).json({ error: "Failed to update dashboard" });
  }
});

module.exports = router;
