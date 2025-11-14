import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function CustomerAccordion({ customer }) {
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => setOpen(!open);

  return (
    <div className="rounded-xl shadow-lg p-4 bg-white my-4 border border-gray-200">

      {/* HEADER */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        <p className="font-semibold text-lg text-gray-800">
          Customer Name: {customer.name}
        </p>

        <p className="font-semibold text-lg text-gray-800">
          Total Purchased Amount: ₹{customer.totalAmount}
        </p>

        {open ? <ChevronUp /> : <ChevronDown />}
      </div>

      {/* BODY */}
      {open && (
        <div className="mt-4 space-y-6">

          {/* SHOP NAME CENTERED */}
          <div className="text-center">
            <p className="font-bold text-2xl text-blue-700">
              Jaldhara Machinery And Plumbing Material
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
              <p className="font-semibold text-gray-700 mt-2">Date: {customer.lastPurchaseDate}</p>
            </div>
          </div>

          {/* PRODUCT TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="border border-gray-300 p-2">Sr No</th>
                  <th className="border border-gray-300 p-2">Item</th>
                  <th className="border border-gray-300 p-2">Size</th>
                  <th className="border border-gray-300 p-2">Qty</th>
                  <th className="border border-gray-300 p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {customer.products.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">{item.name}</td>
                    <td className="border border-gray-300 p-2">{item.size}</td>
                    <td className="border border-gray-300 p-2">{item.qty}</td>
                    <td className="border border-gray-300 p-2">₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PDF BUTTON */}
          <button
            onClick={() => alert("PDF Generation Here")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Generate PDF
          </button>

        </div>
      )}
    </div>
  );
}
