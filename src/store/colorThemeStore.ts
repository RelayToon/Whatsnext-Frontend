import { create } from "zustand";

import { ColorTheme } from "@/types";

interface ColorThemeStore {
  isDarkTheme: boolean;
  setInitialColorTheme: () => void;
  changeColorTheme: () => void;
}

const colorThemeStore = create<ColorThemeStore>((set) => ({
  isDarkTheme: true,
  setInitialColorTheme: () => {
    if (!window) return;

    const osTheme: ColorTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";
    const userTheme: ColorTheme = localStorage.getItem(
      "color-theme"
    ) as ColorTheme;

    const theme = userTheme || osTheme;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      set(() => ({ isDarkTheme: true }));
    } else {
      document.documentElement.classList.remove("dark");
      set(() => ({ isDarkTheme: false }));
    }
  },
  changeColorTheme: () => {
    set((state) => {
      const nextIsDarkTheme = !state.isDarkTheme;

      localStorage.setItem("color-theme", nextIsDarkTheme ? "dark" : "light");

      nextIsDarkTheme
        ? document.documentElement.classList.add("dark")
        : document.documentElement.classList.remove("dark");

      return { isDarkTheme: nextIsDarkTheme };
    });
  },
}));

export default colorThemeStore;
