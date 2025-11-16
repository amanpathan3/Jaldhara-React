import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { handleGeneratePDF } from "../../utils/CustomerPdf";

export function CustomerAccordion({ customer, refreshCustomers}) {
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => setOpen(!open);

  const totalFinalPrice = customer.products.reduce(
    (sum, item) => sum + Number(item.finalPrice || 0),
    0
  );

  const removeCustomer = async (customerId) => {
  const confirmDelete = window.confirm("You want to delete this customer?");
  if (!confirmDelete) return; // user clicked cancel

  try {
    const res = await fetch(`https://jaldhara-react-1.onrender.com/api/customers/${customerId}`, {
      method: "DELETE",
    });
    refreshCustomers();
  } catch (error) {
    console.error("Error deleting customer:", error);
  }
};


  return (
    <>
      <div className="rounded-xl shadow-lg p-4 bg-white my-4 border border-gray-200">

        {/* HEADER */}
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={toggleAccordion}
        >
          <div className="font-semibold text-lg text-gray-800">
            Customer Name: {customer.name}
          </div>

          <div className="font-semibold text-lg text-gray-800">
            Date: {customer.lastPurchaseDate}
          </div>

          {open ? <ChevronUp /> : <ChevronDown />}
        </div>

        {/* BODY */}
        {open && (
          <div className="mt-4 space-y-6">

            {/* SHOP NAME CENTERED */}
            <div className="text-center">
              <p className="font-bold text-2xl text-blue-700">
                JALDHARA MACHINERY AND PLUMBING MATERIAL
              </p>
            </div>

            {/* SHOP + CUSTOMER DETAILS – CLEAN (NO BORDER, NO BG) */}
            <div className="flex justify-between p-2">

              {/* LEFT SIDE: SHOP DETAILS */}
              <div className="space-y-1">
                <p className="font-semibold text-gray-700">Owner Name: Zahir Sayyad</p>
                <p className="font-semibold text-gray-700">Mo.No: 9876543210</p>
                <p className="font-semibold text-gray-700">Address: Dhamanagaon</p>
              </div>

              {/* RIGHT SIDE: CUSTOMER DETAILS */}
              <div className="text-right space-y-1">
                <p className="font-semibold text-gray-700">Customer Name: {customer.name}</p>
                {/* <p className="font-semibold text-gray-700 mt-2">Date: {customer.lastPurchaseDate}</p> */}
              </div>
            </div>

            {/* PRODUCT TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="border border-gray-300 p-2">Sr No</th>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Size</th>
                    <th className="border border-gray-300 p-2">Rate</th>
                    <th className="border border-gray-300 p-2">Qty</th>
                    <th className="border border-gray-300 p-2">Final Price</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.products.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border text-center border-gray-300 p-2">{index + 1}</td>
                      <td className="border text-center border-gray-300 p-2">{item.name}</td>
                      <td className="border text-center border-gray-300 p-2">{item.size}</td>
                      <td className="border text-center border-gray-300 p-2">{item.price}</td>
                      <td className="border text-center border-gray-300 p-2">{item.qty}</td>
                      <td className="border text-center border-gray-300 p-2">₹{item.finalPrice}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                    <td className="border bg-white p-2 text-right" colSpan="6">
                      Total: ₹{(totalFinalPrice).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* PDF BUTTON */}
            <div className="flex gap-5">
              <button
                onClick={() => handleGeneratePDF(customer,totalFinalPrice)}
                className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                Generate PDF
              </button>

              <button
                onClick={() => removeCustomer(customer.id)}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Remove Customer
              </button>
            </div>

          </div>
        )}
      </div>
    </>
  );
}
