import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeColors, THEME_MODE } from "./Types";

interface ThemeState {
  theme: string;
  colors: ThemeColors;
}

const lightTheme: ThemeColors = {
  primary: "#38a169", // bg-green-500
  secondary: "#f7fafc", // bg-gray-100
  accent: "#fc8181", // bg-red-400
  text: "#1a202c", // text-gray-900
  background: "#f9fafb", // bg-gray-50
  border: "#9ae6b4", // border-green-300
};

const darkTheme: ThemeColors = {
  primary: "#2f855a", // bg-green-700
  secondary: "#2d3748", // bg-gray-800
  accent: "#e53e3e", // bg-red-600
  text: "#edf2f7", // text-gray-200
  background: "#1a202c", // bg-gray-900
  border: "#22543d", // border-green-800
};



const initialState: ThemeState = {
  theme: "light",
  colors: lightTheme,
};

const themeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.theme === THEME_MODE.LIGHT) {
        state.theme = THEME_MODE.DARK;
        state.colors = darkTheme;
      } else {
        state.theme = THEME_MODE.LIGHT;
        state.colors = lightTheme;
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
