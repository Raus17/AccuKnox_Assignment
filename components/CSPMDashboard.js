'use client'
import React from "react";
import Widgets from "./Widgets";
import { useSelector, useDispatch } from "react-redux";
import { removeWidget } from "../store/slices/WidgetReducer";

const CSPMDashboard = () => {
  const widgets = useSelector(
    (state) => state.widgets.widgets.CPSMExecutive || []
  );
  const dispatch = useDispatch();

  const handleRemoveWidget = (widgetId) => {
    dispatch(removeWidget({ category: "CPSMExecutive", widgetId }));
  };

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      <div className="w-full">
        <h1>CPSM Dashboard</h1>
      </div>
      {widgets.map((widget) => (
        <Widgets
          key={widget.id}
          id={widget.id}
          title={widget.name}
          description={widget.description}
          type={widget.chartStyle}
          onRemove={() => handleRemoveWidget(widget.id)}
        />
      ))}
    </div>
  );
};

export default CSPMDashboard;
