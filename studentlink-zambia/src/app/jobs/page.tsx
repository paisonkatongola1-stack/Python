"use client";

import React, { useState } from "react";
import {

  Search,
  Building2,
  Clock,
  MapPin,
  Zap,
  ArrowUpRight,
  DollarSign
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const jobs = [
  {
    id: "1",
    role: "Software Engineering Intern",
    company: "Zamtel",
    location: "Lusaka, HQ",
    type: "Internship",
    salary: "K3,500/mo",
    posted: "2 days ago",
    logo: "ZT"
  },
  {
    id: "2",
    role: "Marketing Assistant",
    company: "Airtel Zambia",
    location: "Lusaka",
    type: "Part-time",
    salary: "K4,000/mo",
    posted: "5 hours ago",
    logo: "AZ"
  },
  {
    id: "3",
    role: "Graduate Trainee - Audit",
    company: "PwC Zambia",
    location: "Ndola",
    type: "Full-time",
    salary: "Competitive",
    posted: "1 week ago",
    logo: "PW"
  },
  {
    id: "4",
    role: "Social Media Manager",
    company: "Zazu Africa",
    location: "Remote",
    type: "Contract",
    salary: "K2,500/mo",
    posted: "3 days ago",
    logo: "ZA"
  },
  {
    id: "5",
    role: "Junior Content Creator",
    company: "Liquid Intelligent Tech",
    location: "Lusaka",
    type: "Internship",
    salary: "K3,000/mo",
    posted: "1 day ago",
    logo: "LI"
  },
];

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Jobs Board</h1>
          <p className="text-slate-400">Launch your career with internships and entry-level roles.</p>
        </div>
        <button className="btn-primary py-2 px-6 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Post a Job
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-5">
             <h3 className="font-bold mb-4 text-sm">Search Opportunities</h3>
             <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Job title or company..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-primary"
                />
             </div>

             <h3 className="font-bold mb-4 text-sm mt-6">Job Type</h3>
             <div className="space-y-2">
                {["All", "Full-time", "Part-time", "Internship", "Remote"].map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-xl text-sm transition-all",
                      activeTab === type ? "bg-primary text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {type}
                  </button>
                ))}
             </div>
          </div>

          <div className="glass-card p-5 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
             <div className="flex items-center gap-2 text-primary font-bold mb-2">
               <Zap className="w-4 h-4" />
               <span className="text-sm">Career Tip</span>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed">
               Zambian tech companies value GitHub portfolios. Make sure to link your projects in your applications!
             </p>
          </div>
        </div>

        {/* Jobs List */}
        <div className="lg:col-span-3 space-y-4">
          {jobs.map((job, i) => (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              key={job.id}
              className="glass-card p-5 hover:border-white/20 transition-all cursor-pointer group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-slate-400 group-hover:border-primary/50 group-hover:text-primary transition-all">
                  {job.logo}
                </div>
                <div className="flex-1">
                   <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{job.role}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                        {job.type}
                      </span>
                   </div>
                   <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {job.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {job.posted}
                      </div>
                   </div>
                </div>
                <button className="btn-secondary py-2 px-6 text-sm font-semibold flex items-center gap-2 self-start sm:self-center">
                  View Details <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}

          <button className="w-full py-4 text-sm font-medium text-slate-500 hover:text-white transition-colors border border-dashed border-white/10 rounded-2xl">
            Load More Opportunities
          </button>
        </div>
      </div>
    </div>
  );
}
