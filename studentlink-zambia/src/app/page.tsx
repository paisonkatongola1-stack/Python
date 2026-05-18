"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Search,
  GraduationCap,
  Store,
  MessageSquare,
  Globe,
  Zap,

} from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-[#0f172a] selection:bg-primary/30">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">StudentLink <span className="text-primary font-medium">Zambia</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Features</a>
          <a href="#about" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">About</a>
          <a href="#testimonials" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Testimonials</a>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Log In</Link>
          <Link href="/signup" className="btn-primary py-2 px-5 text-sm">Join Now</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10"></div>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 mb-6"
          >
            <span className="bg-gradient-brand px-2 py-0.5 rounded-full text-white text-[10px]">NEW</span>
            AI-Powered Study Tools Now Live
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
          >
            Empowering the Next Generation of <br />
            <span className="gradient-text">Zambian Excellence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The all-in-one platform for students in Zambia. AI study help,
            local scholarships, campus marketplace, and dream internships—all in one place.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup" className="btn-primary px-8 py-4 text-lg w-full sm:w-auto flex items-center justify-center gap-2">
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#features" className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto">
              Explore Features
            </Link>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-5xl mx-auto mt-20 relative group"
        >
          <div className="absolute inset-0 bg-gradient-brand blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="glass-card overflow-hidden border-white/20 aspect-video relative">
             <div className="absolute inset-0 bg-[#0f172a]/80 flex items-center justify-center flex-col">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 cursor-pointer hover:bg-white/20 transition-all border border-white/20">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </div>
                <p className="font-semibold text-white">Watch Platform Preview</p>
             </div>
             {/* Mock Dashboard Layout */}
             <div className="w-full h-full p-4 flex gap-4 opacity-10 pointer-events-none">
                <div className="w-1/4 h-full bg-white/5 rounded-xl"></div>
                <div className="flex-1 space-y-4">
                   <div className="h-12 bg-white/5 rounded-xl w-full"></div>
                   <div className="grid grid-cols-3 gap-4">
                      <div className="aspect-square bg-white/5 rounded-xl"></div>
                      <div className="aspect-square bg-white/5 rounded-xl"></div>
                      <div className="aspect-square bg-white/5 rounded-xl"></div>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything a Student Needs</h2>
            <p className="text-slate-400">Tailored specifically for the Zambian academic ecosystem.</p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { icon: MessageSquare, title: "AI Study Assistant", desc: "Chat with your PDFs, generate summaries, and take quizzes built for your curriculum." },
              { icon: GraduationCap, title: "Scholarship Hub", desc: "Access a curated list of GRZ, university, and international scholarships for Zambians." },
              { icon: Store, title: "Campus Marketplace", desc: "Safely buy and sell textbooks, electronics, and gadgets within your university." },
              { icon: Search, title: "Internships & Jobs", desc: "Find opportunities specifically for students and recent graduates in Zambia." },
              { icon: Globe, title: "Community Feed", desc: "Connect with students from UNZA, CBU, Mulungushi, and others across the nation." },
              { icon: Zap, title: "Resource Center", desc: "Download past papers, lecture notes, and study guides shared by top students." },
            ].map((feature, index) => (
              <motion.div key={index} variants={item} className="glass-card p-8 hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-10">Supporting Students From</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale contrast-125">
             <div className="text-xl font-bold">UNZA</div>
             <div className="text-xl font-bold">COPPERBELT UNIVERSITY</div>
             <div className="text-xl font-bold">MULUNGUSHI</div>
             <div className="text-xl font-bold">CAVENDISH</div>
             <div className="text-xl font-bold">ZCAS</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto glass-card bg-gradient-to-r from-primary/20 to-accent/20 p-12 text-center border-white/20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to elevate your study game?</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Join 5,000+ students across Zambia today. Create your account and get instant access to all tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link href="/signup" className="btn-primary px-8 py-4 text-lg w-full sm:w-auto">Get Started for Free</Link>
             <Link href="/login" className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto">Sign In</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">StudentLink</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
          <p className="text-slate-500 text-sm">© 2024 StudentLink Zambia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
