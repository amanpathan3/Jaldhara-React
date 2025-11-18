// =========================
// Update Monthly Sales
// =========================
export const updateMonthlySales = async (totalPrice) => {
  try {
    const monthNames = ["Jan","Feb","Mar","April","May","June","July","Aug","Semp","Oct","Nov","Dec"];
    const today = new Date();
    const currentMonth = monthNames[today.getMonth()];

    const response = await fetch("https://jaldhara-react-1.onrender.com/api/dashboard");
    const dashboard = await response.json(); 
    const current = dashboard[0] || { monthlySales: [], dailySales: [], categorySales: [] };

    const updatedMonthlySales = current.monthlySales.map(item => 
      item.month === currentMonth
        ? { ...item, revenue: Number(item.revenue) + Number(totalPrice) }
        : { ...item, revenue: Number(item.revenue) }
    );

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
    const dashboard = (await response.json())[0] || { monthlySales: [], dailySales: [], categorySales: [] };

    let dailySalesUpdated = dashboard.dailySales || [];
    if (!Array.isArray(dailySalesUpdated)) dailySalesUpdated = [];

    const index = dailySalesUpdated.findIndex(item => item.date === todayStr);
    if (index !== -1) {
      dailySalesUpdated[index].revenue = Number(dailySalesUpdated[index].revenue) + Number(totalPrice);
    } else {
      dailySalesUpdated.push({ date: todayStr, revenue: Number(totalPrice) });
    }

    const fullDashboard = { ...dashboard, dailySales: dailySalesUpdated };

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
    const dashboard = (await response.json())[0] || { monthlySales: [], dailySales: [], categorySales: [] };

    const updatedCategorySales = dashboard.categorySales.map(cat => ({ ...cat, revenue: Number(cat.revenue) }));

    selectedProducts.forEach(prod => {
      const catEntry = updatedCategorySales.find(c => c.category === prod.pCategory);
      if (catEntry) {
        catEntry.revenue += Number(prod.finalPrice) || 0;
      }
    });

    const fullDashboard = { ...dashboard, categorySales: updatedCategorySales };

    await fetch("https://jaldhara-react-1.onrender.com/api/dashboard", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullDashboard),
    });
  } catch (error) {
    console.error("Error updating category sales:", error);
  }
};
