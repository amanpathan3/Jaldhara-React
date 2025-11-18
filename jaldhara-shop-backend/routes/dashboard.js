const express = require("express");
const router = express.Router();
const Dashboard = require("../models/Dashboard");

// GET dashboard
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

// ✅ NEW: PUT route for updating dashboard
router.put("/", async (req, res) => {
  try {
    const updatedData = req.body; // fullDashboard from frontend
    const dashboard = await Dashboard.findOne();

    if (!dashboard) return res.status(404).json({ error: "Dashboard not found" });

    // Only update allowed fields
    if (updatedData.monthlySales) dashboard.monthlySales = updatedData.monthlySales;
    if (updatedData.dailySales) dashboard.dailySales = updatedData.dailySales;
    if (updatedData.categorySales) dashboard.categorySales = updatedData.categorySales;

    await dashboard.save();

    res.json({ message: "Dashboard updated successfully", dashboard });
  } catch (error) {
    console.error("Error updating dashboard:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
