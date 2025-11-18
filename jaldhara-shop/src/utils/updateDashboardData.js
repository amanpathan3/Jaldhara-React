// =========================
// Update Monthly Sales
// =========================
export const updateMonthlySales = async (totalPrice) => {
  try {
    const monthNames = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Semp", "Oct", "Nov", "Dec"];
    const today = new Date();
    const currentMonth = monthNames[today.getMonth()];

    // Fetch full dashboard object
    const response = await fetch("https://jaldhara-react-1.onrender.com/api/dashboard");
    const dashboard = await response.json();

    const current = Array.isArray(dashboard) ? dashboard[0] : dashboard;

    // Update monthlySales
    const updatedMonthlySales = current.monthlySales.map(item =>
      item.month === currentMonth ? { ...item, revenue: item.revenue + totalPrice } : item
    );

    // Send full object
    const fullDashboard = { ...current, monthlySales: updatedMonthlySales };

    await fetch("https://jaldhara-react-1.onrender.com/api/dashboard", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullDashboard),
    });
  } catch (error) {
    console.error("Error updating monthly sales:", error);
  }
};

// =========================
// Update Daily Sales
// =========================
export const updateDailySales = async (totalPrice) => {
  try {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const response = await fetch("https://jaldhara-react-1.onrender.com/api/dashboard");
    const dashboard = await response.json();
    const current = Array.isArray(dashboard) ? dashboard[0] : dashboard;

    // Update dailySales
    let dailySalesUpdated = Array.isArray(current.dailySales) ? current.dailySales : [];
    const index = dailySalesUpdated.findIndex(item => item.date === todayStr);

    if (index !== -1) {
      dailySalesUpdated[index].revenue += totalPrice;
    } else {
      dailySalesUpdated.push({ date: todayStr, revenue: totalPrice });
    }

    const fullDashboard = { ...current, dailySales: dailySalesUpdated };

    await fetch("https://jaldhara-react-1.onrender.com/api/dashboard", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullDashboard),
    });
  } catch (error) {
    console.error("Error updating daily sales:", error);
  }
};

// =========================
// Update Category Sales
// =========================
export const updateCategorySales = async (selectedProducts) => {
  try {
    const response = await fetch("https://jaldhara-react-1.onrender.com/api/dashboard");
    const dashboard = await response.json();
    const current = Array.isArray(dashboard) ? dashboard[0] : dashboard;

    // Update categorySales
    const updatedCategorySales = current.categorySales.map(cat => ({ ...cat }));

    selectedProducts.forEach(prod => {
      const catEntry = updatedCategorySales.find(c => c.category === prod.pCategory);
      if (catEntry) {
        catEntry.revenue += Number(prod.finalPrice) || 0;
      }
    });

    const fullDashboard = { ...current, categorySales: updatedCategorySales };

    await fetch("https://jaldhara-react-1.onrender.com/api/dashboard", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullDashboard),
    });
  } catch (error) {
    console.error("Error updating category sales:", error);
  }
};
