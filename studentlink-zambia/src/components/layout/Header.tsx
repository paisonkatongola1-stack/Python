"use client";

import React, { useState } from "react";
import { Search, Bell, Menu, UserCircle, X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-white/10 bg-background/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden p-2 hover:bg-white/5 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-96">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search for scholarships, jobs, or books..."
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-xl relative">
            <Bell className="w-5 h-5 text-slate-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border border-background"></span>
          </button>

          <div className="h-8 w-[1px] bg-white/10 mx-2"></div>

          <button className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-white/5 rounded-xl transition-all">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold">Chanda M.</p>
              <p className="text-[10px] text-slate-400">UNZA Student</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden">
              <UserCircle className="w-6 h-6 text-slate-400" />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-[#0f172a] border-r border-white/10 p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <h1 className="text-xl font-bold gradient-text">StudentLink</h1>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg text-slate-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <Sidebar mobile onLinkClick={() => setIsMobileMenuOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
