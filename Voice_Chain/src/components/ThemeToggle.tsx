'use client';

import { useTheme } from '@/context/ThemeContext';
import { Palette, Check } from 'lucide-react';
import { useState } from 'react';

const themes = [
  { id: 'indigo', name: 'Indigo (Default)', color: 'bg-indigo-600' },
  { id: 'emerald', name: 'Emerald Nature', color: 'bg-emerald-500' },
  { id: 'cyberpunk', name: 'Cyberpunk Night', color: 'bg-pink-600' },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2"
        title="Change Theme"
        aria-label="Change Theme"
      >
        <Palette className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-2xl z-10 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
            <div className="p-2 space-y-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    theme === t.id ? 'bg-slate-50 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${t.color}`}></div>
                    {t.name}
                  </div>
                  {theme === t.id && <Check className="w-4 h-4 text-indigo-600" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
