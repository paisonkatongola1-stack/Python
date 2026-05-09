'use client';

import { Users, Trophy, Heart, Flame } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DONORS = [
  { name: 'Solana Foundation', amount: '5000 SOL', impact: '120 Students', rank: 1 },
  { name: 'Anatoly Yakovenko', amount: '1200 SOL', impact: '45 Students', rank: 2 },
  { name: 'DeFi Summer Fund', amount: '850 SOL', impact: '32 Students', rank: 3 },
  { name: 'Crypto Panda', amount: '420 SOL', impact: '15 Students', rank: 4 },
  { name: 'Zambian Tech Hub', amount: '310 SOL', impact: '12 Students', rank: 5 },
];

const POOLS = [
  { name: 'Next-Gen Builders', goal: '1000 SOL', current: '750 SOL', donors: 156 },
  { name: 'Zambia Web3 Education', goal: '500 SOL', current: '420 SOL', donors: 89 },
  { name: 'Female Founders in Crypto', goal: '1200 SOL', current: '350 SOL', donors: 42 },
];

export default function CommunityPage() {
  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Donor Community</h1>
          <p className="text-slate-500">Supporting education and innovation through collective action</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-200 flex items-center justify-center font-bold text-slate-400 text-xs">
                U{i}
              </div>
            ))}
          </div>
          <span className="text-sm font-bold text-slate-600">+1,240 others donating</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Pools */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                Active Funding Pools
              </h3>
              <button className="text-sm font-bold text-indigo-600 hover:underline">View all pools</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {POOLS.map((pool, i) => {
                const progress = (parseFloat(pool.current) / parseFloat(pool.goal)) * 100;
                return (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                    <h4 className="font-bold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">{pool.name}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-slate-500">Progress</span>
                        <span className="text-slate-900">{pool.current} / {pool.goal}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-bold text-slate-500">{pool.donors} Donors participating</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Heart className="w-32 h-32" />
              </div>
              <div className="relative z-10 max-w-md">
                <h3 className="text-2xl font-bold mb-2">Become a Sponsor</h3>
                <p className="text-indigo-100 mb-6">Help us fund the next 1,000 developers in Africa. Your contribution goes directly to scholarships.</p>
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg">
                  Create Funding Pool
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Leaderboard */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Impact Leaderboard
              </h3>
            </div>
            <div className="divide-y divide-slate-50">
              {DONORS.map((donor, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "w-6 text-center font-black text-xs",
                      i === 0 ? "text-amber-500" : i === 1 ? "text-slate-400" : i === 2 ? "text-amber-700" : "text-slate-300"
                    )}>
                      {donor.rank}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-[10px]">
                      {donor.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-none mb-1">{donor.name}</p>
                      <p className="text-[10px] text-green-600 font-bold uppercase">{donor.impact} Impact</p>
                    </div>
                  </div>
                  <p className="text-xs font-black text-slate-900">{donor.amount}</p>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50 text-center">
              <button className="text-xs font-bold text-slate-500 hover:text-indigo-600">View Full Leaderboard</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              Donor Wall
            </h4>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-xs text-slate-600 leading-relaxed italic border-l-2 border-indigo-100 pl-3">
                  &quot;So proud to support the next generation of African developers. The progress in Zambia is incredible!&quot;
                  <p className="not-italic font-bold text-slate-400 mt-1">— Anonymous Donor</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
