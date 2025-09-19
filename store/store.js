// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import widgetsReducer from "./slices/WidgetReducer";

export const store = configureStore({
  reducer: {
    widgets: widgetsReducer,
  },
});
