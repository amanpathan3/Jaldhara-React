const express = require("express");
const router = express.Router();
const Dashboard = require("../models/dashboardModel");

// GET dashboard (only one document)
router.get("/", async (req, res) => {
  let dashboard = await Dashboard.findOne();

  if (!dashboard) {
    dashboard = new Dashboard(req.body);
    await dashboard.save();
  }

  res.json(dashboard);
});

// UPDATE dashboard
router.put("/", async (req, res) => {
  const updated = await Dashboard.findOneAndUpdate({}, req.body, { new: true });

  res.json({ message: "Dashboard updated", dashboard: updated });
});

module.exports = router;
