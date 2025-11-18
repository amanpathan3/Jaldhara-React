const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/productModel");
const Customer = require("./models/customerModel");
const Dashboard = require("./models/dashboardModel");

const fs = require("fs");
const path = require("path");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("MongoDB connected for migration ✅");
};

// Read JSON files
const products = JSON.parse(fs.readFileSync(path.join(__dirname, "products.json"), "utf-8"));
const customers = JSON.parse(fs.readFileSync(path.join(__dirname, "customerDetails.json"), "utf-8"));
const dashboards = JSON.parse(fs.readFileSync(path.join(__dirname, "dashboard.json"), "utf-8"));

const migrate = async () => {
  try {
    await connectDB();

    // 1️⃣ Migrate Products
    for (let prod of products) {
      const exists = await Product.findOne({ id: prod.id });
      if (!exists) {
        await Product.create(prod);
      }
    }
    console.log("Products migrated ✅");

    // 2️⃣ Migrate Customers
    for (let cust of customers) {
      const exists = await Customer.findOne({ id: cust.id });
      if (!exists) {
        await Customer.create(cust);
      }
    }
    console.log("Customers migrated ✅");

    // 3️⃣ Migrate Dashboard
    for (let dash of dashboards) {
      const exists = await Dashboard.findOne({});
      if (!exists) {
        await Dashboard.create(dash);
      }
    }
    console.log("Dashboard migrated ✅");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

migrate();
