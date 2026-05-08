'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  History,
  BarChart3,
  GraduationCap,
  Users2,
  ArrowLeftRight,
  Settings
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard Home', href: '/', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: History },
  { name: 'Spending Analytics', href: '/spending', icon: BarChart3 },
  { name: 'Scholarships', href: '/scholarships', icon: GraduationCap },
  { name: 'Community', href: '/community', icon: Users2 },
  { name: 'Multi-Pay Bridge', href: '/bridge', icon: ArrowLeftRight },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black">S</div>
          SolanaDash
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-600" : "text-slate-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mb-4">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
            pathname === '/settings'
              ? "bg-indigo-50 text-indigo-700 font-medium"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          )}
        >
          <Settings className={cn("w-5 h-5", pathname === '/settings' ? "text-indigo-600" : "text-slate-400")} />
          Settings
        </Link>
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-lg p-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Network</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700">Solana Devnet</span>
          </div>
        </div>
      </div>
    </div>
  );
}
