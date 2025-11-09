const express = require('express');
const cors = require('cors'); // ✅ Import CORS
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Use Middleware
app.use(cors()); // Enable Cross-Origin requests
app.use(express.json());

// ✅ Import product routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
