"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Sparkles,
  Target,
  BarChart3,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { useStore, useCurrentPage, useIsOnboarded } from "@/store/useStore";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  page: "home" | "training" | "tdi" | "dashboard" | "report";
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full",
      isActive
        ? "bg-gold-500 text-luxury-black shadow-gold"
        : "text-luxury-graphite hover:bg-luxury-pearl hover:text-luxury-black"
    )}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </button>
);

export const Navigation: React.FC = () => {
  const currentPage = useCurrentPage();
  const isOnboarded = useIsOnboarded();
  const { setCurrentPage } = useStore();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const navItems = [
    { icon: Home, label: "Home", page: "home" as const },
    { icon: Sparkles, label: "AI Training", page: "training" as const },
    { icon: Target, label: "TDI Zone", page: "tdi" as const },
    { icon: BarChart3, label: "Dashboard", page: "dashboard" as const },
    { icon: FileText, label: "Report", page: "report" as const },
  ];

  const handleNavClick = (page: typeof navItems[0]["page"]) => {
    if (!isOnboarded && page !== "home") {
      setCurrentPage("onboarding");
    } else {
      setCurrentPage(page);
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-luxury-pearl p-6 flex-col z-50">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="font-serif text-2xl text-luxury-black">
            L'Oréal
          </h1>
          <p className="text-gradient-gold font-serif text-lg">ODORable</p>
        </div>

        {/* Nav Items */}
        <div className="space-y-2 flex-1">
          {navItems.map((item) => (
            <NavItem
              key={item.page}
              {...item}
              isActive={currentPage === item.page}
              onClick={() => handleNavClick(item.page)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-luxury-pearl">
          <p className="text-xs text-luxury-silver text-center">
            © 2024 L'Oréal Luxury Division
          </p>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-luxury-pearl z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="font-serif text-xl text-luxury-black">L'Oréal</h1>
            <p className="text-gradient-gold font-serif text-sm -mt-1">
              ODORable
            </p>
          </div>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="w-10 h-10 flex items-center justify-center text-luxury-black"
          >
            {isMobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileOpen ? "auto" : 0,
            opacity: isMobileOpen ? 1 : 0,
          }}
          className="overflow-hidden bg-white border-t border-luxury-pearl"
        >
          <div className="p-4 space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.page}
                {...item}
                isActive={currentPage === item.page}
                onClick={() => handleNavClick(item.page)}
              />
            ))}
          </div>
        </motion.div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-luxury-pearl z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors",
                  isActive ? "text-gold-500" : "text-luxury-silver"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
