import axios from "axios";

const BASE_URL = "http://localhost:5000/api/dashboard"; // your backend route

// GET dashboard data
export const getDashboardData = async () => {
  const response = await axios.get(BASE_URL);
  return response.data[0]; // your JSON has an array with one object
};

// UPDATE dashboard data (optional, if you want to modify)
export const updateDashboardData = async (data) => {
  const response = await axios.put(BASE_URL, data);
  return response.data;
};
