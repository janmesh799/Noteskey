import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeColors, THEME_MODE } from "./Types";

interface ThemeState {
  theme: string;
  colors: ThemeColors;
}

const lightTheme: ThemeColors = {
  primary: "bg-green-500", // For main action items and highlights
  secondary: "bg-gray-100", // For background sections
  accent: "bg-red-400", // For notifications or accents
  text: "text-gray-900", // For primary text
  background: "bg-gray-50", // For the main background
  border: "border-green-300", // For card borders or similar elements
};

const darkTheme: ThemeColors = {
  primary: "bg-green-700", // For main action items and highlights in dark mode
  secondary: "bg-gray-800", // For darker sections or card backgrounds
  accent: "bg-red-600", // Accent color for notifications or important tags
  text: "text-gray-200", // Text color that contrasts with the dark background
  background: "bg-gray-900", // Main background color for dark theme
  border: "border-green-800", // Border color for elements like cards
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
