import React from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center glass-card border-dashed">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-slate-500">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm max-w-xs mb-6">{description}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="btn-primary text-sm py-2 px-6"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
