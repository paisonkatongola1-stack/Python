"use client";

import React, { useState } from "react";
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  MoreVertical,
  Hash,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePocketBaseList } from "@/hooks/usePocketBase";
import { RecordModel } from "pocketbase";

interface Post extends RecordModel {
  content: string;
  author_name: string;
  university: string;
  likes: number;
}

export default function CommunityPage() {
  const { data: posts, loading } = usePocketBaseList<Post>('posts');
  const [activeFilter, setActiveFilter] = useState("All");
  const [newPost, setNewPost] = useState("");

  const filtered = posts.filter(post => activeFilter === "All" || post.university === activeFilter);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Community Feed <Users className="w-6 h-6 text-primary" />
          </h1>
          <p className="text-slate-400">Connect, share, and grow with students nationwide.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-5">
            <h3 className="font-bold mb-4 text-xs uppercase tracking-widest text-slate-500">Universities</h3>
            <div className="space-y-1">
              {["All", "UNZA", "CBU", "Mulungushi", "Cavendish", "ZCAS"].map(uni => (
                <button
                  key={uni}
                  onClick={() => setActiveFilter(uni)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center gap-2",
                    activeFilter === uni ? "bg-primary text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Hash className="w-3 h-3" />
                  {uni}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="glass-card p-5">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-1 space-y-4">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share something with your fellow students..."
                  className="w-full bg-transparent border-none outline-none text-sm resize-none h-20 placeholder:text-slate-500"
                />
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all">
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all">
                      <Hash className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    disabled={!newPost.trim()}
                    className="btn-primary py-2 px-6 text-xs font-bold disabled:opacity-50"
                  >
                    Post Update
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 glass-card">
                <p className="text-slate-400">No community posts yet. Be the first to share!</p>
              </div>
            ) : (
              filtered.map((post, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={post.id}
                  className="glass-card p-6 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-bold text-primary">
                        {post.author_name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{post.author_name || 'Anonymous'}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                          <span className="font-bold text-primary">{post.university}</span>
                          <span>•</span>
                          <span>{new Date(post.created).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />

                  <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                    <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-red-400 transition-colors">
                      <Heart className="w-4 h-4" />
                      {post.likes || 0}
                    </button>
                    <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      0
                    </button>
                    <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors ml-auto">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
