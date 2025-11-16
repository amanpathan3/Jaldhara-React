import React, { useEffect, useState } from "react";
import { getDashboardData } from "../../services/dashboardService";
import SummaryCard from "./SummaryCard";
import MonthlySalesChart from "./MonthlySalesChart";
import DailySalesChart from "./DailySalesChart";
import ProductSalesChart from "./ProductSalesChart";
import CategorySalesChart from "./CategorySalesChart";
import {Header} from "../../component/Header";

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDashboardData();
      setDashboardData(data);
    };
    fetchData();
  }, []);

  if (!dashboardData) return <p className="text-center mt-10">Loading Dashboard...</p>;

  const totalMonthly = dashboardData.monthlySales.reduce((sum, item) => sum + item.revenue, 0);
  const totalDaily = dashboardData.dailySales.reduce((sum, item) => sum + item.revenue, 0);
  const totalProduct = dashboardData.productSales.reduce((sum, item) => sum + item.revenue, 0);
  const totalCategory = dashboardData.categorySales.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <>
      <Header />
      <div className="p-6 mt-16 space-y-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
  <h1 className="text-3xl font-bold text-gray-700 text-center mb-8">
    Jaldhara Supplier Dashboard
  </h1>

  {/* Summary Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <SummaryCard
      title="Total Monthly Revenue"
      value={`₹${totalMonthly}`}
      className="hover:scale-105 transition-transform duration-300 bg-blue-50 text-blue-700"
    />
    <SummaryCard
      title="Total Daily Revenue"
      value={`₹${totalDaily}`}
      className="hover:scale-105 transition-transform duration-300 bg-green-50 text-green-700"
    />
    <SummaryCard
      title="Total Product Revenue"
      value={`₹${totalProduct}`}
      className="hover:scale-105 transition-transform duration-300 bg-yellow-50 text-yellow-700"
    />
    <SummaryCard
      title="Total Category Revenue"
      value={`₹${totalCategory}`}
      className="hover:scale-105 transition-transform duration-300 bg-purple-50 text-purple-700"
    />
  </div>

  {/* Charts */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
    
    {/* Monthly Sales */}
    <div className="bg-white p-4 rounded-2xl shadow-lg h-[320px] hover:shadow-2xl transition-shadow duration-300">
      <MonthlySalesChart data={dashboardData.monthlySales} />
    </div>

    {/* Daily Sales */}
    <div className="bg-white p-4 rounded-2xl shadow-lg h-[320px] hover:shadow-2xl transition-shadow duration-300">
      <DailySalesChart data={dashboardData.dailySales} />
    </div>

    {/* Product Sales */}
    <div className="bg-white p-4 rounded-2xl shadow-lg h-[320px] hover:shadow-2xl transition-shadow duration-300">
      <ProductSalesChart data={dashboardData.productSales} />
    </div>

    {/* Category Sales */}
    <div className="bg-white p-4 rounded-2xl shadow-lg h-[320px] hover:shadow-2xl transition-shadow duration-300">
      <CategorySalesChart data={dashboardData.categorySales} />
    </div>

  </div>
      </div>

     </>
  );
}
