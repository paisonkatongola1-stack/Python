"use client";

import React, { useState } from "react";
import {
  Search,
  Building2,
  Clock,
  MapPin,
  Zap,
  ArrowUpRight,
  DollarSign,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePocketBaseList } from "@/hooks/usePocketBase";
import { RecordModel } from "pocketbase";

interface Job extends RecordModel {
  role: string;
  company: string;
  location: string;
  type: string;
  salary: string;
}

export default function JobsPage() {
  const { data: jobs, loading } = usePocketBaseList<Job>('jobs');
  const [activeTab, setActiveTab] = useState("All");

  const filtered = jobs.filter(job => activeTab === "All" || job.type === activeTab);

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
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 glass-card">
              <p className="text-slate-400">No job opportunities found at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((job, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={job.id}
                  className="glass-card p-5 hover:border-white/20 transition-all cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-slate-400 group-hover:border-primary/50 group-hover:text-primary transition-all uppercase">
                      {job.company.substring(0, 2)}
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
                            {new Date(job.created).toLocaleDateString()}
                          </div>
                       </div>
                    </div>
                    <button className="btn-secondary py-2 px-6 text-sm font-semibold flex items-center gap-2 self-start sm:self-center">
                      View Details <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
