import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  widgets: {
    CPSMExecutive: [
      { id: 1, name: "Sales", description: "Monthly sales trend", chartStyle: "line" },
      { id: 2, name: "Users", description: "User distribution", chartStyle: "pie" },
      { id: 3, name: "Revenue", description: "Quarterly revenue", chartStyle: "bar" }
    ],
    CWPPdashboard: [
      { id: 4, name: "Security Alerts", description: "Current security alerts", chartStyle: "bar" },
      { id: 5, name: "Threat Detection", description: "Threat detection metrics", chartStyle: "line" }
    ],
    RegistryScan: [
      { id: 6, name: "Scan Results", description: "Registry scan results", chartStyle: "pie" },
      { id: 7, name: "Vulnerabilities", description: "Vulnerability count", chartStyle: "bar" }
    ]
  },
  nextId: 8
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { name, description, category, chartStyle } = action.payload;
      const newWidget = {
        id: state.nextId,
        name,
        description,
        chartStyle
      };
      
      if (!state.widgets[category]) {
        state.widgets[category] = [];
      }
      
      state.widgets[category].push(newWidget);
      state.nextId += 1;
    },
    removeWidget: (state, action) => {
      const { category, widgetId } = action.payload;
      if (state.widgets[category]) {
        state.widgets[category] = state.widgets[category].filter(
          widget => widget.id !== widgetId
        );
      }
    }
  }
});

export const { addWidget, removeWidget } = widgetSlice.actions;
export default widgetSlice.reducer;