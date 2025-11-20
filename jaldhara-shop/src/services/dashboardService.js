const BASE_URL = "https://jaldhara-react-1.onrender.com/api";

export const getDashboardData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/dashboard`);
    return await response.json();  // backend returns { daily, monthly, category }

  } catch (err) {
    console.error("Failed to fetch dashboard data:", err);

    return {
      daily: [],
      monthly: [],
      category: [],
    };
  }
};
