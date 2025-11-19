export const updateDashboard = async (selectedProducts, totalPrice) => {
  try {
    // Convert total price to paise (avoid decimals)
    const incomingPaise = Math.round(Number(totalPrice) * 100);

    // Prepare date and month
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;
    const currentMonth = today.toLocaleString("en-US", { month: "short" });

    // Fetch the dashboard only ONCE
    const response = await fetch("https://jaldhara-react-1.onrender.com/api/dashboard");
    const dashboard = await response.json();
    const current = Array.isArray(dashboard) ? dashboard[0] : dashboard;

    // ==========================
    // 1️⃣ UPDATE DAILY SALES
    // ==========================
    const dailySales = [...current.dailySales];
    const dailyIndex = dailySales.findIndex(d => d.date === todayStr);

    if (dailyIndex !== -1) {
      const existingPaise = Math.round(Number(dailySales[dailyIndex].revenue) * 100);
      dailySales[dailyIndex].revenue = (existingPaise + incomingPaise) / 100;
    } else {
      dailySales.push({ date: todayStr, revenue: incomingPaise / 100 });
    }
    console.log("Aman donnnn...")

    // ==========================
    // 2️⃣ UPDATE MONTHLY SALES
    // ==========================
    const monthlySales = [...current.monthlySales];
    const monthIdx = monthlySales.findIndex(m => m.month === currentMonth);

    if (monthIdx !== -1) {
      const existingPaise = Math.round(Number(monthlySales[monthIdx].revenue) * 100);
      monthlySales[monthIdx].revenue = (existingPaise + incomingPaise) / 100;
    } else {
      monthlySales.push({ month: currentMonth, revenue: incomingPaise / 100 });
    }

    // ==========================
    // 3️⃣ UPDATE CATEGORY SALES
    // ==========================
    const categorySales = [...current.categorySales];

    const catMap = new Map();
    categorySales.forEach(c => {
      catMap.set(c.category, Math.round(Number(c.revenue) * 100));
    });

    selectedProducts.forEach(prod => {
      const category = prod.pCategory;
      const price = Math.round(Number(prod.finalPrice) * 100);
      const qty = Number(prod.quantity) || 1;
      const incoming = price * qty;

      const prev = catMap.get(category) || 0;
      catMap.set(category, prev + incoming);
    });

    const updatedCategorySales = categorySales.map(c => ({
      category: c.category,
      revenue: (catMap.get(c.category) || 0) / 100
    }));

    // ==========================
    // 4️⃣ FINAL DASHBOARD UPDATE
    // ==========================
    const finalDashboard = {
      ...current,
      dailySales,
      monthlySales,
      categorySales: updatedCategorySales
    };

    await fetch("https://jaldhara-react-1.onrender.com/api/dashboard", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalDashboard),
    });

  } catch (err) {
    console.error("Dashboard update failed:", err);
  }
};
