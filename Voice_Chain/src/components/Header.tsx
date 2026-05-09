'use client';

import dynamic from 'next/dynamic';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Bell, Search, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

// Import WalletMultiButton dynamically to avoid hydration issues
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function Header() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const { user, logout } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    if (!publicKey || !connection) {
      return;
    }

    let isMounted = true;

    connection.getBalance(publicKey).then((bal) => {
      if (isMounted) {
        setBalance(bal / LAMPORTS_PER_SOL);
      }
    });

    const subscriptionId = connection.onAccountChange(
      publicKey,
      (account) => {
        if (isMounted) {
          setBalance(account.lamports / LAMPORTS_PER_SOL);
        }
      }
    );

    return () => {
      isMounted = false;
      connection.removeAccountChangeListener(subscriptionId);
      setBalance(null);
    };
  }, [publicKey, connection]);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search transactions, donors, or scholarships..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-0" onClick={() => setShowNotifications(false)}></div>
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 shadow-xl rounded-2xl z-10 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                <div className="p-4 border-b border-slate-50 flex items-center justify-between">
                  <h4 className="font-bold text-slate-800">Notifications</h4>
                  <button className="text-[10px] font-bold text-indigo-600 uppercase hover:underline">Mark all read</button>
                </div>
                <div className="max-h-96 overflow-y-auto divide-y divide-slate-50">
                  <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                    <p className="text-sm font-bold text-slate-800">New Donation! ❤️</p>
                    <p className="text-xs text-slate-500">A donor just contributed 5 SOL to your pool.</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">2 minutes ago</p>
                  </div>
                  <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                    <p className="text-sm font-bold text-slate-800">Scholarship Update 🎓</p>
                    <p className="text-xs text-slate-500">Your application status has changed to &quot;Under Review&quot;.</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">1 hour ago</p>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
                  <button className="text-xs font-bold text-slate-500 hover:text-slate-700">View all notifications</button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-px h-8 bg-slate-200 mx-2"></div>

        {publicKey && (
          <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Balance</span>
              <span className="text-sm font-bold text-slate-700">
                {balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}
              </span>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Address</span>
              <span className="text-sm font-mono text-slate-600">
                {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <WalletMultiButtonDynamic />

          {user && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border-2 border-transparent hover:border-indigo-200 transition-all"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>

              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-0" onClick={() => setShowUserMenu(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-2xl z-10 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                    <div className="p-4 border-b border-slate-50">
                      <p className="text-sm font-bold text-slate-800">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-colors font-medium"
                      >
                        <User className="w-4 h-4" />
                        Profile Settings
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
