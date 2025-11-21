import { Edit, Trash2 } from "lucide-react";
import { sendCustomerData } from "../../utils/sendCustomerDetails";
import { handleGeneratePDF } from "../../utils/pdfGenerator";
import { updateCategorySales } from "../../utils/updateDashboardData";
import { updateDailySales } from "../../utils/updateDashboardData";
import { updateMonthlySales } from "../../utils/updateDashboardData";
import axios from "axios";

const API = "https://jaldhara-react-1.onrender.com/api/products";

export function ProductTable({ selectedProduct, setSelectedProduct, savedCustomer, products }) {
  const handleDelete = (index) => {
    setSelectedProduct(selectedProduct.filter((_, i) => i !== index));
  };

  const totalPrice = selectedProduct.reduce((total, item) => {
    const matched = products.find((p) => p.pName === item.name && p.pSize === item.size);
    if (!matched) return total;
    return total + matched.pFinalPrice * item.quantity;
  }, 0);

  // Function to update stock in backend
  const deductStock = async () => {
    try {
      const itemsToDeduct = selectedProduct.map((item) => {
        const matched = products.find((p) => p.pName === item.name && p.pSize === item.size);
        return {
          id: matched.id,
          quantity: item.quantity
        };
      });

      await axios.put(`${API}/deduct-stock`, { items: itemsToDeduct });
      console.log("Stock deducted successfully");
    } catch (err) {
      console.error("Error deducting stock:", err);
    }
  };

  return (
    <>
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
            <tr className="bg-blue-600 text-white border-b">
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
            {selectedProduct.map((item, index) => {
              const matched = products.find((p) => p.pName === item.name && p.pSize === item.size);
              if (!matched) return null;

              return (
                <tr key={index} className="border-b text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{matched.pName}</td>
                  <td className="p-2 border">{matched.pSize}</td>
                  <td className="p-2 border">₹{matched.pPrice}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">₹{(matched.pFinalPrice * item.quantity).toFixed(2)}</td>
                  <td className="p-2 flex justify-center gap-2">
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr className="bg-gray-100 font-semibold text-center">
              <td colSpan="6" className="p-2 border text-right">Total: ₹{totalPrice.toFixed(2)}</td>
              <td className="p-2 border"></td>
            </tr>
          </tbody>
        </table>

        <div className="text-right mt-4 flex gap-5 flex-col sm:flex-row">
          <button
            onClick={async () => {
              try {
                // 1️⃣ Deduct stock first
                await deductStock();

                // 2️⃣ Save customer data
                await sendCustomerData(savedCustomer, selectedProduct, products);

                // 3️⃣ Update dashboard data
                await updateDailySales(totalPrice);
                await updateMonthlySales(totalPrice);
                await updateCategorySales(selectedProduct);

                // 4️⃣ Generate PDF
                handleGeneratePDF(savedCustomer, selectedProduct, products);

              } catch (err) {
                console.error("❌ Error generating bill or updating stock:", err);
              }
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer w-full sm:w-auto"
          >
            Generate PDF & Update Stock
          </button>
        </div>
      </div>
    </>
  );
}
