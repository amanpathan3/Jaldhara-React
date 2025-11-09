import React, { useState } from "react";
import { Header } from "../../component/Header";
import { CustomerDetails } from "./CustomerDetails";
import { AddNewProduct } from "./AddNewProduct";
import { ProductInput } from "./ProductInput";
import { ProductTable } from "./ProductTable";

export function BillPage() {

  const [savedCustomer, setSavedCustomer] = useState("");

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    size: "",
    price: "",
    gst: "",
    discount: "",
  });

  const [selectedProduct, setSelectedProduct] = useState([]);
  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
        <div className="bg-white rounded-2xl shadow-lg w-full p-6 sm:p-10 mt-24 space-y-8">

          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-700">Shop Bill Manager</h1>
            <p className="text-gray-600">Create, manage and print shop bills</p>
          </div>

          <CustomerDetails  setSavedCustomer={setSavedCustomer}/>

          <AddNewProduct setProduct={setProduct} product={product} setProducts={setProducts} products={products} />

          <ProductInput products={products} setSelectedProduct={setSelectedProduct}/>

          <ProductTable setSelectedProduct={setSelectedProduct} selectedProduct={selectedProduct} savedCustomer={savedCustomer}/>
        </div>
      </div>
    </>
  );
}
