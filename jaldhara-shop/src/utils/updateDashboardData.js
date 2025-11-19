export const updateMonthlySales = async (totalPrice) => {
  try {
    const incomingPaise = Math.round(Number(totalPrice) * 100);

    const today = new Date();
    const currentMonth = today.toLocaleString("en-US", { month: "short" }); // e.g. "Nov"

    const response = await fetch("https://jaldhara-react-1.onrender.com/api/dashboard");
    const dashboard = await response.json();
    const current = Array.isArray(dashboard) ? dashboard[0] : dashboard;

    const monthlySales = Array.isArray(current.monthlySales) ? [...current.monthlySales] : [];

    const idx = monthlySales.findIndex(m => m.month === currentMonth);

    if (idx !== -1) {
      const existingPaise = Math.round(Number(monthlySales[idx].revenue) * 100);
      monthlySales[idx].revenue = Number(((existingPaise + incomingPaise) / 100).toFixed(2));
    } else {
      monthlySales.push({ month: currentMonth, revenue: Number((incomingPaise / 100).toFixed(2)) });
    }

    const fullDashboard = { ...current, monthlySales };

    await fetch("https://jaldhara-react-1.onrender.com/api/dashboard", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullDashboard),
    });
  } catch (error) {
    console.error("Error updating monthly sales:", error);
  }
};


export const updateDailySales = async (totalPrice) => {
  try {
    const incomingPaise = Math.round(Number(totalPrice) * 100);

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2,"0");
    const dd = String(today.getDate()).padStart(2,"0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const response = await fetch("https://jaldhara-react-1.onrender.com/api/dashboard");
    const dashboard = await response.json();
    const current = Array.isArray(dashboard) ? dashboard[0] : dashboard;

    const dailySales = Array.isArray(current.dailySales) ? [...current.dailySales] : [];

    const idx = dailySales.findIndex(d => d.date === todayStr);

    if (idx !== -1) {
      const existingPaise = Math.round(Number(dailySales[idx].revenue) * 100);
      dailySales[idx].revenue = Number(((existingPaise + incomingPaise) / 100).toFixed(2));
    } else {
      dailySales.push({ date: todayStr, revenue: Number((incomingPaise / 100).toFixed(2)) });
    }

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


export const updateCategorySales = async (selectedProducts) => {
  try {
    if (!Array.isArray(selectedProducts) || selectedProducts.length === 0) return;

    const response = await fetch("https://jaldhara-react-1.onrender.com/api/dashboard");
    const dashboard = await response.json();
    const current = Array.isArray(dashboard) ? dashboard[0] : dashboard;

    const categorySales = Array.isArray(current.categorySales) ? [...current.categorySales] : [];

    const catMap = new Map();
    categorySales.forEach(c => {
      catMap.set(c.category, Math.round(Number(c.revenue) * 100));
    });

    selectedProducts.forEach(prod => {
      const cat = prod.pCategory;
      const priceNum = Number(prod.finalPrice) || 0;
      const quantity = Number(prod.quantity) || 1;
      const incomingPaise = Math.round(priceNum * 100) * quantity;
      const prevPaise = catMap.get(cat) || 0;
      catMap.set(cat, prevPaise + incomingPaise);
    });

    const updatedCategorySales = [];
    categorySales.forEach(c => {
      const paise = catMap.get(c.category) || 0;
      updatedCategorySales.push({ category: c.category, revenue: Number((paise / 100).toFixed(2)) });
      catMap.delete(c.category);
    });
    for (const [category, paise] of catMap.entries()) {
      updatedCategorySales.push({ category, revenue: Number((paise / 100).toFixed(2)) });
    }

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
