import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://jaldhara-react-1.onrender.com/api/products";

export default function ManageStock() {
  const [products, setProducts] = useState([]);
  const [stockInput, setStockInput] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await axios.get(API);
    setProducts(res.data);
  };

  const updateStock = async (id) => {
    const addStock = stockInput[id];

    if (!addStock || addStock <= 0) {
      alert("Enter valid stock quantity");
      return;
    }

    await axios.put(`${API}/stock/${id}`, { addStock });

    alert("Stock Updated!");
    loadProducts(); // refresh
  };

  return (
    <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Manage Product Stock
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="text-left py-3 px-6 text-gray-700 font-semibold">Name</th>
              <th className="text-left py-3 px-6 text-gray-700 font-semibold">Size</th>
              <th className="text-left py-3 px-6 text-gray-700 font-semibold">Current Stock</th>
              <th className="text-left py-3 px-6 text-gray-700 font-semibold">Add Stock</th>
              <th className="text-left py-3 px-6 text-gray-700 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-b hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="py-3 px-6">{p.pName}</td>
                <td className="py-3 px-6">{p.pSize}</td>
                <td className="py-3 px-6">{p.pStock}</td>

                <td className="py-3 px-6">
                  <input
                    type="number"
                    min="0"
                    className="border border-gray-300 rounded px-3 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Qty"
                    onChange={(e) =>
                      setStockInput({
                        ...stockInput,
                        [p.id]: e.target.value,
                      })
                    }
                  />
                </td>

                <td className="py-3 px-6">
                  <button
                    onClick={() => updateStock(p.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
