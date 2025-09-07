import React, { useState, useEffect } from "react";
import Widget from "./components/Widget";
import EmptyWidget from "./components/EmptyWidget";

import { initialDashboard, widgetOptions } from "./data/dashboardData";
import { widgetComponents } from "./data/widgetComponents";

export default function App() {
  const [dashboard, setDashboard] = useState(() => {
    const saved = localStorage.getItem("dashboard");
    return saved ? JSON.parse(saved) : initialDashboard;
  });

  const [showAddWidget, setShowAddWidget] = useState(false);
  const [activeTab, setActiveTab] = useState("cspm");
  const [selectedWidgets, setSelectedWidgets] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetChart, setNewWidgetChart] = useState("Text");

  // Sidebar widgets state (predefined + user-added)
  const [sidebarWidgets, setSidebarWidgets] = useState(() => ({ ...widgetOptions }));

  // Persist dashboard to localStorage
  useEffect(() => {
    localStorage.setItem("dashboard", JSON.stringify(dashboard));
  }, [dashboard]);

  // Update selectedWidgets when activeTab changes
  useEffect(() => {
    const categoryId =
      activeTab === "image"
        ? "registry"
        : activeTab === "ticket"
        ? "ticket"
        : activeTab;
    const currentWidgetIds = new Set(
      dashboard.categories.find((cat) => cat.id === categoryId)?.widgets.map((w) => w.id) || []
    );
    setSelectedWidgets(currentWidgetIds);
  }, [activeTab, dashboard]);

  const toggleWidgetSelection = (widgetId) => {
    setSelectedWidgets((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(widgetId)) newSet.delete(widgetId);
      else newSet.add(widgetId);
      return newSet;
    });
  };

  const confirmAddWidgets = () => {
    // Add new widget to sidebar list if name provided
    let newWidget = null;
    if (newWidgetName) {
      newWidget = {
        id: `${activeTab}_${Date.now()}`,
        name: newWidgetName,
        chartType: newWidgetChart,
      };
      setSidebarWidgets((prev) => ({
        ...prev,
        [activeTab]: [...(prev[activeTab] || []), newWidget],
      }));
      setSelectedWidgets((prev) => new Set(prev.add(newWidget.id)));
    }

    // Update dashboard
    setDashboard((prevDashboard) => ({
      ...prevDashboard,
      categories: prevDashboard.categories.map((cat) => {
        const isRegistry = cat.id === "registry" && activeTab === "image";
        const isTicket = cat.id === "ticket" && activeTab === "ticket";
        const match = isRegistry || isTicket || cat.id === activeTab;
        if (!match) return cat;

        const widgetsToAdd =
          (sidebarWidgets[activeTab] || []).filter((w) => selectedWidgets.has(w.id)) || [];
        if (newWidget) widgetsToAdd.push(newWidget);

        return { ...cat, widgets: widgetsToAdd };
      }),
    }));

    setNewWidgetName("");
    setNewWidgetChart("Text");
    setShowAddWidget(false);
  };

  const removeWidgetFromCategory = (categoryId, widgetId) => {
    setDashboard((prevDashboard) => ({
      ...prevDashboard,
      categories: prevDashboard.categories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          widgets: cat.widgets.filter((w) => w.id !== widgetId),
        };
      }),
    }));
  };

  // Filter widgets on home page search
  const filteredDashboard = {
    ...dashboard,
    categories: dashboard.categories.map((cat) => ({
      ...cat,
      widgets: cat.widgets
        .filter((w) => w.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
          // Bring search matches to top
          if (searchQuery && a.name.toLowerCase().includes(searchQuery.toLowerCase()))
            return -1;
          return 0;
        }),
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <h1 className="text-xl font-bold">CNAPP Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <input
            type="text"
            placeholder="Search widgets..."
            className="border px-2 py-1 rounded w-full md:w-60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded shadow text-sm"
            onClick={() => setShowAddWidget(true)}
          >
            + Add Widget
          </button>
        </div>
      </div>

      {/* Dashboard */}
      <div className="space-y-8">
        {filteredDashboard.categories.map((category) => (
          <div key={category.id}>
            <h2 className="font-semibold mb-3">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {category.widgets.map((widget) => {
                let WidgetComponent = null;
                // Prebuilt or chart widget
                if (widgetComponents[widget.id]) WidgetComponent = widgetComponents[widget.id];
                else if (widget.chartType) {
                  if (widget.chartType === "Pie") WidgetComponent = widgetComponents["cloud_accounts"];
                  else if (widget.chartType === "Bar") WidgetComponent = widgetComponents["risk_assessment"];
                  else if (widget.chartType === "Ticket") WidgetComponent = widgetComponents["ticket_1"];
                  else WidgetComponent = () => <div className="p-4">{widget.name}</div>;
                }

                return (
                  <Widget
                    key={widget.id}
                    title={widget.name}
                    onRemove={() => removeWidgetFromCategory(category.id, widget.id)}
                  >
                    {WidgetComponent ? <WidgetComponent /> : <p>{widget.name}</p>}
                  </Widget>
                );
              })}
              <EmptyWidget
                onClick={() => {
                  const tabToOpen =
                    category.id === "registry"
                      ? "image"
                      : category.id === "ticket"
                      ? "ticket"
                      : category.id;
                  setActiveTab(tabToOpen);
                  setShowAddWidget(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Widget Sidebar */}
      {showAddWidget && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={() => setShowAddWidget(false)}
            className="bg-black/30 flex-1"
          />
          <div className="bg-white w-full md:w-[400px] h-full shadow-lg px-6 py-8 fixed right-0 top-0 z-50 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-blue-900">Add Widget</h2>
              <button
                className="text-blue-900 text-xl"
                onClick={() => setShowAddWidget(false)}
              >
                ×
              </button>
            </div>

            <div className="mb-3 text-sm text-gray-600">
              Select existing widget or create new
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b mb-3 flex-wrap">
              {["cspm", "cwpp", "image", "ticket"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 border-b-2 font-semibold ${
                    activeTab === tab
                      ? "border-blue-900 text-blue-900"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Sidebar widget list */}
            <div className="flex flex-col gap-3 overflow-y-auto flex-grow mb-4">
              {(sidebarWidgets[activeTab] || []).map((widget) => (
                <div
                  key={widget.id}
                  className="flex items-center justify-between gap-2"
                >
                  <label className="flex items-center gap-2 cursor-pointer select-none flex-1">
                    <input
                      type="checkbox"
                      checked={selectedWidgets.has(widget.id)}
                      onChange={() => toggleWidgetSelection(widget.id)}
                    />
                    <span>{widget.name}</span>
                  </label>
                  <button
                    className="text-red-500 font-bold px-2"
                    onClick={() =>
                      setSidebarWidgets((prev) => ({
                        ...prev,
                        [activeTab]: prev[activeTab].filter((w) => w.id !== widget.id),
                      }))
                    }
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* New Widget */}
            <div className="flex flex-col gap-2 mb-4">
              <input
                type="text"
                placeholder="New Widget Name"
                className="border px-2 py-1 rounded"
                value={newWidgetName}
                onChange={(e) => setNewWidgetName(e.target.value)}
              />
              <select
                className="border px-2 py-1 rounded"
                value={newWidgetChart}
                onChange={(e) => setNewWidgetChart(e.target.value)}
              >
                <option value="Text">Text Only</option>
                <option value="Pie">Pie Chart</option>
                <option value="Bar">Bar Chart</option>
                <option value="Ticket">Ticket Overview</option>
              </select>
            </div>

            {/* Confirm/Cancel */}
            <div className="flex justify-end gap-4 mt-auto">
              <button
                className="border border-blue-900 px-4 py-1 rounded text-blue-900"
                onClick={() => setShowAddWidget(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-900 px-4 py-1 rounded text-white"
                onClick={confirmAddWidgets}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
