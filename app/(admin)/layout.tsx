"use client"

import React, { useState, useEffect } from "react";
import Sidebar from "./components/common/sidebar";
import Topbar from "./components/common/topbar";
import { CookieHelper } from "@/helper/cookie.helper";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Handle window resize
  useEffect(() => {
    // CookieHelper.set({key:"access_token",value:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbnZpckBnbWFpbC5jb20iLCJzdWIiOiJjbWdicjA2cWkwMDA1MTNjY3kxYjM0NmI4IiwidHlwZSI6InVzZXIiLCJpYXQiOjE3NjM2MDY4MzAsImV4cCI6MTc2NDQ3MDgzMH0.qsfUjMvwzt1a"})
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className={`h-screen bg-white overflow-hidden flex`}>
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onToggle={handleToggle}
        onMobileToggle={handleMobileToggle}
      />

      {/* Right: Topbar + scrollable content */}
      <div className={`flex flex-col flex-1 min-w-0 h-screen transition-all duration-300 ${
        isCollapsed ? 'lg:pl-16' : 'lg:pl-72'
      }`}>
        <Topbar 
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          onToggle={handleToggle}
          onMobileToggle={handleMobileToggle}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
