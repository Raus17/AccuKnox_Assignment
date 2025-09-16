import React from "react";
import Widgets from "./Widgets";

const CSPMDashboard = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <Widgets title="Sales" description="Monthly sales trend" type="line" />
      <Widgets title="Users" description="User distribution" type="pie" />
      <Widgets title="Revenue" description="Quarterly revenue" type="bar" />
      <Widgets title="Growth" description="Yearly growth trend" type="line" />
    </div>
  );
};

export default CSPMDashboard;
