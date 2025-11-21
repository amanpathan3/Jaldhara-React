require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Mongo Error:", err));

const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model("products", productSchema);

async function updateStock() {
  try {
    const result = await Product.updateMany(
      { pStock: { $exists: false } },
      { $set: { pStock: 0 } }
    );

    console.log("Updated documents:", result.modifiedCount);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
}

updateStock();
