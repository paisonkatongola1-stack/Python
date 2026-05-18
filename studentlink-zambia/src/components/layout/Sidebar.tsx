"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  GraduationCap,
  Store,
  Briefcase,
  Users,
  Settings,
  LogOut,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: MessageSquare, label: "AI Study Assistant", href: "/ai-assistant" },
  { icon: GraduationCap, label: "Scholarship Hub", href: "/scholarships" },
  { icon: Store, label: "Marketplace", href: "/marketplace" },
  { icon: Briefcase, label: "Jobs Board", href: "/jobs" },
  { icon: Users, label: "Community Feed", href: "/community" },
];

interface SidebarProps {
  mobile?: boolean;
  onLinkClick?: () => void;
}

export function Sidebar({ mobile, onLinkClick }: SidebarProps) {
  const pathname = usePathname();

  const content = (
    <>
      {!mobile && (
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold gradient-text">StudentLink</h1>
        </div>
      )}

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                "nav-link",
                isActive && "nav-link-active"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white/10 space-y-2">
        <Link
          href="/settings"
          onClick={onLinkClick}
          className={cn("nav-link", pathname === "/settings" && "nav-link-active")}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
        <Link href="/" className="w-full nav-link text-red-400 hover:text-red-300 hover:bg-red-400/5">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </div>
    </>
  );

  if (mobile) {
    return <div className="flex flex-col h-full">{content}</div>;
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-card rounded-none border-y-0 border-l-0 border-r border-white/10 hidden md:flex flex-col p-6 z-50">
      {content}
    </aside>
  );
}
