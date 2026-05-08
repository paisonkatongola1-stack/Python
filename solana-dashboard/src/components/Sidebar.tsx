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
    <div className="w-64 bg-brand-navy border-r border-white/10 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center text-brand-navy font-black">S</div>
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
                  ? "bg-white/10 text-white font-medium"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-brand-green" : "text-slate-500")} />
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
              ? "bg-white/10 text-white font-medium"
              : "text-slate-400 hover:bg-white/5 hover:text-white"
          )}
        >
          <Settings className={cn("w-5 h-5", pathname === '/settings' ? "text-brand-green" : "text-slate-500")} />
          Settings
        </Link>
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Network</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></div>
            <span className="text-sm font-medium text-slate-200">Solana Devnet</span>
          </div>
        </div>
      </div>
    </div>
  );
}
