"use client";
import React, { useState, useMemo } from "react";
import { RefreshCcw, Settings, Search, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addWidget, removeWidget, toggleWidget } from "../store/slices/WidgetReducer";

const Intro = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "CPSMExecutive",
    chartStyle: "bar",
  });

  const dispatch = useDispatch();
  const allWidgets = useSelector(state => state.widgets.widgets || {});

  // Get all widgets across all categories for settings
  const allWidgetsFlattened = useMemo(() => {
    const widgets = [];
    Object.entries(allWidgets).forEach(([category, categoryWidgets]) => {
      categoryWidgets.forEach(widget => {
        widgets.push({
          ...widget,
          category,
          isActive: true // You might want to track this in your Redux store
        });
      });
    });
    return widgets;
  }, [allWidgets]);

  // Filter widgets based on search term and category
  const filteredWidgets = useMemo(() => {
    return allWidgetsFlattened.filter(widget => {
      const matchesSearch = widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           widget.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || widget.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allWidgetsFlattened, searchTerm, selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addWidget(form));
    console.log(form);
    setForm({ name: "", description: "", category: "CPSMExecutive", chartStyle: "bar" });
    setIsSidebarOpen(false);
  };

  const handleRemoveWidget = (category, widgetId) => {
    dispatch(removeWidget({ category, widgetId }));
  };

  const getCategoryDisplayName = (category) => {
    const categoryNames = {
      CPSMExecutive: "CPSM Executive",
      CWPPdashboard: "CWPP Dashboard", 
      RegistryScan: "Registry Scan"
    };
    return categoryNames[category] || category;
  };

  const getChartIcon = (chartStyle) => {
    switch (chartStyle) {
      case 'bar': return '📊';
      case 'line': return '📈';
      case 'pie': return '🥧';
      default: return '📊';
    }
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
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="px-3 py-1 border border-gray-300 shadow-md text-gray-900 rounded-lg hover:bg-gray-200"
        >
          <Settings size={17} />
        </button>
      </div>

      {/* Add Widget Sidebar */}
      {isSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-6 z-50">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Widget</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Widget Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border-gray-300 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                placeholder="Widget Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              />
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="border-gray-300 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="CPSMExecutive">CPSM Executive Dashboard</option>
                <option value="CWPPdashboard">CWPP Dashboard</option>
                <option value="RegistryScan">Registry Scan</option>
              </select>
              <select
                value={form.chartStyle}
                onChange={(e) =>
                  setForm({ ...form, chartStyle: e.target.value })
                }
                className="border-gray-300 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
              </select>

              <button
                type="submit"
                className="bg-gray-200 py-2 shadow-md rounded-lg border-gray-300 border hover:bg-gray-300 transition-colors"
              >
                Save Widget
              </button>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="bg-gray-200 py-2 shadow-md rounded-lg border-gray-300 border hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </form>
          </div>
        </>
      )}

      {/* Settings/Widget Management Sidebar */}
      {isSettingsOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsSettingsOpen(false)}
          ></div>
          
          <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-6 z-50 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Manage Widgets</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-4 space-y-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search widgets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="CPSMExecutive">CPSM Executive</option>
                <option value="CWPPdashboard">CWPP Dashboard</option>
                <option value="RegistryScan">Registry Scan</option>
              </select>
            </div>

            {/* Widget Count */}
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredWidgets.length} of {allWidgetsFlattened.length} widgets
            </div>

            {/* Widgets List */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredWidgets.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm ? 'No widgets found matching your search.' : 'No widgets available.'}
                </div>
              ) : (
                filteredWidgets.map((widget) => (
                  <div
                    key={`${widget.category}-${widget.id}`}
                    className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{getChartIcon(widget.chartStyle)}</span>
                          <h3 className="font-medium text-gray-800">{widget.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{widget.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {getCategoryDisplayName(widget.category)}
                          </span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded capitalize">
                            {widget.chartStyle}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveWidget(widget.category, widget.id)}
                        className="ml-2 text-red-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50"
                        title="Remove widget"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer with summary */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                <div className="text-center">
                  <div className="font-semibold text-lg text-blue-600">
                    {allWidgets.CPSMExecutive?.length || 0}
                  </div>
                  <div>CPSM</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-lg text-green-600">
                    {allWidgets.CWPPdashboard?.length || 0}
                  </div>
                  <div>CWPP</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-lg text-purple-600">
                    {allWidgets.RegistryScan?.length || 0}
                  </div>
                  <div>Registry</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Intro;