const Dashboard = require("../models/Dashboard");

// GET dashboard
router.get("/", async (req, res) => {
  try {
    let dashboard = await Dashboard.findOne();
    if (!dashboard) {
      // create initial dashboard if not exist
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
