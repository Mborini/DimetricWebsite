"use client";

import { useTheme } from "next-themes";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  // إظهار أيقونة بحسب الثيم الحالي
  const isDark = theme === "dark";

  return (
    <button
      aria-label="theme toggler"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center text-black rounded-full cursor-pointer bg-gray-200 dark:bg-gray-800 h-7 w-7 md:h-12 md:w-12 transition-colors"
    >
      {isDark ? (
        <IoSunnyOutline className="text-white" size={24} />
      ) : (
        <IoMoonOutline className="text-green-600" size={24} />
      )}
    </button>
  );
};

export default ThemeToggler;
