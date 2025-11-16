//Monthly Sales
export const updateMonthlySales = async (totalPrice) => {
  try {
    const monthNames = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Semp", "Oct", "Nov", "Dec"];
    const today = new Date();
    const currentMonth = monthNames[today.getMonth()]; // getMonth() returns 0-11

    const response = await fetch("http://localhost:5000/api/dashboard");
    const data = await response.json();


    const updatedMonthlySales = data[0].monthlySales.map((item) => {
      if (item.month === currentMonth) {
        return {
          ...item,
          revenue: item.revenue + totalPrice // add new revenue
        };
      }
      return item;
    });

    const updateResponse = await fetch("http://localhost:5000/api/dashboard", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ monthlySales: updatedMonthlySales }),
    });
  } catch (error) {
    console.error("Error updating monthly sales:", error);
  }
};


//DailySales

export const updateDailySales = async (totalPrice) => {
  try {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // GET FULL DASHBOARD DATA
    const response = await fetch("http://localhost:5000/api/dashboard");
    const data = await response.json();
    const dashboard = data[0]; // full object

    // ENSURE ARRAY EXISTS
    let dailySalesUpdated = dashboard.dailySales || [];
    if (!Array.isArray(dailySalesUpdated)) dailySalesUpdated = [];

    const index = dailySalesUpdated.findIndex(item => item.date === todayStr);

    if (index !== -1) {
      dailySalesUpdated[index].revenue += totalPrice;
    } else {
      dailySalesUpdated.push({ date: todayStr, revenue: totalPrice });
    }

    // 🔥 IMPORTANT: SEND FULL OBJECT (NOT JUST dailySales)
    const finalUpdatedDashboard = {
      ...dashboard,
      dailySales: dailySalesUpdated,
    };

    await fetch("http://localhost:5000/api/dashboard", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalUpdatedDashboard),
    });

  } catch (error) {
    console.error("Error updating daily sales:", error);
  }
};

export const updateCategorySales = async (selectedProducts) => {
  try {
    const response = await fetch("http://localhost:5000/api/dashboard");
    const data = await response.json();
    const dashboard = data[0];

    const updatedCategorySales = dashboard.categorySales.map(cat => ({ ...cat }));

    selectedProducts.forEach(prod => {
  const categoryEntry = updatedCategorySales.find(c => c.category === prod.pCategory);
  if (categoryEntry) {
    categoryEntry.revenue += prod.finalPrice; // finalPrice is already a number
  }
});


    await fetch("http://localhost:5000/api/dashboard", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categorySales: updatedCategorySales }),
    });

    console.log("Category sales updated successfully:", updatedCategorySales);
  } catch (error) {
    console.error("Error updating category sales:", error);
  }
};

