import jsPDF from "jspdf";
import "jspdf-autotable";

export const handleGeneratePDF = (savedCustomer, selectedProduct, products) => {
  const doc = new jsPDF();

  // Header Title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(55, 65, 81);
  doc.text("JALDHARA MACHINERY AND PLUMBING MATERIAL", 105, 15, { align: "center" });

  // Shop Info
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
        matched.pPrice.toFixed(2),
        item.quantity,
        finalPrice,
      ];
    })
    .filter(Boolean);

  // Total calculation
  const totalAmount = tableData.reduce((sum, row) => sum + Number(row[5]), 0);

  // Push total row
  tableData.push(["", "", "", "", "", `Total: ${totalAmount.toFixed(2)}`]);

  // ⚡ FIXED VERSION — AUTO COLUMN FIT & WRAPPING
  doc.autoTable({
    startY: 55,
    head: [["Sr", "Name", "Size", "Rate", "Qty", "Final Price"]],
    body: tableData,
    theme: "grid",

    styles: {
      fontSize: 10,
      cellPadding: 2,
      overflow: "linebreak",
      halign: "center",
    },

    headStyles: {
      fillColor: [29, 78, 216],
      halign: "center",
    },

    // Auto-fit + wrap text
    tableWidth: "auto",
    columnStyles: {
      1: { cellWidth: "wrap" }, // Name auto wrap
    },
    didDrawCell: (data) => {
      // Auto reduce table width
      data.table.width = Math.min(data.table.width, doc.internal.pageSize.width - 20);
    },
  });

  // Save file
  doc.save(`${savedCustomer || "Customer"}_bill.pdf`);
};
