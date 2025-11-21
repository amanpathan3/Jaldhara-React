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
    <div style={{ padding: "20px" }}>
      <h1>Manage Stock</h1>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Current Stock</th>
            <th>Add Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.pName}</td>
              <td>{p.pSize}</td>
              <td>{p.pStock}</td>

              <td>
                <input
                  type="number"
                  placeholder="Enter stock"
                  onChange={(e) =>
                    setStockInput({
                      ...stockInput,
                      [p.id]: e.target.value,
                    })
                  }
                />
              </td>

              <td>
                <button onClick={() => updateStock(p.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
