import React, { useEffect, useState } from "react";
import { getDashboardData } from "../../services/dashboardService";
import SummaryCard from "./SummaryCard";
import MonthlySalesChart from "./MonthlySalesChart";
import DailySalesChart from "./DailySalesChart";
import CategorySalesChart from "./CategorySalesChart";
import { Header } from "../../component/Header";

export function Dashboard() {
  const [daily, setDaily] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardData();

        // setDaily(data.daily || []);
        // setMonthly(data.monthly || []);
        // setCategory(data.category || []);
        const dashboard = Array.isArray(data) ? data[0] : data;

        setDaily(dashboard.daily || []);
        setMonthly(dashboard.monthly || []);
        setCategory(dashboard.category || []);

      } catch (err) {
        console.error("Dashboard fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Loading Dashboard...</p>;

  const totalMonthly = monthly.reduce((sum, m) => sum + (m.revenue || 0), 0);
  const totalDaily = daily.reduce((sum, d) => sum + (d.revenue || 0), 0);
  const totalCategory = category.reduce((sum, c) => sum + (c.revenue || 0), 0);

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
              <MonthlySalesChart data={monthly} />
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-lg h-[320px] hover:shadow-2xl transition-shadow duration-300">
              <DailySalesChart data={daily} />
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-lg h-[320px] hover:shadow-2xl transition-shadow duration-300">
              <CategorySalesChart data={category} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
