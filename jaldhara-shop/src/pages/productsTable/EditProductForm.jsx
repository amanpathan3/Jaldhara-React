import { useState, useEffect, useMemo } from "react";
import {
  Package,
  Ruler,
  IndianRupee,
  Percent,
  BadgeMinus,
  Calculator
} from "lucide-react";

export function EditProductForm({ product, setEditProduct, refreshProducts }) {
  // Clone product safely
  const [updatedProduct, setUpdatedProduct] = useState(() => ({ ...product }));

  // Sync when parent product changes
  useEffect(() => {
    setUpdatedProduct({ ...product });
  }, [product]);

  // Convert to number safely
  const toNum = (v) => {
    if (v === "" || v === null || v === undefined) return 0;
    const cleaned = String(v).trim();
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : 0;
  };

  // ⭐ NEW — Correct final price formula:
  // Final = (Price − (Price × Discount %)) × (1 + GST %)
  const finalPrice = useMemo(() => {
    const price = toNum(updatedProduct.pPrice);
    const gstPercent = toNum(updatedProduct.pGst);
    const discountPercent = toNum(updatedProduct.pDiscount);

    // Apply discount first
    const discountedPrice = price * (1 - discountPercent / 100);

    // Now apply GST on discounted price
    const final = discountedPrice * (1 + gstPercent / 100);

    return Math.max(0, Number(final.toFixed(2)));
  }, [updatedProduct.pPrice, updatedProduct.pGst, updatedProduct.pDiscount]);

  const handleUpdate = async () => {
    try {
      const payload = { ...updatedProduct, pFinalPrice: finalPrice };

      await fetch(`https://jaldhara-react-1.onrender.com/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      refreshProducts();
      setEditProduct(null);
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white border-2 border-gray-500 rounded-xl shadow-2xl p-6 w-[95%] max-w-[500px]
                    animate-[slideUp_0.3s_ease-out]">

        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center flex items-center justify-center gap-2">
          <span>Edit Product</span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          
          {/* Product Name */}
          <div className="flex items-center border rounded p-2 gap-2">
            <Package className="text-gray-600" />
            <input
              className="outline-none w-full"
              placeholder="Product Name"
              value={updatedProduct.pName || ""}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, pName: e.target.value })
              }
            />
          </div>

          {/* Size */}
          <div className="flex items-center border rounded p-2 gap-2">
            <Ruler className="text-gray-600" />
            <input
              className="outline-none w-full"
              placeholder="Size"
              value={updatedProduct.pSize || ""}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, pSize: e.target.value })
              }
            />
          </div>

          {/* Price */}
          <div className="flex items-center border rounded p-2 gap-2">
            <IndianRupee className="text-gray-600" />
            <input
              type="number"
              step="0.01"
              className="outline-none w-full"
              placeholder="Price"
              value={updatedProduct.pPrice ?? ""}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, pPrice: e.target.value })
              }
            />
          </div>

          {/* GST (%) */}
          <div className="flex items-center border rounded p-2 gap-2">
            <Percent className="text-gray-600" />
            <input
              type="number"
              step="0.01"
              className="outline-none w-full"
              placeholder="GST (%)"
              value={updatedProduct.pGst ?? ""}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, pGst: e.target.value })
              }
            />
          </div>

          {/* Discount (%) */}
          <div className="flex items-center border rounded p-2 gap-2">
            <BadgeMinus className="text-gray-600" />
            <input
              type="number"
              step="0.01"
              className="outline-none w-full"
              placeholder="Discount (%)"
              value={updatedProduct.pDiscount ?? ""}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, pDiscount: e.target.value })
              }
            />
          </div>

          {/* Final Price */}
          <div className="flex items-center border rounded p-2 bg-blue-50 gap-2">
            <Calculator className="text-gray-700" />
            <input
              className="outline-none w-full font-semibold text-gray-700"
              value={finalPrice}
              readOnly
            />
          </div>
        </div>

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
