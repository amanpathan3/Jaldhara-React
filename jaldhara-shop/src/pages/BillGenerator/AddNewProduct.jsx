import { PlusCircle } from "lucide-react";
export function AddNewProduct({setProduct,product,setProducts,products}) {
     const handleAddProduct = () => {
        if (product.name && product.size && product.price) {
            setProducts([...products, { ...product }]);
            setProduct({ name: "", size: "", price: "", gst: "", discount: "" });
        }
    };
    return (
        <>
            {/* Add Product Section */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Add New Product</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Product Name:</label>
                        <input
                            placeholder="Product Name"
                            value={product.name}
                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                            className="border rounded-lg p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Size:</label>
                        <input
                            placeholder="Size"
                            value={product.size}
                            onChange={(e) => setProduct({ ...product, size: e.target.value })}
                            className="border rounded-lg p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Price:</label>
                        <input
                            placeholder="Price"
                            type="number"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                            className="border rounded-lg p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">GST % :</label>
                        <input
                            placeholder="GST %"
                            type="number"
                            value={product.gst}
                            onChange={(e) => setProduct({ ...product, gst: parseFloat(e.target.value) })}
                            className="border rounded-lg p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Discount % :</label>
                        <input
                            placeholder="Discount %"
                            type="number"
                            value={product.discount}
                            onChange={(e) => setProduct({ ...product, discount: parseFloat(e.target.value) })}
                            className="border rounded-lg p-2 w-full"
                        />
                    </div>
                </div>

                <div className="text-right">
                    <button
                        onClick={handleAddProduct}
                        className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full sm:w-auto"
                    >
                        + Add Product
                    </button>
                </div>
            </div>
        </>
    );
}