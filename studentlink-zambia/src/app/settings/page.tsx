"use client";

import React from "react";
import { User, Bell, Shield, Wallet, Moon, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const sections = [
    { icon: User, title: "Profile", desc: "Manage your personal information and university details." },
    { icon: Bell, title: "Notifications", desc: "Choose what updates you want to receive." },
    { icon: Wallet, title: "Payments", desc: "Manage your mobile money and bank accounts." },
    { icon: Shield, title: "Security", desc: "Update your password and secure your account." },
    { icon: Moon, title: "Appearance", desc: "Customize how StudentLink looks on your device." },
    { icon: HelpCircle, title: "Support", desc: "Get help with your account or report an issue." },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-slate-400">Manage your account preferences and settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={section.title}
            className="glass-card p-6 flex gap-5 hover:border-primary/50 cursor-pointer transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:text-primary transition-colors">
               <section.icon className="w-6 h-6" />
            </div>
            <div>
               <h3 className="font-bold mb-1">{section.title}</h3>
               <p className="text-xs text-slate-400 leading-relaxed">{section.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-8 border-red-500/20 bg-red-500/5">
         <h3 className="text-red-500 font-bold mb-2">Danger Zone</h3>
         <p className="text-sm text-slate-400 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
         <button className="px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all">
           Delete Account
         </button>
      </div>
    </div>
  );
}
