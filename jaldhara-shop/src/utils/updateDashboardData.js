export const updateDashboard = async (selectedProducts, totalPrice) => {
  console.log("🔵 [DBG] updateDashboard START", { selectedProducts, totalPrice });

  try {
    // Convert total price to paise
    const incomingPaise = Math.round(Number(totalPrice) * 100);
    console.log("🟡 [DBG] incomingPaise:", incomingPaise);

    // Prepare date and month
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;
    const currentMonth = today.toLocaleString("en-US", { month: "short" });

    console.log("🟣 [DBG] Today:", todayStr, "Month:", currentMonth);

    // ==========================
    // 0️⃣ FETCH DASHBOARD
    // ==========================
    console.log("🟠 [DBG] FETCHING dashboard...");
    const response = await fetch("https://jaldhara-react-1.onrender.com/api/dashboard");
    console.log("🟠 [DBG] Fetch status:", response.status);

    const dashboard = await response.json();
    const current = Array.isArray(dashboard) ? dashboard[0] : dashboard;

    console.log("🟠 [DBG] Dashboard loaded:", current);

    // ==========================
    // 1️⃣ UPDATE DAILY SALES
    // ==========================
    const dailySales = [...current.dailySales];
    const dailyIndex = dailySales.findIndex(d => d.date === todayStr);

    if (dailyIndex !== -1) {
      console.log("🟢 [DBG] Updating existing daily sale...");
      const existingPaise = Math.round(Number(dailySales[dailyIndex].revenue) * 100);
      dailySales[dailyIndex].revenue = (existingPaise + incomingPaise) / 100;
    } else {
      console.log("🟢 [DBG] Adding new daily sale...");
      dailySales.push({ date: todayStr, revenue: incomingPaise / 100 });
    }

    // ==========================
    // 2️⃣ UPDATE MONTHLY SALES
    // ==========================
    const monthlySales = [...current.monthlySales];
    const monthIdx = monthlySales.findIndex(m => m.month === currentMonth);

    if (monthIdx !== -1) {
      console.log("🔵 [DBG] Updating existing monthly sale...");
      const existingPaise = Math.round(Number(monthlySales[monthIdx].revenue) * 100);
      monthlySales[monthIdx].revenue = (existingPaise + incomingPaise) / 100;
    } else {
      console.log("🔵 [DBG] Adding new monthly sale...");
      monthlySales.push({ month: currentMonth, revenue: incomingPaise / 100 });
    }

    // ==========================
    // 3️⃣ UPDATE CATEGORY SALES
    // ==========================
    console.log("🟤 [DBG] Updating category sales...");

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

    console.log("🟤 [DBG] categorySales updated:", updatedCategorySales);

    // ==========================
    // 4️⃣ SEND FINAL DATA
    // ==========================
    const finalDashboard = {
      ...current,
      dailySales,
      monthlySales,
      categorySales: updatedCategorySales
    };

    console.log("🟩 [DBG] Sending PUT request...");
    await fetch("https://jaldhara-react-1.onrender.com/api/dashboard", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalDashboard),
    });
    console.log("🟩 [DBG] PUT Completed!");

  } catch (err) {
    console.error("🔴 [DBG] Dashboard update failed:", err);
  }
};
