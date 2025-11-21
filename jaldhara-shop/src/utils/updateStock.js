// utils/updateStock.js
import axios from "axios";

const API = "https://jaldhara-react-1.onrender.com/api/products";

// Reduce stock for sold products
export async function reduceStock(selectedProduct, products) {
  try {
    for (const item of selectedProduct) {
      const matched = products.find(
        (p) => p.pName === item.name && p.pSize === item.size
      );
      if (!matched) continue;

      // Reduce stock in backend
      await axios.put(`${API}/stock/${matched.id}`, { addStock: -item.quantity });
    }
    console.log("✅ Stock reduced successfully for sold products");
  } catch (err) {
    console.error("❌ Error reducing stock:", err);
  }
}
