export const updateMonthlySales = async (totalPrice) => {
  try {
    const monthNames = ["Jan","Feb","Mar","April","May","June","July","Aug","Semp","Oct","Nov","Dec"];
    const today = new Date();
    const currentMonth = monthNames[today.getMonth()];

    const response = await fetch("https://jaldhara-react-1.onrender.com/api/dashboard");
    const dashboard = await response.json();
    const current = Array.isArray(dashboard) ? dashboard[0] : dashboard;

    const monthlySales = Array.isArray(current.monthlySales) ? current.monthlySales : [];

    const updatedMonthlySales = monthlySales.map(item => {
      if (item.month === currentMonth) {
        const incomingPaise = Math.round(totalPrice * 100);
        const existingPaise = Math.round((item.revenue || 0) * 100);
        const newPaise = existingPaise + incomingPaise;

        return { ...item, revenue: Number((newPaise / 100).toFixed(2)) };
      }
      return item;
    });

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

    const dailySales = Array.isArray(current.dailySales) ? current.dailySales : [];

    const incomingPaise = Math.round(totalPrice * 100);

    const index = dailySales.findIndex(item => item.date === todayStr);

    if (index !== -1) {
      const existingPaise = Math.round((dailySales[index].revenue || 0) * 100);
      const newPaise = existingPaise + incomingPaise;
      dailySales[index].revenue = Number((newPaise / 100).toFixed(2));
    } else {
      dailySales.push({
        date: todayStr,
        revenue: Number((incomingPaise / 100).toFixed(2))
      });
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
    const response = await fetch("https://jaldhara-react-1.onrender.com/api/dashboard");
    const dashboard = await response.json();
    const current = Array.isArray(dashboard) ? dashboard[0] : dashboard;

    const categorySales = Array.isArray(current.categorySales) ? current.categorySales : [];

    selectedProducts.forEach(prod => {
      const catEntry = categorySales.find(c => c.category === prod.pCategory);
      if (catEntry) {
        const incomingPaise = Math.round((Number(prod.finalPrice) || 0) * 100);
        const existingPaise = Math.round((catEntry.revenue || 0) * 100);
        const newPaise = existingPaise + incomingPaise;

        catEntry.revenue = Number((newPaise / 100).toFixed(2));
      }
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

