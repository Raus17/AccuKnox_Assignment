"use client";
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { X } from "lucide-react";

const dummyData = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 30 },
  { name: "Mar", value: 20 },
  { name: "Apr", value: 27 },
  { name: "May", value: 18 },
  { name: "Jun", value: 23 },
];

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#00C49F",
  "#FFBB28",
];

const Widgets = ({ title, description, type, onRemove }) => {
  const stats = useMemo(() => {
    const values = dummyData.map((d) => d.value);
    const total = values.reduce((a, b) => a + b, 0);
    const avg = (total / values.length).toFixed(2);
    const max = Math.max(...values);
    const min = Math.min(...values);

    return { total, avg, max, min };
  }, []);

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dummyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dummyData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {dummyData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return <p>No chart type selected</p>;
    }
  };

  return (
    // Added 'relative' positioning to the parent container
    <div className="relative w-[480px] h-[300px] border border-gray-300 shadow-md rounded-lg p-4 flex flex-col">
      {/* Remove button - now properly positioned */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-1 shadow-md hover:shadow-lg z-10"
          title="Remove widget"
        >
          <X size={16} />
        </button>
      )}

      {/* Title and Description */}
      <div className="mb-4">
        <h2 className="font-bold text-lg text-gray-800 mb-1">{title}</h2>
        <p className="italic text-sm text-gray-600">{description}</p>
      </div>

      {/* Chart and Stats Container */}
      <div className="flex flex-1">
        {/* Chart Left */}
        <div className="flex-1 pr-4">{renderChart()}</div>

        {/* Stats Right */}
        <div className="w-1/3 pl-4 flex flex-col justify-center border-l border-gray-200">
          <ul className="text-sm space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="mr-2">📊</span>
              <span>
                Total: <strong>{stats.total.toLocaleString()}</strong>
              </span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">📈</span>
              <span>
                Max: <strong>{stats.max.toLocaleString()}</strong>
              </span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">📉</span>
              <span>
                Min: <strong>{stats.min.toLocaleString()}</strong>
              </span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">⚖️</span>
              <span>
                Avg: <strong>{stats.avg.toLocaleString()}</strong>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Widgets;
