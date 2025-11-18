const express = require("express");
const router = express.Router();
const Dashboard = require("../models/dashboardModel");

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

// ✅ PUT route for updating dashboard (increment revenue)
router.put("/", async (req, res) => {
  try {
    const updatedData = req.body; // data from frontend
    const dashboard = await Dashboard.findOne();
    if (!dashboard) return res.status(404).json({ error: "Dashboard not found" });

    // Increment monthly sales
    if (updatedData.monthlySales) {
      updatedData.monthlySales.forEach(newMonth => {
        const monthEntry = dashboard.monthlySales.find(m => m.month === newMonth.month);
        if (monthEntry) monthEntry.revenue += newMonth.revenue;
      });
    }

    // Increment daily sales
    if (updatedData.dailySales) {
      updatedData.dailySales.forEach(newDay => {
        const dayEntry = dashboard.dailySales.find(d => d.date === newDay.date);
        if (dayEntry) {
          dayEntry.revenue += newDay.revenue; // add revenue to existing day
        } else {
          dashboard.dailySales.push(newDay); // add new day if not exists
        }
      });
    }

    // Increment category sales
    if (updatedData.categorySales) {
      updatedData.categorySales.forEach(newCat => {
        const catEntry = dashboard.categorySales.find(c => c.category === newCat.category);
        if (catEntry) catEntry.revenue += newCat.revenue;
      });
    }

    await dashboard.save();

    res.json({ message: "Dashboard updated successfully", dashboard });
  } catch (error) {
    console.error("Error updating dashboard:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
