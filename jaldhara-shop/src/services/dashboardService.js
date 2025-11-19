const BASE_URL = "https://jaldhara-react-1.onrender.com/api";

export const getDashboardData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/dashboard`);
    const data = await response.json();

    // Transform data to match old frontend structure
    return [
      {
        monthlySales: data.monthly || [],
        dailySales: data.daily || [],
        categorySales: data.category || [],
      },
    ];
  } catch (err) {
    console.error("Failed to fetch dashboard data:", err);
    return [
      {
        monthlySales: [],
        dailySales: [],
        categorySales: [],
      },
    ];
  }
};
