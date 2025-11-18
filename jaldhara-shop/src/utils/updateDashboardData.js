// =========================
// Update Monthly Sales
// =========================
export const updateMonthlySales = async (totalPrice) => {
  try {
    const monthNames = ["Jan","Feb","Mar","April","May","June","July","Aug","Semp","Oct","Nov","Dec"];
    const today = new Date();
    const currentMonth = monthNames[today.getMonth()];

    // Fetch dashboard
    const response = await fetch("https://jaldhara-react-1.onrender.com/api/dashboard");
    const dashboard = await response.json();
    const current = Array.isArray(dashboard) ? dashboard[0] : dashboard;

    // Ensure monthlySales exists
    const monthlySales = Array.isArray(current.monthlySales) ? current.monthlySales : [];

    // Update current month revenue
    const updatedMonthlySales = monthlySales.map(item =>
      item.month === currentMonth
        ? { ...item, revenue: (item.revenue || 0) + totalPrice }
        : item
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
    const mm = String(today.getMonth() + 1).padStart(2,"0");
    const dd = String(today.getDate()).padStart(2,"0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const response = await fetch("https://jaldhara-react-1.onrender.com/api/dashboard");
    const dashboard = await response.json();
    const current = Array.isArray(dashboard) ? dashboard[0] : dashboard;

    const dailySales = Array.isArray(current.dailySales) ? current.dailySales : [];

    const index = dailySales.findIndex(item => item.date === todayStr);
    if (index !== -1) dailySales[index].revenue += totalPrice;
    else dailySales.push({ date: todayStr, revenue: totalPrice });

    const fullDashboard = { ...current, dailySales };

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

    const categorySales = Array.isArray(current.categorySales) ? current.categorySales : [];

    selectedProducts.forEach(prod => {
      const catEntry = categorySales.find(c => c.category === prod.pCategory);
      if (catEntry) catEntry.revenue += Number(prod.finalPrice) || 0;
    });

    const fullDashboard = { ...current, categorySales };

    await fetch("https://jaldhara-react-1.onrender.com/api/dashboard", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullDashboard),
    });
  } catch (error) {
    console.error("Error updating category sales:", error);
  }
};
