import jsPDF from "jspdf";
import "jspdf-autotable";
export const handleGeneratePDF = (savedCustomer, selectedProduct, products) => {
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
    tableData.push(["", "", "", "", "", `Total:${(totalAmount).toFixed(2)}`]);

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