'use client';

import { useState } from 'react';
import {
  GraduationCap,
  Send,
  User,
  BookOpen,
  Target,
  DollarSign,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

export default function ScholarshipsPage() {
  const { publicKey } = useWallet();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    program: '',
    fundingGoal: '',
    justification: '',
    portfolio: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to API
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Application Received!</h1>
        <p className="text-slate-500 max-w-md mb-8">
          Thank you for applying. Our scholarship committee will review your application
          and get back to you within 5-7 business days via email.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-indigo-600 font-bold hover:underline"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Scholarship Application</h1>
          <p className="text-slate-500 text-sm">Empowering the next generation of Solana builders</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-800 mb-1">Professional Qualification Form</h3>
          <p className="text-sm text-slate-500">Please provide accurate details to increase your chances of selection.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  required
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Jane Smith"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Academic Program / Field of Study</label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  required
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Computer Science, Blockchain Dev, etc."
                  value={formData.program}
                  onChange={(e) => setFormData({...formData, program: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Funding Goal (SOL)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  required
                  type="number"
                  step="0.1"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 10.5"
                  value={formData.fundingGoal}
                  onChange={(e) => setFormData({...formData, fundingGoal: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Solana Wallet Address</label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  readOnly
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 italic"
                  value={publicKey ? publicKey.toBase58() : 'Connect wallet to autofill'}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Justification for Scholarship</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <textarea
                required
                rows={4}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Tell us about your project or educational goals and how this funding will help..."
                value={formData.justification}
                onChange={(e) => setFormData({...formData, justification: e.target.value})}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Submit Application
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-xl">
          <h4 className="font-bold text-indigo-900 mb-1">Step 1: Apply</h4>
          <p className="text-xs text-indigo-700">Complete the form with your project details and funding goals.</p>
        </div>
        <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
          <h4 className="font-bold text-slate-800 mb-1">Step 2: Review</h4>
          <p className="text-xs text-slate-500">Our decentralized committee reviews your application and code/portfolio.</p>
        </div>
        <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl">
          <h4 className="font-bold text-slate-800 mb-1">Step 3: Receive</h4>
          <p className="text-xs text-slate-500">Funds are streamed directly to your verified SOL wallet address.</p>
        </div>
      </div>
    </div>
  );
}
