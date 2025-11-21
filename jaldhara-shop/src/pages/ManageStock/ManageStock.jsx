import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../component/Header";
const API = "https://jaldhara-react-1.onrender.com/api/products";

export default function ManageStock() {
  const [products, setProducts] = useState([]);
  const [stockInput, setStockInput] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const refreshProducts = () => {
    fetchData();
  };

  const updateStock = async (id) => {
    const addStock = stockInput[id];

    if (!addStock || addStock <= 0) {
      alert("Enter valid stock quantity");
      return;
    }

    try {
      await axios.put(`${API}/stock/${id}`, { addStock });
      alert("Stock Updated!");
      refreshProducts(); // refresh table

      // Reset input for this product
      setStockInput((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock");
    }
  };

  return (
    <>
    <Header />
    <div className="p-6 md:p-12 bg-gray-100 min-h-screen mt-16">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Manage Product Stock
      </h1>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Sr.No</th>
              <th className="py-3 px-4 text-left">Product Name</th>
              <th className="py-3 px-4 text-left">Size</th>
              <th className="py-3 px-4 text-left">Current Stock</th>
              <th className="py-3 px-4 text-left">Add Stock</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-100 transition duration-200"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{product.pName}</td>
                  <td className="py-3 px-4">{product.pSize}</td>
                  <td className="py-3 px-4">{product.pStock}</td>

                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min="0"
                      placeholder="Qty"
                      className="border border-gray-300 rounded px-3 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={stockInput[product.id] || ""}
                      onChange={(e) =>
                        setStockInput({
                          ...stockInput,
                          [product.id]: e.target.value,
                        })
                      }
                    />
                  </td>

                  <td className="p-2 flex justify-center gap-2">
                    <button
                      onClick={() => updateStock(product.id)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors duration-200"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}
