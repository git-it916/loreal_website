"use client";

import React, { useEffect } from "react";
import { useStore, useCurrentPage, useIsOnboarded } from "@/store/useStore";
import { Navigation } from "@/components/Navigation";
import { HomePage } from "@/components/HomePage";
import { ProfilingForm } from "@/components/ProfilingForm";
import { AIGenCanvas } from "@/components/AIGenCanvas";
import { TDIGameEngine } from "@/components/TDI_GameEngine";
import { DashboardCharts } from "@/components/DashboardCharts";
import { ReportPage } from "@/components/ReportPage";
import { cn } from "@/lib/utils";

export default function App() {
  const currentPage = useCurrentPage();
  const isOnboarded = useIsOnboarded();
  const { initTDIGame } = useStore();

  // Initialize TDI game when navigating to TDI page
  useEffect(() => {
    if (currentPage === "tdi") {
      initTDIGame();
    }
  }, [currentPage, initTDIGame]);

  // Render the appropriate page based on current state
  const renderPage = () => {
    // If not onboarded and trying to access non-home pages, show onboarding
    if (!isOnboarded && currentPage !== "home") {
      return <ProfilingForm />;
    }

    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "onboarding":
        return <ProfilingForm />;
      case "training":
        return <AIGenCanvas />;
      case "tdi":
        return <TDIGameEngine />;
      case "dashboard":
        return <DashboardCharts />;
      case "report":
        return <ReportPage />;
      default:
        return <HomePage />;
    }
  };

  // Show full-screen pages without navigation
  const isFullScreenPage = currentPage === "home" || currentPage === "onboarding";

  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Navigation - hide on home and onboarding pages */}
      {!isFullScreenPage && <Navigation />}

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen",
          !isFullScreenPage && "lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0"
        )}
      >
        {renderPage()}
      </main>
    </div>
  );
}
