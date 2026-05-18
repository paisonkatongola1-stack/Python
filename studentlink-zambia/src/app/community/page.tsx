"use client";

import React, { useState } from "react";
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  MoreVertical,

  Hash,
  Image as ImageIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const posts = [
  {
    id: "1",
    author: "Kondwani Banda",
    university: "UNZA",
    content: "Has anyone managed to get the latest past papers for EEE311? The library seems to be out of copies.",
    likes: 12,
    comments: 8,
    time: "2h ago",
    tags: ["Engineering", "UNZA"]
  },
  {
    id: "2",
    author: "Misozi Phiri",
    university: "CBU",
    content: "Big shoutout to the StudentLink AI Assistant! Just summarized my 50-page biology manual in 30 seconds. Literal lifesaver for exams! 🚀",
    likes: 45,
    comments: 3,
    time: "4h ago",
    tags: ["StudyTips", "AI"]
  },
  {
    id: "3",
    author: "Joshua Mwanza",
    university: "Mulungushi",
    content: "Anyone interested in starting a coding club at Mulungushi? Looking for developers interested in React and Next.js.",
    likes: 28,
    comments: 15,
    time: "1d ago",
    tags: ["Coding", "Collaboration"]
  },
];

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [newPost, setNewPost] = useState("");

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
        {/* Left Sidebar - Forums */}
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

          <div className="glass-card p-5">
            <h3 className="font-bold mb-4 text-xs uppercase tracking-widest text-slate-500">Trending Topics</h3>
            <div className="space-y-3">
              {["#ExamPrep", "#Scholarships2025", "#ZambianTech", "#StudentLife"].map(tag => (
                <a key={tag} href="#" className="block text-sm text-slate-400 hover:text-primary transition-colors">
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          {/* Create Post */}
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

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post, i) => (
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
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{post.author}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="font-bold text-primary">{post.university}</span>
                        <span>•</span>
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {post.content}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-slate-500 px-2 py-0.5 bg-white/5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                  <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-red-400 transition-colors">
                    <Heart className="w-4 h-4" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-primary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors ml-auto">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
