export const updateDailySales = async (totalPrice) => {
  try {
    const incomingPaise = Math.round(Number(totalPrice) * 100);

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    await fetch("https://jaldhara-react-1.onrender.com/api/daily-sales/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: todayStr, amount: incomingPaise }),
    });

  } catch (err) {
    console.error("Daily Sales Update Failed:", err);
  }
};


export const updateMonthlySales = async (totalPrice) => {
  try {
    const incomingPaise = Math.round(Number(totalPrice) * 100);

    const today = new Date();
    const currentMonth = today.toLocaleString("en-US", { month: "short" });

    await fetch("https://jaldhara-react-1.onrender.com/api/monthly-sales/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ month: currentMonth, amount: incomingPaise }),
    });

  } catch (err) {
    console.error("Monthly Sales Update Failed:", err);
  }
};


export const updateCategorySales = async (selectedProducts) => {
  try {
    await fetch("https://jaldhara-react-1.onrender.com/api/category-sales/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: selectedProducts }),
    });

  } catch (err) {
    console.error("Category Sales Update Failed:", err);
  }
};
