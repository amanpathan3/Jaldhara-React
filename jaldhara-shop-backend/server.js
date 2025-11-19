const express = require('express');
const cors = require('cors');
require("dotenv").config();        // ✅ Load environment variables
const connectDB = require("./config/db");   // ✅ Import MongoDB connection file

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Product Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Customer Routes
const customerRoutes = require('./routes/customerDetails');
app.use('/api/customers', customerRoutes);

const dashboardMongo = require("./routes/dashboardMongo");
app.use("/api/dashboard", dashboardMongo);


app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
