'use client';

import { ShieldAlert, Volume2, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ScamOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a delay for demo purposes
    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const heights = [60, 100, 40, 80, 50, 90, 30, 70];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
      {/* Background Overlay with Gradient */}
      <div className="absolute inset-0 bg-brand-red/90 backdrop-blur-md bg-gradient-to-tr from-brand-dark to-brand-red/40"></div>

      <div className="relative bg-brand-dark w-full max-w-lg rounded-[2.5rem] border-4 border-brand-red shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-6 top-6 p-2 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10 text-center">
          <div className="w-20 h-20 bg-brand-red/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <ShieldAlert className="w-10 h-10 text-brand-red" />
          </div>

          <h2 className="text-3xl font-black text-white mb-4">DANGER: SCAM DETECTED</h2>
          <p className="text-brand-red font-bold text-lg mb-8 uppercase tracking-widest">High Risk Transaction</p>

          <div className="bg-white/5 rounded-3xl p-8 mb-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-400 font-bold uppercase text-sm">Risk Score</span>
              <span className="text-4xl font-black text-brand-green">98/100</span>
            </div>

            {/* Voice Wave Animation */}
            <div className="flex items-center justify-center gap-1.5 h-12">
              {heights.map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-brand-green rounded-full animate-bounce"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.8s'
                  }}
                ></div>
              ))}
              <Volume2 className="w-6 h-6 text-brand-green ml-4" />
            </div>
            <p className="text-brand-green text-xs font-black uppercase mt-4 tracking-tighter">Voice Analysis: &quot;Scam Signature Detected&quot;</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setIsVisible(false)}
              className="py-4 bg-white/10 text-white rounded-2xl font-black hover:bg-white/20 transition-colors uppercase"
            >
              Back to Safety
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="py-4 bg-brand-red text-white rounded-2xl font-black hover:brightness-110 transition-all uppercase shadow-lg shadow-brand-red/20"
            >
              Ignore & Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
