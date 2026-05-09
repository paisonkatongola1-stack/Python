'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  ArrowUpRight,
  MoreVertical,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Transaction = {
  id: string;
  date: string;
  to: string;
  amount: number;
  riskScore: number;
  decision: 'Approve' | 'Deny';
};

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2023-10-25 14:30', to: '8x...j2', amount: 1.5, riskScore: 5, decision: 'Approve' },
  { id: '2', date: '2023-10-25 11:20', to: '4a...k9', amount: 0.25, riskScore: 88, decision: 'Deny' },
  { id: '3', date: '2023-10-24 16:45', to: '9z...p1', amount: 5.0, riskScore: 12, decision: 'Approve' },
  { id: '4', date: '2023-10-23 09:15', to: '2m...x3', amount: 0.1, riskScore: 45, decision: 'Approve' },
  { id: '5', date: '2023-10-22 18:30', to: '7y...q8', amount: 2.2, riskScore: 92, decision: 'Deny' },
  { id: '6', date: '2023-10-21 12:00', to: '5v...r4', amount: 0.75, riskScore: 2, decision: 'Approve' },
  { id: '7', date: '2023-10-20 15:10', to: '3c...t6', amount: 1.1, riskScore: 18, decision: 'Approve' },
];

export default function TransactionsPage() {
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all');

  const filteredTransactions = MOCK_TRANSACTIONS.filter(tx => {
    if (filter === 'all') return true;
    const txDate = new Date(tx.date);
    const now = new Date('2023-10-25'); // Hardcoded "now" for mock demo

    if (filter === 'today') {
      return txDate.toDateString() === now.toDateString();
    }
    if (filter === 'week') {
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      return txDate >= weekAgo;
    }
    return true;
  });

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-brand-green bg-brand-green/10';
    if (score < 70) return 'text-amber-500 bg-amber-500/10';
    return 'text-brand-red bg-brand-red/10';
  };

  const getRiskBarColor = (score: number) => {
    if (score < 30) return 'bg-brand-green';
    if (score < 70) return 'bg-amber-500';
    return 'bg-brand-red';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transaction History</h1>
          <p className="text-slate-500 text-sm">Review and manage your past activities</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search address..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Tabs/Filters */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg w-fit">
        {(['all', 'today', 'week'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
              filter === t
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">To Address</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Voice Decision</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((tx, idx) => (
                <tr key={tx.id} className={cn(
                  "hover:bg-slate-50 transition-colors",
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                )}>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800">{tx.date.split(' ')[0]}</span>
                      <span className="text-xs text-slate-400">{tx.date.split(' ')[1]}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center">
                        <ArrowUpRight className="w-3 h-3 text-slate-500" />
                      </div>
                      <span className="text-sm font-mono text-slate-600">{tx.to}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">{tx.amount} SOL</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase", getRiskColor(tx.riskScore))}>
                        {tx.riskScore}
                      </div>
                      <div className="flex-1 min-w-[60px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", getRiskBarColor(tx.riskScore))}
                          style={{ width: `${tx.riskScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {tx.decision === 'Approve' ? (
                        <button className="px-3 py-1 text-[10px] font-black uppercase border-2 border-brand-green text-brand-green rounded-lg hover:bg-brand-green hover:text-white transition-colors">
                          Approve
                        </button>
                      ) : (
                        <button className="px-3 py-1 text-[10px] font-black uppercase bg-brand-red text-white border-2 border-brand-red rounded-lg hover:brightness-110 transition-all">
                          Deny
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-slate-200 rounded-md transition-colors">
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-500">No transactions found for this period.</p>
          </div>
        )}
      </div>
    </div>
  );
}
