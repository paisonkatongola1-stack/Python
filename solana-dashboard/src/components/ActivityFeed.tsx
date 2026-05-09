'use client';

import { Activity, Heart, Award, Zap } from 'lucide-react';

const ACTIVITIES = [
  { id: 1, type: 'tx', title: 'Payment Sent', detail: '0.45 SOL to 8x...j2', time: '2m ago', icon: Zap, color: 'text-amber-500' },
  { id: 2, type: 'community', title: 'Impact Milestone', detail: 'You supported 5 students', time: '1h ago', icon: Award, color: 'text-indigo-500' },
  { id: 3, type: 'donation', title: 'Donation Received', detail: '2.0 SOL from Anonymous', time: '3h ago', icon: Heart, color: 'text-red-500' },
  { id: 4, type: 'network', title: 'Network Status', detail: 'Solana Devnet is performing well', time: '5h ago', icon: Activity, color: 'text-emerald-500' },
];

export default function ActivityFeed() {
  return (
    <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-foreground">Live Activity</h3>
        <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded">Real-time</span>
      </div>
      <div className="space-y-6">
        {ACTIVITIES.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">{item.title}</p>
              <p className="text-xs text-slate-500 truncate">{item.detail}</p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">{item.time}</span>
          </div>
        ))}
      </div>
      <button className="w-full mt-8 py-3 text-sm font-bold text-slate-500 hover:text-primary transition-colors border-t border-border pt-6">
        View Full Audit Log
      </button>
    </div>
  );
}
