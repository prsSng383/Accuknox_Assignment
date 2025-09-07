import React, { useState, useEffect } from "react";
import Widget from "./components/Widget";
import EmptyWidget from "./components/EmptyWidget";


import { initialDashboard, widgetOptions } from "./data/dashboardData";
import { widgetComponents } from "./data/widgetComponents";

export default function App() {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [activeTab, setActiveTab] = useState("cspm");
  const [selectedWidgets, setSelectedWidgets] = useState(new Set());

  useEffect(() => {
    const currentWidgetIds = new Set(
      dashboard.categories
        .find((cat) => cat.id === activeTab)
        ?.widgets.map((w) => w.id) || []
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
  setDashboard((prevDashboard) => {
    return {
      ...prevDashboard,
      categories: prevDashboard.categories.map((cat) => {
        // Map registry id's widget add to registry category even if activeTab is 'image'
        const targetCatId = activeTab === "image" && cat.id === "registry" ? "registry" : activeTab;
        if (cat.id !== targetCatId) return cat;
        const allOptions = widgetOptions[activeTab] || [];
        const newWidgets = Array.from(selectedWidgets)
          .map((id) => {
            const option = allOptions.find((w) => w.id === id);
            if (!option) return null;
            const existing = cat.widgets.find((w) => w.id === id);
            if (existing) return existing;
            return { ...option, text: widgetComponents[id] || <p>Random text for {option.name}.</p> };
          })
          .filter(Boolean);
        return {
          ...cat,
          widgets: newWidgets,
        };
      }),
    };
  });
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">CNAPP Dashboard</h1>
        <div className="flex gap-3">
          <button
            className="bg-white px-3 py-1 rounded shadow text-sm"
            onClick={() => setShowAddWidget(true)}
          >
            Add Widget +
          </button>
          <button className="bg-white px-3 py-1 rounded shadow text-sm">
            ⟳
          </button>
          <button className="bg-white px-3 py-1 rounded shadow text-sm">
            ⚙
          </button>
          <select className="bg-white px-3 py-1 rounded shadow text-sm">
            <option>Last 2 days</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
      </div>

      <div className="space-y-8">
        {dashboard.categories.map((category) => (
          <div key={category.id}>
            <h2 className="font-semibold mb-3">{category.name}</h2>
            <div className="grid grid-cols-3 gap-4">
              {category.widgets.map((widget) => (
                <Widget
                  key={widget.id}
                  title={widget.name}
                  onRemove={() =>
                    removeWidgetFromCategory(category.id, widget.id)
                  }
                >
                  {widget.text}
                </Widget>
              ))}
              <EmptyWidget
                onClick={() => {
                  // If category is "registry", map it to "image" tab for widgets list
                  const tabToOpen =
                    category.id === "registry" ? "image" : category.id;
                  setActiveTab(tabToOpen);
                  setShowAddWidget(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {showAddWidget && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={() => setShowAddWidget(false)}
            className="bg-black/30 flex-1"
          />
          <div className="bg-white w-[400px] h-full shadow-lg px-6 py-8 fixed right-0 top-0 z-50 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-blue-900">Add Widget</h2>
              <button
                className="text-blue-900 text-xl"
                onClick={() => setShowAddWidget(false)}
              >
                ×
              </button>
            </div>
            <div className="mb-5 text-sm text-gray-600">
              Personalise your dashboard by adding the following widget
            </div>
            <div className="flex gap-4 border-b mb-3">
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
            <div className="flex flex-col gap-3 overflow-y-auto flex-grow">
              {(widgetOptions[activeTab] || []).map((widget) => (
                <label
                  key={widget.id}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedWidgets.has(widget.id)}
                    onChange={() => toggleWidgetSelection(widget.id)}
                  />
                  <span>{widget.name}</span>
                </label>
              ))}
              {(!widgetOptions[activeTab] ||
                widgetOptions[activeTab].length === 0) && (
                <p className="text-gray-400">
                  No widgets available for this category.
                </p>
              )}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="border border-blue-900 px-4 py-1 rounded w-[100px] text-blue-900"
                onClick={() => setShowAddWidget(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-900 px-4 py-1 rounded w-[100px] text-white"
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
