import React from "react";
import Widgets from "./Widgets";

const CSPMDashboard = () => {
    return (
        <div className="flex flex-wrap gap-4 mt-4">
            <div className="w-full">
                <h1>CPSM Dashboard</h1>
            </div>
            <Widgets title="Sales" description="Monthly sales trend" type="line" />
            <Widgets title="Users" description="User distribution" type="pie" />
            <Widgets title="Revenue" description="Quarterly revenue" type="bar" />
        </div>
    );
};

export default CSPMDashboard;