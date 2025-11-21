import { useState } from "react";
import { PlusCircle } from "lucide-react";

export function AddNewProduct({ refreshProducts }) {
  const [product, setProduct] = useState({
    name: "",
    size: "",
    price: "",
    gst: "",
    discount: "",
    category: "",
    stock : "0"
  });

  const handleAddProduct = async () => {
    if (!product.name || !product.size || !product.price) {
      alert("Please fill all required fields!");
      return;
    }
    const totalWithGst =
      parseFloat(product.price) +
      (parseFloat(product.price) * (parseFloat(product.gst) / 100));

    const finalPrice =
      totalWithGst - (totalWithGst * (parseFloat(product.discount) / 100));

    const newProduct = {
      id: Date.now(),
      pName: product.name,
      pSize: product.size,
      pPrice: parseFloat(product.price),
      pGst: parseFloat(product.gst) || 0,
      pDiscount: parseFloat(product.discount) || 0,
      pFinalPrice: parseFloat(finalPrice),
      pCategory: product.category || "Others",
      pStock : Number(stock) || 0
    };


    const response = await fetch("https://jaldhara-react-1.onrender.com/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      alert("✅ Product added successfully!");
      setProduct({
        name: "",
        size: "",
        price: "",
        gst: "",
        discount: "",
        category: "",
      });

      // 🔥 Refresh the product list
      refreshProducts();
    }
  };

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Add New Product</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Product Name:
            </label>
            <input
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Size:
            </label>
            <input
              placeholder="Size"
              value={product.size}
              onChange={(e) => setProduct({ ...product, size: e.target.value })}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Price:
            </label>
            <input
              placeholder="Price"
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              GST %:
            </label>
            <input
              placeholder="GST %"
              type="number"
              value={product.gst}
              onChange={(e) =>
                setProduct({ ...product, gst: e.target.value })
              }
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Discount %:
            </label>
            <input
              placeholder="Discount %"
              type="number"
              value={product.discount}
              onChange={(e) =>
                setProduct({ ...product, discount: e.target.value })
              }
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category:
            </label>

            <select
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              className="border rounded-lg p-2 w-full"
            >
              <option value="">Select Category</option>
              <option value="UPVC">UPVC</option>
              <option value="CPVC">CPVC</option>
              <option value="SWR">SWR</option>
              <option value="Others">Others</option>
            </select>
          </div>

        </div>

        <div className="text-right">
          <button
            onClick={handleAddProduct}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto cursor-pointer"
          >
            <PlusCircle size={18} /> Add Product
          </button>
        </div>
      </div>
    </>
  );
}
