'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { TrendingUp, Calendar, ArrowUpRight, DollarSign, Award, CheckCircle2 } from 'lucide-react';

const data = [
  { name: 'Mon', amount: 1.2 },
  { name: 'Tue', amount: 0.8 },
  { name: 'Wed', amount: 2.5 },
  { name: 'Thu', amount: 1.5 },
  { name: 'Fri', amount: 0.9 },
  { name: 'Sat', amount: 3.2 },
  { name: 'Sun', amount: 1.4 },
];

export default function SpendingPage() {
  const totalToday = 1.4;
  const totalWeek = data.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Spending Analytics</h1>
        <p className="text-slate-500 text-sm">Track your SOL outflows across the network</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full transition-transform group-hover:scale-110"></div>
          <div className="relative">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-sm font-medium text-slate-500">Total Spent Today</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-slate-900">{totalToday} SOL</p>
              <span className="text-xs font-bold text-green-600 flex items-center">
                <ArrowUpRight className="w-3 h-3" /> 8%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full transition-transform group-hover:scale-110"></div>
          <div className="relative">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-sm font-medium text-slate-500">Total Spent This Week</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-slate-900">{totalWeek.toFixed(2)} SOL</p>
              <span className="text-xs font-bold text-slate-400">Past 7 days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-bold text-slate-800">Daily Spending (Last 7 Days)</h3>
            <p className="text-xs text-slate-400 font-medium">Outflow in SOL</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-md border border-slate-100">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <span className="text-[10px] font-bold text-slate-600 uppercase">Spend</span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
              />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  padding: '12px'
                }}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={40}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 5 ? '#4f46e5' : '#e2e8f0'}
                    className="hover:fill-indigo-400 transition-colors cursor-pointer"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Avg. Transaction', val: '0.85 SOL', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Largest Spend', val: '3.20 SOL', icon: ArrowUpRight, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Merchant Count', val: '12', icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((item, i) => (
          <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 flex items-center gap-4">
            <div className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
              <p className="text-lg font-bold text-slate-800">{item.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Impact Milestones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Solana Pioneer', detail: 'First 10 SOL spent', date: 'Oct 12', achieved: true },
            { id: 2, title: 'Scholar Maker', detail: 'Sponsored a student', date: 'Oct 20', achieved: true },
            { title: 'Gas Saver', detail: '100 tx with < 0.01 fee', date: 'Upcoming', achieved: false },
            { title: 'Power Donor', detail: 'Top 10% in Community', date: 'Upcoming', achieved: false },
          ].map((m, i) => (
            <div key={i} className={`p-4 rounded-xl border ${m.achieved ? 'bg-indigo-50/50 border-indigo-100' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-bold text-slate-800">{m.title}</p>
                {m.achieved && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
              </div>
              <p className="text-xs text-slate-500 mb-2">{m.detail}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
