"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Search,
  Calendar,
  MapPin,
  Bookmark,
  ExternalLink,

} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const scholarships = [
  {
    id: "1",
    title: "GRZ Higher Education Loan/Scholarship",
    provider: "Higher Education Loans and Scholarships Board",
    deadline: "Jan 30, 2025",
    value: "100% Tuition + Stipend",
    category: "Government",
    location: "Zambia",
    requirements: "Zambian citizen, Grade 12 results, admission letter.",
  },
  {
    id: "2",
    title: "Beit Trust Scholarships",
    provider: "Beit Trust",
    deadline: "Feb 15, 2025",
    value: "Full Funding",
    category: "International",
    location: "UK / South Africa",
    requirements: "Zambian, Zimbabwean or Malawian citizen, Undergraduate degree.",
  },
  {
    id: "3",
    title: "Dangote Foundation Engineering Scholarship",
    provider: "Dangote Group",
    deadline: "Mar 10, 2025",
    value: "K25,000 / Year",
    category: "Private Sector",
    location: "Zambia",
    requirements: "Engineering student, 3.5+ GPA, Second year or above.",
  },
  {
    id: "4",
    title: "Mastercard Foundation Scholars Program",
    provider: "Mastercard Foundation",
    deadline: "Apr 01, 2025",
    value: "Full Scholarship",
    category: "International",
    location: "Global",
    requirements: "Economically disadvantaged, Leadership potential.",
  },
  {
    id: "5",
    title: "Absa Bank Zambia Student Grant",
    provider: "Absa Bank",
    deadline: "Jan 12, 2025",
    value: "K10,000 One-off",
    category: "Private Sector",
    location: "Zambia",
    requirements: "Account holder, Registered student.",
  },
];

export default function ScholarshipsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [saved, setSaved] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSaved(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filtered = scholarships.filter(s => activeTab === "All" || s.category === activeTab);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scholarship Hub</h1>
          <p className="text-slate-400">Discover funding opportunities for your education.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search provider, degree..."
            className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-primary w-full md:w-64"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {["All", "Government", "International", "Private Sector"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              activeTab === tab
                ? "bg-primary text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filtered.map((s, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={s.id}
            className="glass-card p-6 flex flex-col md:flex-row gap-6 hover:border-primary/30 transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
               <GraduationCap className="text-primary w-8 h-8" />
            </div>
            <div className="flex-1 space-y-3">
               <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-2 py-0.5 bg-white/5 rounded">
                    {s.category}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-green-500 tracking-wider px-2 py-0.5 bg-green-500/10 rounded">
                    {s.value}
                  </span>
               </div>
               <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-slate-400 text-sm">{s.provider}</p>
               </div>
               <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-4 h-4" />
                    Deadline: <span className="text-slate-300 font-medium">{s.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-slate-300 font-medium">{s.location}</span>
                  </div>
               </div>
            </div>
            <div className="flex flex-row md:flex-col justify-between md:justify-center gap-3 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6 min-w-[140px]">
               <button className="btn-primary py-2 px-4 text-xs font-bold flex items-center justify-center gap-2">
                 Apply Now <ExternalLink className="w-3 h-3" />
               </button>
               <button
                onClick={() => toggleSave(s.id)}
                className={cn(
                  "py-2 px-4 text-xs font-bold flex items-center justify-center gap-2 rounded-xl border transition-all",
                  saved.includes(s.id)
                    ? "bg-accent/10 border-accent/20 text-accent"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                )}
              >
                 <Bookmark className={cn("w-3 h-3", saved.includes(s.id) && "fill-accent")} />
                 {saved.includes(s.id) ? "Saved" : "Save"}
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
