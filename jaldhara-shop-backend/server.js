// const express = require('express');
// const cors = require('cors');
// require("dotenv").config();
// const connectDB = require("./config/db");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Product Routes
// const productRoutes = require('./routes/products');
// app.use('/api/products', productRoutes);

// // Customer Routes
// const customerRoutes = require('./routes/customerDetails');
// app.use('/api/customers', customerRoutes);

// // Dashboard Routes
// const dashboardRouter = require("./routes/dashboard");       // GET dashboard data
// const dailyRouter = require("./routes/dailySales");          // POST daily-sales-update
// const monthlyRouter = require("./routes/monthlySales");      // POST monthly-sales-update
// const categoryRouter = require("./routes/categorySales");    // POST category-sales-update

// app.use("/api/dashboard", dashboardRouter);
// app.use("/api/dashboard", dailyRouter);
// app.use("/api/dashboard", monthlyRouter);
// app.use("/api/dashboard", categoryRouter);

// // Root
// app.get('/', (req, res) => {
//     res.send('Backend is running!');
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
const corsOptions = {
  origin: "https://jaldhara-supplier.vercel.app", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Product Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Customer Routes
const customerRoutes = require('./routes/customerDetails');
app.use('/api/customers', customerRoutes);

// Dashboard Routes
const dashboardRouter = require("./routes/dashboard");       // GET dashboard data
const dailyRouter = require("./routes/dailySales");          // POST daily-sales-update
const monthlyRouter = require("./routes/monthlySales");      // POST monthly-sales-update
const categoryRouter = require("./routes/categorySales");    // POST category-sales-update

app.use("/api/dashboard", dashboardRouter);
app.use("/api/dashboard", dailyRouter);
app.use("/api/dashboard", monthlyRouter);
app.use("/api/dashboard", categoryRouter);

// Root
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
