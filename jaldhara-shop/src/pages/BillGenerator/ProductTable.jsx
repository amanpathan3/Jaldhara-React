import { Edit, Trash2 } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export function ProductTable({ selectedProduct, setSelectedProduct, savedCustomer, products}) {
  const handleDelete = (index) => {
    setSelectedProduct(selectedProduct.filter((_, i) => i !== index));
  };

  const totalPrice = selectedProduct.reduce((total, item) => {
    const matched = products.find(
      (p) => p.pName === item.name && p.pSize === item.size
    );
    if (!matched) return total;
    return total + matched.pFinalPrice * item.quantity;
  }, 0);


  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Header Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(55, 65, 81); // gray-700
    doc.text("JALDHARA MACHINERY AND PLUMBING MATERIAL", 105, 15, { align: "center" });

    // Shop & Customer Info
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Owner Name: Zahir Sayyad", 14, 30);
    doc.text("Mo.No: 9637847576", 14, 37);
    doc.text("Address: Dhamanagaon", 14, 44);
    doc.text(`Customer Name: ${savedCustomer}`, 150, 30);

    // Prepare Table Data
    const tableData = selectedProduct
      .map((item, index) => {
        const matched = products.find(
          (p) => p.pName === item.name && p.pSize === item.size
        );
        if (!matched) return null;

        const finalPrice = (matched.pFinalPrice * item.quantity).toFixed(2);

        return [
          index + 1,
          matched.pName,
          matched.pSize,
          matched.pPrice.toFixed(2), // clean numeric format
          item.quantity,
          finalPrice,
        ];
      })
      .filter(Boolean);

    // Calculate Total
    const totalAmount = tableData.reduce((sum, row) => {
      const price = parseFloat(row[5]);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);

    // Add total row to table
    tableData.push(["", "", "", "", "", `Total:${totalAmount}`]);

    // Generate Table
    doc.autoTable({
      startY: 55,
      head: [["Sr No", "Name", "Size", "Rate", "Qty", "Final Price"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [29, 78, 216] },
      styles: { halign: "center" },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 40 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 20 },
        5: { cellWidth: 35 },
      },
    });

    // Save PDF
    doc.save(`${savedCustomer || "Customer"}_bill.pdf`);
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
              // Find the matching product object from your product array
              const matched = products.find(
                (p) => p.pName === item.name && p.pSize === item.size
              );
              // Skip rendering if no match found
              if (!matched) return null;

              return (
                <tr key={index} className="border-b text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{matched.pName}</td>
                  <td className="p-2 border">{matched.pSize}</td>
                  <td className="p-2 border">₹{matched.pPrice}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">₹{matched.pFinalPrice * item.quantity}</td>
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
              <td colSpan="6" className="p-2 border text-right">Total: ₹{totalPrice}</td>
              <td className="p-2 border"></td>
            </tr>

          </tbody>
        </table>

        <div className="text-right mt-4">
          <button
            onClick={handleGeneratePDF}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
          >
            Generate PDF
          </button>
        </div>
      </div>
    </>
  );
}