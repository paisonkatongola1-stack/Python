"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Mail, Lock, User, GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-8 relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center mb-4">
            <Sparkles className="text-white w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-slate-400 text-sm mt-2 text-center">
            Join thousands of Zambian students on StudentLink
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Chanda Mulenga"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">University</label>
            <div className="relative">
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary transition-all appearance-none text-slate-300"
                required
                defaultValue=""
              >
                <option value="" disabled className="bg-slate-900">Select your University</option>
                <option value="unza" className="bg-slate-900">University of Zambia (UNZA)</option>
                <option value="cbu" className="bg-slate-900">Copperbelt University (CBU)</option>
                <option value="mulungushi" className="bg-slate-900">Mulungushi University</option>
                <option value="cavendish" className="bg-slate-900">Cavendish University</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                placeholder="chanda@unza.zm"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary transition-all"
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 mt-4">
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-white font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
