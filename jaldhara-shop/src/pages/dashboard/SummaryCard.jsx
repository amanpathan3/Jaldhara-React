import React from "react";

export default function SummaryCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
      <h2 className="text-gray-500 font-medium">{title}</h2>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
}
