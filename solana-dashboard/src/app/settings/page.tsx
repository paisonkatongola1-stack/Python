'use client';

import { useState } from 'react';
import {
  User,
  Smartphone,
  Bell,
  Shield,
  LogOut,
  Mail,
  Camera,
  Plus
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    transactions: true,
    scholarships: true,
    security: true,
    marketing: false
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'mobile', name: 'Mobile Money', icon: Smartphone },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500">Manage your profile, linked accounts, and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all",
                activeTab === tab.id
                  ? "bg-white text-indigo-600 shadow-sm border border-slate-100"
                  : "text-slate-500 hover:bg-slate-100"
              )}
            >
              <tab.icon className="w-5 h-5" />
              {tab.name}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-200">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative group">
                  <div className="w-24 h-24 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-3xl">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 shadow-sm hover:text-indigo-600">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{user?.name}</h3>
                  <p className="text-slate-500 text-sm">Verified Account Since Oct 2023</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded">Tier 2 Verified</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-600"
                      defaultValue={user?.name}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-600"
                      defaultValue={user?.email}
                    />
                  </div>
                </div>
              </div>

              <button className="mt-8 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'mobile' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Linked Mobile Money</h3>
              <p className="text-slate-500 text-sm mb-8">Connect your mobile numbers for instant bridging</p>

              <div className="space-y-4">
                <div className="p-4 border-2 border-indigo-600 bg-indigo-50/30 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-indigo-100 shadow-sm">
                      <Smartphone className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Airtel Zambia</p>
                      <p className="text-xs text-slate-500">+260 971 234 567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-indigo-600 bg-white border border-indigo-100 px-2 py-0.5 rounded uppercase">Primary</span>
                    <button className="text-red-500 text-xs font-bold hover:underline">Remove</button>
                  </div>
                </div>

                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-all group">
                  <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-bold">Link New Mobile Number</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                {Object.entries(notifications).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-800 capitalize">{key} Alerts</p>
                      <p className="text-xs text-slate-500">Receive real-time updates via email and push</p>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, [key]: !val})}
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative",
                        val ? "bg-indigo-600" : "bg-slate-200"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                        val ? "right-1" : "left-1"
                      )}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
