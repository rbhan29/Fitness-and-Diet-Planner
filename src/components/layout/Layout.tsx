
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MainHeader from "./MainHeader";
import { useTheme } from "@/components/theme-provider";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    console.log("Layout rendered with theme:", theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern bg-[size:30px_30px] opacity-5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-gradient" />
      <MainHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 animate-fade-in relative">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
