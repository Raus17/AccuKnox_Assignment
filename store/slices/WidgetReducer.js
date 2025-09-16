import { createSlice } from "@reduxjs/toolkit";

const widgetsSlice = createSlice({
  name: "widgets",
  initialState: {
    widgets: [],
  },
  reducers: {
    addWidget: (state, action) => {
      state.widgets.push({
        id: Date.now(),
        ...action.payload,
      });
    },
  },
});

export const { addWidget } = widgetsSlice.actions;
export default widgetsSlice.reducer;
