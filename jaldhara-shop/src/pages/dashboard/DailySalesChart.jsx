import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function DailySalesChart({ data }) {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Daily Revenue",
        data: data.map((d) => d.revenue),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        tension: 0.4,
        fill: true,
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
      <h2 className="text-gray-700 font-semibold mb-2">Daily Sales</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
