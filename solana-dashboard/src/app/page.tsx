'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import ActivityFeed from '@/components/ActivityFeed';
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Activity,
  ShieldCheck,
  ShieldAlert,
  Globe,
  GraduationCap,
  Heart
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { connected, publicKey } = useWallet();

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mb-6 text-brand-green">
          <Wallet className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to SolanaDash</h1>
        <p className="text-slate-500 max-w-md mb-8 font-medium">
          Connect your Phantom wallet (Devnet) to view your transaction history,
          risk analysis, and join the global scholarship community.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-brand-red text-white px-6 py-4 rounded-2xl flex items-center justify-between shadow-lg shadow-brand-red/10 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <p className="font-black uppercase text-sm tracking-wider">Urgent Security Alert</p>
            <p className="text-xs font-bold opacity-80">3 suspicious activities blocked in the last 24h</p>
          </div>
        </div>
        <button className="bg-white text-brand-red px-4 py-2 rounded-xl text-xs font-black uppercase hover:bg-brand-red hover:text-white border-2 border-white transition-all">
          View Details
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard Summary</h1>
          <p className="text-slate-500 font-medium">Welcome back, {publicKey?.toBase58().slice(0, 8)}...</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm font-bold text-slate-600">Live Network</span>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="text-green-500 text-xs font-black bg-green-50 px-2 py-1 rounded">+12%</span>
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Spending Today</p>
          <p className="text-2xl font-black text-slate-900">1.24 SOL</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Weekly Total</p>
          <p className="text-2xl font-black text-slate-900">8.42 SOL</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Average Risk Score</p>
          <p className="text-2xl font-black text-slate-900">12/100</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Community Impact</p>
          <p className="text-2xl font-black text-slate-900">4.5 SOL</p>
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-300">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold mb-4">
              <Globe className="w-3 h-3 text-indigo-300" />
              <span>Global Reach</span>
            </div>
            <h2 className="text-4xl font-black mb-4">The Global Scholarship Impact</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              We&apos;ve reached over <span className="text-white font-bold">2,500 students</span> across 12 countries,
              distributing more than <span className="text-white font-bold">150,000 SOL</span> in direct educational grants.
            </p>
            <div className="flex gap-4">
              <Link href="/community" className="bg-brand-green text-brand-navy px-6 py-3 rounded-xl font-black uppercase text-sm hover:brightness-110 transition-all shadow-lg shadow-brand-green/10">
                View Community
              </Link>
              <Link href="/scholarships" className="bg-white/10 text-white px-6 py-3 rounded-xl font-black uppercase text-sm hover:bg-white/20 transition-colors border border-white/20">
                Apply for Funding
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <p className="text-3xl font-black mb-1">84%</p>
              <p className="text-xs text-slate-400 font-bold uppercase">Graduation Rate</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <p className="text-3xl font-black mb-1">12.5k</p>
              <p className="text-xs text-slate-400 font-bold uppercase">Donors</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <p className="text-3xl font-black mb-1">45+</p>
              <p className="text-xs text-slate-400 font-bold uppercase">Dapps Launched</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
              <p className="text-3xl font-black mb-1">24/7</p>
              <p className="text-xs text-slate-400 font-bold uppercase">On-chain Support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Recent Transactions</h3>
            <Link href="/transactions" className="text-sm text-indigo-600 hover:underline font-bold">View History</Link>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                    <ArrowDownRight className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Payment to Dm3...x9a</p>
                    <p className="text-xs text-slate-400 font-medium">Oct 24, 2023 • 14:20</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900">0.45 SOL</p>
                  <p className="text-[10px] text-green-600 font-black uppercase tracking-widest">Approved</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <ActivityFeed />

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800">Active Scholarships</h3>
                <Link href="/scholarships" className="text-sm text-indigo-600 hover:underline font-bold">View All</Link>
              </div>
              <div className="space-y-6">
                {[
                  { title: 'Rust Mastery Grant', type: 'Dev Education', amount: '25 SOL' },
                  { title: 'Zambia Web3 Camp', type: 'Community Event', amount: '150 SOL' },
                  { title: 'DeFi protocol Audit', type: 'Project Grant', amount: '50 SOL' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800">{item.title}</p>
                      <p className="text-xs text-slate-500 font-medium">{item.type}</p>
                    </div>
                    <p className="font-black text-indigo-600">{item.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
