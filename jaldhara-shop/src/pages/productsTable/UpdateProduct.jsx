import { useState, useEffect } from "react";
import axios from "axios";

export function UpdateProduct( refreshProducts ) {
  const [productNames, setProductNames] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [discount, setDiscount] = useState("");

  // Fetch unique product names from backend
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await axios.get("https://jaldhara-react-1.onrender.com/api/products/unique-names");
        setProductNames(res.data);
      } catch (err) {
        console.error("Error fetching product names");
      }
    };

    fetchNames();
  }, []);

  const handleUpdate = async () => {
    if (!selectedName || discount === "") {
      alert("Please select product and enter discount");
      return;
    }

    try {
      await axios.put("https://jaldhara-react-1.onrender.com/api/products/update-discount", {
        productName: selectedName,
        discount: Number(discount),
      });

      alert("Discount Updated Successfully ✅");
      setDiscount("");
    } catch (err) {
      console.error(err);
      alert("Error updating discount");
    }
  };

  return (
    <div className="space-y-4 p-4 w-full">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left">
        Update Product Discount
      </h2>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4">

        {/* Product Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Product Name
          </label>
          <select
            className="border rounded-lg p-2 w-full sm:w-48 focus:ring-2 outline-none"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
          >
            <option value="">Select Product</option>
            {productNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Discount */}
        <div className="flex flex-col flex-1 sm:w-1/4">
          <label className="text-sm font-medium text-gray-600 mb-1">
            New Discount (%)
          </label>
          <input
            type="number"
            placeholder="Enter discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="border rounded-lg p-2 w-full focus:ring-2 outline-none"
          />
        </div>

        {/* Update Button */}
        <div className="flex justify-end sm:self-end w-full sm:w-auto">
          <button
           onClick={() => {
            handleUpdate();
            refreshProducts();
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition-all duration-200 w-full sm:w-auto"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
