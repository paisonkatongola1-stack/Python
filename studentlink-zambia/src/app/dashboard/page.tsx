"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Clock,
  Store,
  Briefcase,
  ArrowUpRight,
  Calendar,
  Sparkles,
  Inbox
} from "lucide-react";
import { motion } from "framer-motion";
import { StatCard } from "@/components/dashboard/StatCard";
import { StudyChart } from "@/components/dashboard/StudyChart";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-[400px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
          <p className="text-slate-400 mt-1">Hello Chanda, here&apos;s what&apos;s happening with your studies today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium">
            <Calendar className="w-4 h-4 text-primary" />
            Dec 20, 2024
          </div>
          <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            AI Study Plan
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Study Hours"
          value="34.5h"
          icon={Clock}
          trend="+12%"
          trendUp={true}
          color="primary"
        />
        <StatCard
          title="Scholarships"
          value="12"
          icon={GraduationCap}
          trend="2 New"
          trendUp={true}
          color="secondary"
        />
        <StatCard
          title="Market Views"
          value="1,204"
          icon={Store}
          trend="+5%"
          trendUp={true}
          color="accent"
        />
        <StatCard
          title="Job Apps"
          value="3"
          icon={Briefcase}
          color="primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold">Study Performance</h3>
              <p className="text-sm text-slate-400">Weekly activity overview</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-lg text-xs font-medium py-1 px-3 outline-none">
              <option className="bg-slate-900">This Week</option>
              <option className="bg-slate-900">Last Week</option>
            </select>
          </div>
          <StudyChart />
        </motion.div>

        {/* Upcoming Deadlines / Activity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-bold mb-6">Upcoming Deadlines</h3>
          <div className="space-y-6">
            {[
              { title: "Commonwealth Scholarship", date: "Jan 15, 2025", type: "Scholarship" },
              { title: "Zamtel Internship App", date: "Jan 20, 2025", type: "Job" },
              { title: "Final Year Project", date: "Feb 02, 2025", type: "Study" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-slate-400 group-hover:text-primary transition-colors">
                  {item.type === "Scholarship" ? <GraduationCap className="w-5 h-5" /> : item.type === "Job" ? <Briefcase className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{item.type}</span>
                    <span className="text-[10px] text-slate-500">•</span>
                    <span className="text-[10px] text-red-400 font-medium">{item.date}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors border border-dashed border-white/10 rounded-xl">
            View All Tasks
          </button>
        </motion.div>
      </div>

      {/* Inbox Empty State Example */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Recent Messages</h3>
        <EmptyState
          icon={Inbox}
          title="No new messages"
          description="Your inbox is clear. When you get messages from sellers or community members, they will appear here."
          actionLabel="Start a conversation"
        />
      </div>
    </div>
  );
}
