import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategorySalesChart({ data }) {
  const chartData = {
    labels: data.map((c) => c.category),
    datasets: [
      {
        label: "Category Revenue",
        data: data.map((c) => c.revenue),
        backgroundColor: ["#3b82f6","#10b981","#facc15","#6b7280"], // blue/green/yellow theme
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // important to prevent overlap
    plugins: {
      legend: {
        position: "right", // show legend on right for better layout
        labels: {
          color: "#1E3A8A", // blue theme for legend text
          font: { size: 14 },
        },
      },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow h-[300px]">
      <h2 className="text-gray-700 font-semibold mb-2">Category Sales</h2>
      <div className="h-full">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
