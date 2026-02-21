import { useState, useEffect } from "react";
import axios from "axios";

export function UpdateCategoryDiscount({ refreshProducts }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [discount, setDiscount] = useState("");

  // Fetch unique categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://jaldhara-react-1.onrender.com/api/products/unique-categories"
        );
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  const handleUpdate = async () => {
    if (!selectedCategory || discount === "") {
      alert("Please select category and enter discount");
      return;
    }

    try {
      await axios.put(
        "https://jaldhara-react-1.onrender.com/api/products/update-discount-by-category",
        {
          category: selectedCategory,
          discount: Number(discount),
        }
      );

      alert("Discount Updated Successfully ✅");
      setDiscount("");
      refreshProducts();
    } catch (err) {
      console.error(err);
      alert("Error updating discount");
    }
  };

  return (
    <div className="space-y-4 p-4 w-full">
      <h2 className="text-lg font-semibold text-gray-800">
        Update Discount By Category
      </h2>

      <div className="flex flex-col sm:flex-row gap-4">

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            Category
          </label>
          <select
            className="border rounded-lg p-2 w-full sm:w-48"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Discount */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            New Discount (%)
          </label>
          <input
            type="number"
            placeholder="Enter discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="border rounded-lg p-2"
          />
        </div>

        {/* Button */}
        <div className="flex items-end">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}