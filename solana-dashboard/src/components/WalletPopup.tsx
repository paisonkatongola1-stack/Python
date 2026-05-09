'use client';

import { ShieldCheck, ArrowRight, ShieldAlert, Wifi, Smartphone, X } from 'lucide-react';
import { useState } from 'react';

export default function WalletPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-brand-navy rounded-full shadow-2xl flex items-center justify-center text-brand-green hover:scale-110 transition-transform z-50 border-2 border-brand-green/20"
      >
        <ShieldCheck className="w-8 h-8" />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-red rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">1</div>
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-8 w-[360px] bg-brand-navy rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden border border-white/10 animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center text-brand-navy font-black">S</div>
              <h3 className="font-black text-white text-lg tracking-tight">SolanaDash Guard</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Incoming TX</span>
                <div className="flex gap-1">
                  <Wifi className="w-3 h-3 text-brand-green" />
                  <Smartphone className="w-3 h-3 text-brand-green" />
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-brand-red/20 rounded-xl flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <p className="text-white font-bold">Transfer 5.0 SOL</p>
                  <p className="text-xs text-white/40">To: 8x...j2</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-brand-red/10 rounded-xl border border-brand-red/20">
                <span className="text-xs font-black text-brand-red uppercase">Risk Score</span>
                <span className="text-xl font-black text-brand-red">88/100</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 bg-brand-red text-white rounded-xl font-black uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-brand-red/20">
                Deny Transaction
              </button>
              <button className="w-full py-4 border-2 border-brand-green text-brand-green rounded-xl font-black uppercase tracking-wider hover:bg-brand-green hover:text-brand-navy transition-all">
                Approve
              </button>
            </div>

            <p className="text-center text-[10px] font-bold text-white/30 mt-6 uppercase tracking-widest">
              Secured by SolanaDash AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}
