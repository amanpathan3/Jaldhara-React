import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export function ProductTable({ selectedProduct, setSelectedProduct , savedCustomer }) {
  const handleDelete = (index) => {
    setSelectedProduct(selectedProduct.filter((_, i) => i !== index));
  };

  const handleGeneratePDF = () => {
    alert("PDF Generated (coming soon)");
  };
  
  const [product,setProduct] = useState([]);

   useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:5000/api/products");
        const json = await data.json();
        setProduct(json);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

  return (
    <>
      {/* Bill Table */}
      <div className="pt-4 overflow-x-auto">
        <div className="w-full p-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6">
            JALDHARA MACHINERY AND PLUMBING MATERIAL
          </h2>
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <div className="space-y-1">
              <p>Owner Name: <span className="font-semibold">Zahir Sayyad</span></p>
              <p>Mo.No: <span className="font-semibold">9637847576</span></p>
              <p>Address: <span className="font-semibold">Dhamanagaon</span></p>
            </div>
            <div className="space-y-1 mt-4 sm:mt-0 text-left sm:text-right">
              <p>Customer Name: <span className="font-semibold">{savedCustomer}</span></p>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-medium mb-3">Product List</h3>

        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-green-600 text-white border-b">
              <th className="p-2 border">Sr No</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Size</th>
              <th className="p-2 border">Rate</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Final Price</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedProduct.map((item, index) => (
              <tr key={index} className="border-b text-center">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.size}</td>
                <td className="p-2 border">{0}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">₹{0}</td>
                <td className="p-2 border flex justify-center gap-2">
                  <button className="text-green-600 hover:text-green-800">
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-4">
          <button
            onClick={handleGeneratePDF}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 w-full sm:w-auto"
          >
            Generate PDF
          </button>
        </div>
      </div>
    </>
  );
}