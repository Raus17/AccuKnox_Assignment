"use client"; // 👈 this makes it a client component

import { Provider } from "react-redux";
import { store } from "./store";

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
