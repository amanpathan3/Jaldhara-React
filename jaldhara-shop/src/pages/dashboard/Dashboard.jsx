import React, { useEffect, useState } from "react";
import { getDashboardData } from "../../services/dashboardService";
import SummaryCard from "./SummaryCard";
import MonthlySalesChart from "./MonthlySalesChart";
import DailySalesChart from "./DailySalesChart";
import CategorySalesChart from "./CategorySalesChart";
import { Header } from "../../component/Header";

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    monthlySales: [],
    dailySales: [],
    categorySales: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();

        if (data && data.length > 0) {
          setDashboardData(data[0]); // Use first dashboard object
        } else {
          // Fallback if no dashboard exists
          setDashboardData({
            monthlySales: [
              { month: "Jan", revenue: 0 },
              { month: "Feb", revenue: 0 },
              { month: "Mar", revenue: 0 },
              { month: "April", revenue: 0 },
              { month: "May", revenue: 0 },
              { month: "June", revenue: 0 },
              { month: "July", revenue: 0 },
              { month: "Aug", revenue: 0 },
              { month: "Semp", revenue: 0 },
              { month: "Oct", revenue: 0 },
              { month: "Nov", revenue: 0 },
              { month: "Dec", revenue: 0 },
            ],
            dailySales: [],
            categorySales: [
              { category: "CPVC", revenue: 0 },
              { category: "UPVC", revenue: 0 },
              { category: "SWR", revenue: 0 },
              { category: "Others", revenue: 0 },
            ],
          });
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading Dashboard...</p>;

  const totalMonthly = dashboardData.monthlySales.reduce((sum, item) => sum + (item.revenue || 0), 0);
  const totalDaily = dashboardData.dailySales.reduce((sum, item) => sum + (item.revenue || 0), 0);
  const totalCategory = dashboardData.categorySales.reduce((sum, item) => sum + (item.revenue || 0), 0);

  return (
    <>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="w-full max-w-7xl p-6 mt-16 space-y-8">
          <h1 className="text-3xl font-bold text-gray-700 text-center mb-8">
            Jaldhara Supplier Dashboard
          </h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
              title="Total Monthly Revenue"
              value={`₹${totalMonthly.toFixed(2)}`}
              className="hover:scale-105 transition-transform duration-300 bg-blue-50 text-blue-700"
            />
            <SummaryCard
              title="Total Daily Revenue"
              value={`₹${totalDaily.toFixed(2)}`}
              className="hover:scale-105 transition-transform duration-300 bg-green-50 text-green-700"
            />
            <SummaryCard
              title="Total Category Revenue"
              value={`₹${totalCategory.toFixed(2)}`}
              className="hover:scale-105 transition-transform duration-300 bg-purple-50 text-purple-700"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-2xl shadow-lg h-[320px] hover:shadow-2xl transition-shadow duration-300">
              <MonthlySalesChart data={dashboardData.monthlySales} />
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-lg h-[320px] hover:shadow-2xl transition-shadow duration-300">
              <DailySalesChart data={dashboardData.dailySales} />
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-lg h-[320px] hover:shadow-2xl transition-shadow duration-300">
              <CategorySalesChart data={dashboardData.categorySales} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
