import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Header } from "../../component/Header";
import { AddNewProduct } from "../BillGenerator/AddNewProduct";
import { EditProductForm } from "./EditProductForm";
export function ProductsPage() {
  const [editProduct, setEditProduct] = useState(null);

  const [Products, setProducts] = useState([]);

  const handleEditProduct = (product) => {
    setEditProduct(product);
  };


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://jaldhara-react-1.onrender.com/api/products");
      const json = await response.json();
      setProducts(json);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const refreshProducts = () => {
    fetchData();
  }

  const handleDeleteProduct = async (productId) => {
    try {
      const res = await fetch(`https://jaldhara-react-1.onrender.com/api/products/${productId}`, {
        method: "DELETE",
      });
      refreshProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20 p-6">
        <AddNewProduct />
        {editProduct && (
          <EditProductForm
            product={editProduct}
            setEditProduct={setEditProduct}
            refreshProducts={refreshProducts}
          />
        )}

        <div className="p-8 bg-white min-h-screen">

          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Product List
          </h1>

          <div className="overflow-x-auto shadow-md rounded-lg bg-white">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Sr.No</th>
                  <th className="py-3 px-4 text-left">Product Name</th>
                  <th className="py-3 px-4 text-left">Size</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">GST</th>
                  <th className="py-3 px-4 text-left">Discount</th>
                  <th className="py-3 px-4 text-left">Final Price</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {Products.length > 0 ? (
                  Products.map((product, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-100 transition duration-200"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{product.pName}</td>
                      <td className="py-3 px-4">{product.pSize}</td>
                      <td className="py-3 px-4">{product.pPrice}</td>
                      <td className="py-3 px-4">{product.pGst}</td>
                      <td className="py-3 px-4">{product.pDiscount}</td>
                      <td className="py-3 px-4 font-semibold text-green-600">
                        {product.pFinalPrice}
                      </td>
                      <td className="p-2 flex justify-center gap-2">
                        <button
                          className="text-blue-600 cursor-pointer hover:text-blue-800"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          className="text-red-600 cursor-pointer hover:text-red-800"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-6 text-gray-500 italic"
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
