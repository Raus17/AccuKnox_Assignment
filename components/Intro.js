"use client";
import React, { useState } from "react";
import { RefreshCcw, Settings } from "lucide-react";
import { useDispatch } from "react-redux";
import { addWidget } from "../store/slices/WidgetReducer";

const Intro = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    chartStyle: "bar",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addWidget(form));
    setForm({ name: "", description: "", category: "", chartStyle: "bar" });
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-lg font-semibold">CNAPP DASHBOARD</p>

      <div className="flex gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="px-3 py-1 border border-gray-300 shadow-md text-gray-900 rounded-lg hover:bg-gray-200"
        >
          Add Widget +
        </button>
        <button className="px-2 py-1 border border-gray-300 shadow-md text-gray-900 rounded-lg hover:bg-gray-200">
          <RefreshCcw size={17} />
        </button>
        <button className="px-3 py-1 border border-gray-300 shadow-md text-gray-900 rounded-lg hover:bg-gray-200">
          <Settings size={17} />
        </button>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-6 z-50">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Widget</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border-gray-300 border p-2 rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border-gray-300 border  p-2 rounded"
              required
            />
            <select
              value={form.chartStyle}
              onChange={(e) =>
                setForm({ ...form, chartStyle: e.target.value })
              }
              className="border-gray-300 border  p-2 rounded"
            >
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="pie">Pie</option>
            </select>

            <button
              type="submit"
              className="bg-gray-200 py-2 shadow-md rounded-lg border-gray-300 border hover:bg-gray-300"
            >
              Save Widget
            </button>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="bg-gray-200 py-2 shadow-md  rounded-lg border-gray-300 border hover:bg-gray-300"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Intro;
