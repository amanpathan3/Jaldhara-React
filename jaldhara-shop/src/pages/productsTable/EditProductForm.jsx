import { useState,useEffect } from "react";
import {
  Package,
  Ruler,
  IndianRupee,
  Percent,
  BadgeMinus,
  Calculator
} from "lucide-react";

export function EditProductForm({ product, setEditProduct, refreshProducts }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:5000/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      refreshProducts();
      setEditProduct(null); // close modal
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };
  useEffect(() => {
  const price = Number(updatedProduct.pPrice) || 0;
  const gst = Number(updatedProduct.pGst) || 0;
  const discount = Number(updatedProduct.pDiscount) || 0;

  const finalPrice = price + gst - discount;

  setUpdatedProduct(prev => ({ ...prev, pFinalPrice: finalPrice }));
}, [updatedProduct.pPrice, updatedProduct.pGst, updatedProduct.pDiscount]);


  return (
  <div className="fixed inset-0 flex items-center justify-center z-50">

    {/* Modal Box with Slide-Up Animation */}
    <div className="bg-white border-2 border-gray-500 rounded-xl shadow-2xl p-6 w-[95%] max-w-[500px]
                    animate-[slideUp_0.3s_ease-out]">

      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center flex items-center justify-center gap-2">
        <span>Edit Product</span>
      </h2>

      <div className="grid grid-cols-2 gap-4">
        
        {/* Product Name */}
        <div className="flex items-center border rounded p-2 gap-2">
          <span className="text-gray-600"><Package /></span>
          <input
            className="outline-none w-full"
            placeholder="Product Name"
            value={updatedProduct.pName}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, pName: e.target.value })
            }
          />
        </div>

        {/* Size */}
        <div className="flex items-center border rounded p-2 gap-2">
          <span className="text-gray-600"><Ruler /></span>
          <input
            className="outline-none w-full"
            placeholder="Size"
            value={updatedProduct.pSize}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, pSize: e.target.value })
            }
          />
        </div>

        {/* Price */}
        <div className="flex items-center border rounded p-2 gap-2">
          <span className="text-gray-600"><IndianRupee /></span>
          <input
            className="outline-none w-full"
            placeholder="Price"
            value={updatedProduct.pPrice}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, pPrice: e.target.value })
            }
          />
        </div>

        {/* GST */}
        <div className="flex items-center border rounded p-2 gap-2">
          <span className="text-gray-600"><Percent /></span>
          <input
            className="outline-none w-full"
            placeholder="GST"
            value={updatedProduct.pGst}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, pGst: e.target.value })
            }
          />
        </div>

        {/* Discount */}
        <div className="flex items-center border rounded p-2 gap-2">
          <span className="text-gray-600"><BadgeMinus /></span>
          <input
            className="outline-none w-full"
            placeholder="Discount"
            value={updatedProduct.pDiscount}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, pDiscount: e.target.value })
            }
          />
        </div>

        {/* Final Price (Auto Calculated) */}
        <div className="flex items-center border rounded p-2 bg-blue-50 gap-2">
          <span className="text-gray-700"><Calculator /></span>
          <input
            className="outline-none w-full font-semibold text-gray-700"
            value={updatedProduct.pFinalPrice}
            readOnly
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex justify-end gap-3">
        <button
          onClick={() => setEditProduct(null)}
          className="bg-gray-400 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-500"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-700"
        >
          Update
        </button>
      </div>

    </div>
  </div>
);


}
