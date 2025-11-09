import { useEffect, useState } from "react";

export function ProductInput({ setSelectedProduct }) {
  const [productData, setProductData] = useState([]);
  const [tempProduct, setTempProduct] = useState({
    name: "",
    size: "",
    quantity: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch("http://localhost:5000/api/products");
      const json = await data.json();
      setProductData(json);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addData = () => {
    if (tempProduct.name && tempProduct.size && tempProduct.quantity) {
      setSelectedProduct((prev) => [...prev, tempProduct]);
      setTempProduct({ name: "", size: "", quantity: "" }); // reset input fields
    } else {
      alert("Please fill all fields before adding!");
    }
  };

  return (
    <div className="space-y-4 p-4 w-full">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left">
        Add Product to Bill
      </h2>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        {/* Product Selection */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-2 flex-row">
          {/* Product Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Product Name
            </label>
            <select
              className="border rounded-lg p-2 w-full sm:w-48 focus:ring-2 outline-none"
              value={tempProduct.name}
              onChange={(e) =>
                setTempProduct((prev) => ({
                  ...prev,
                  name: e.target.value,
                  size: "", // reset size when product changes
                }))
              }
            >
              <option value="">Select Product</option>
              {productData.map((product) => (
                <option key={product.id} value={product.pName}>
                  {product.pName}
                </option>
              ))}
            </select>
          </div>

          {/* Product Size */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Product Size
            </label>
            <select
              className="border rounded-lg p-2 w-full sm:w-40 focus:ring-2 outline-none"
              value={tempProduct.size}
              onChange={(e) =>
                setTempProduct((prev) => ({
                  ...prev,
                  size: e.target.value,
                }))
              }
            >
              <option value="">Select Size</option>
              {productData
                .filter((p) => p.pName === tempProduct.name)
                .map((product) => (
                  <option key={product.id} value={product.pSize}>
                    {product.pSize}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex flex-col flex-1 sm:w-1/4">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Quantity
          </label>
          <input
            type="number"
            placeholder="Enter quantity"
            value={tempProduct.quantity}
            onChange={(e) =>
              setTempProduct((prev) => ({
                ...prev,
                quantity: e.target.value,
              }))
            }
            className="border rounded-lg p-2 w-full focus:ring-2 outline-none"
          />
        </div>

        {/* Add Button */}
        <div className="flex justify-end sm:self-end w-full sm:w-auto">
          <button
            onClick={addData}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 w-full sm:w-auto"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}  