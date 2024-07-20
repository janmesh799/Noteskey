"use client"

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/lib/store"; // Adjust the import based on your store location

interface ReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
