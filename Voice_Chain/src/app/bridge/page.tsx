'use client';

import { useState } from 'react';
import {
  ArrowLeftRight,
  Smartphone,
  CreditCard,
  Wallet as WalletIcon,
  ArrowRight,
  Info,
  CheckCircle2,
  RefreshCcw,
  Plus
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type PaymentMethod = 'mobile' | 'visa' | 'wallet';

export default function BridgePage() {
  const [fromMethod, setFromMethod] = useState<PaymentMethod>('mobile');
  const [toMethod, setToMethod] = useState<PaymentMethod>('wallet');
  const [amount, setAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      setCompleted(true);
    }, 2000);
  };

  const methods = [
    { id: 'mobile', name: 'Mobile Money', icon: Smartphone, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'visa', name: 'Visa/Mastercard', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'wallet', name: 'Solana Wallet', icon: WalletIcon, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Bridge Successful!</h1>
        <p className="text-slate-500 max-w-md mb-8">
          Your transaction has been processed. The funds will appear in your destination account shortly.
        </p>
        <button
          onClick={() => setCompleted(false)}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold"
        >
          Back to Bridge
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Universal Multi-Pay Bridge</h1>
        <p className="text-slate-500">Seamlessly move funds between Mobile Money, Cards, and Crypto</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-8 space-y-8">
        {/* FROM SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest">From</label>
            <span className="text-xs font-bold text-slate-500">Balance: 1,450.00 ZMW</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => setFromMethod(m.id as PaymentMethod)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                  fromMethod === m.id
                    ? "border-indigo-600 bg-indigo-50/50"
                    : "border-slate-100 hover:border-slate-200"
                )}
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", m.bg)}>
                  <m.icon className={cn("w-5 h-5", m.color)} />
                </div>
                <span className="text-[10px] font-black uppercase text-slate-600 text-center">{m.name}</span>
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="number"
              placeholder="0.00"
              className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="text-lg font-bold text-slate-400">{fromMethod === 'mobile' ? 'ZMW' : 'SOL'}</span>
              <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">MAX</button>
            </div>
          </div>
        </div>

        {/* SWAP ICON */}
        <div className="flex justify-center -my-10 relative z-10">
          <button
            onClick={() => {
              const temp = fromMethod;
              setFromMethod(toMethod);
              setToMethod(temp);
            }}
            className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg hover:rotate-180 transition-transform duration-500 border-4 border-white"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>
        </div>

        {/* TO SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-black text-slate-400 uppercase tracking-widest">To</label>
            <span className="text-xs font-bold text-slate-500 italic">Receiving Address: {toMethod === 'wallet' ? '8x...j2' : '+260 971...'}</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => setToMethod(m.id as PaymentMethod)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                  toMethod === m.id
                    ? "border-indigo-600 bg-indigo-50/50"
                    : "border-slate-100 hover:border-slate-200"
                )}
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", m.bg)}>
                  <m.icon className={cn("w-5 h-5", m.color)} />
                </div>
                <span className="text-[10px] font-black uppercase text-slate-600 text-center">{m.name}</span>
              </button>
            ))}
          </div>
          <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Estimated Receipt</p>
              <p className="text-2xl font-black text-indigo-900">
                {amount ? (parseFloat(amount) * (fromMethod === 'mobile' ? 0.045 : 22.5)).toFixed(3) : '0.00'}
                <span className="text-lg ml-2">{toMethod === 'wallet' ? 'SOL' : 'ZMW'}</span>
              </p>
            </div>
            <RefreshCcw className="w-5 h-5 text-indigo-300 animate-spin-slow" />
          </div>
        </div>

        <button
          onClick={handleSwap}
          disabled={!amount || isSwapping}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          {isSwapping ? (
            <>Processing Bridge...</>
          ) : (
            <>Execute Transaction <ArrowRight className="w-5 h-5" /></>
          )}
        </button>

        <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
          <Info className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            Funds bridged from Mobile Money are processed via the <b>Airtel/MTN Direct Gateway</b>.
            Typical processing time is 2-5 minutes. Gas fees are sponsored by the <b>Solana Impact Fund</b>.
          </p>
        </div>
      </div>

      {/* Other Wallets / Integrations */}
      <div className="flex flex-col items-center gap-6 pt-4">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Also compatible with</p>
        <div className="flex gap-8 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-[8px] text-white font-black">W</div>
            <span className="text-sm font-black">WalletConnect</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
            <span className="text-sm font-black">Coinbase</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
            <span className="text-sm font-black">MetaMask</span>
          </div>
          <button className="flex items-center gap-1 text-indigo-600">
            <Plus className="w-4 h-4" />
            <span className="text-xs font-bold">Add Provider</span>
          </button>
        </div>
      </div>
    </div>
  );
}
