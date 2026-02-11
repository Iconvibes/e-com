import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

export default function MainLayout() {
  const { theme } = useTheme();
  
  const bgColor = theme === "dark" ? "#0f172a" : "#ffffff";
  const textColor = theme === "dark" ? "#f3f4f6" : "#111827";

  return (
    <div 
      className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-200"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
