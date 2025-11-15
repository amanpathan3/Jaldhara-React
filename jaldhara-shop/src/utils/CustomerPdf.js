import jsPDF from "jspdf";
import "jspdf-autotable";
export  const handleGeneratePDF = (customer,totalFinalPrice) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(55, 65, 81);
    doc.text(
      "JALDHARA MACHINERY AND PLUMBING MATERIAL",
      105,
      15,
      { align: "center" }
    );
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");

    doc.text("Owner Name: Zahir Sayyad", 14, 35);
    doc.text("Mo.No: 9637847576", 14, 42);
    doc.text("Address: Dhamangaon, Beed", 14, 49);


    doc.text(`Customer Name: ${customer.name}`, 150, 35);

    const tableData = customer.products.map((p, index) => [
      index + 1,
      p.name,
      p.size,
      p.price,
      p.qty,
      p.finalPrice
    ]);
    tableData.push(["", "", "", "", "", `Total:${(totalFinalPrice).toFixed(2)}`]);
    doc.autoTable({
      startY: 60,
      head: [["Sr", "Item", "Size", "Price", "Qty", "Final"]],
      body: tableData,
      headStyles: { fillColor: [29, 78, 216] }, // dark grey
      theme: "grid"
    });

    doc.save(`${customer.name}-bill.pdf`);
  };