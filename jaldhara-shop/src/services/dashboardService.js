import axios from "axios";

const BASE_URL = "https://jaldhara-react-1.onrender.com/api/dashboard";

// GET dashboard data
export const getDashboardData = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // returns array [dashboard]
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    return []; // fallback empty array
  }
};

// UPDATE dashboard data
export const updateDashboardData = async (data) => {
  try {
    const response = await axios.put(BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error updating dashboard:", error);
    throw error;
  }
};
