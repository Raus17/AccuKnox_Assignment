'use client'
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Widgets from "./Widgets";
import { removeWidget } from "../store/slices/WidgetReducer";

const CWPPDashboard = () => {
  const widgets = useSelector(
    (state) => state.widgets.widgets.CWPPdashboard || []
  );
  const dispatch = useDispatch();

  const handleRemoveWidget = (widgetId) => {
    dispatch(removeWidget({ category: "CWPPdashboard", widgetId }));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="w-full">
          <h1>CWPP Dashboard</h1>
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
    </div>
  );
};

export default CWPPDashboard;
