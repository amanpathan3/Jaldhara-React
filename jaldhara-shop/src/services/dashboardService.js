export const getDashboardData = async () => {
  const response = await fetch("/api/dashboard");
  return await response.json();
};
