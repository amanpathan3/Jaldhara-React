import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProductSalesChart({ data }) {
  const chartData = {
    labels: data.map((p) => p.productName),
    datasets: [
      {
        label: "Product Revenue",
        data: data.map((p) => p.revenue),
        backgroundColor: "#0ea5e9",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-gray-700 font-semibold mb-2">Product Sales</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}
