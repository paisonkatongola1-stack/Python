"use client";

import React, { useState, useRef } from "react";
import {
  Send,
  FileUp,
  Bot,
  User,
  Sparkles,
  BookOpen,
  FileText,
  BrainCircuit,
  RotateCcw,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your StudentLink AI Assistant. Upload your lecture notes or PDFs, and I can help you summarize them, generate quizzes, or answer questions about your coursework. How can I help you today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "That's a great question! Based on typical Zambian university curricula for this subject, you should focus on the key principles we discussed in the PDF. Would you like me to generate a 5-question quiz to test your knowledge on this?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleFileUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setFileUploaded(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            AI Study Assistant <Sparkles className="w-6 h-6 text-primary" />
          </h1>
          <p className="text-slate-400">Upload your material and master any subject.</p>
        </div>
        <div className="flex gap-2">
           <button className="btn-secondary py-2 px-4 text-sm flex items-center gap-2">
             <RotateCcw className="w-4 h-4" />
             Clear Chat
           </button>
           <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
             <Plus className="w-4 h-4" />
             New Session
           </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Sidebar Tools */}
        <div className="lg:col-span-1 flex flex-col gap-6 overflow-y-auto pr-2">
          <div className="glass-card p-5">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-sm">
              <FileUp className="w-4 h-4 text-primary" />
              Upload Study Material
            </h3>

            <div
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:bg-white/5 transition-all",
                fileUploaded && "border-green-500/50 bg-green-500/5"
              )}
            >
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
              {isUploading ? (
                <div className="space-y-2">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-xs text-slate-400">Analyzing PDF...</p>
                </div>
              ) : fileUploaded ? (
                <div className="space-y-2">
                  <FileText className="w-8 h-8 text-green-500 mx-auto" />
                  <p className="text-xs font-medium text-green-500">Lecture_Notes.pdf</p>
                  <p className="text-[10px] text-slate-400">Ready for analysis</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <FileUp className="w-8 h-8 text-slate-500 mx-auto" />
                  <p className="text-xs text-slate-400">Drop your PDFs here or click to browse</p>
                </div>
              )}
            </div>

            {fileUploaded && (
              <div className="mt-6 space-y-2">
                <button className="w-full btn-secondary py-2 text-xs flex items-center justify-center gap-2">
                  <BookOpen className="w-4 h-4" /> Generate Summary
                </button>
                <button className="w-full btn-secondary py-2 text-xs flex items-center justify-center gap-2">
                  <BrainCircuit className="w-4 h-4" /> Create Quiz
                </button>
              </div>
            )}
          </div>

          <div className="glass-card p-5">
            <h3 className="font-bold mb-4 text-sm">Recent Documents</h3>
            <div className="space-y-3">
              {[
                "Macroeconomics_Exam_Prep.pdf",
                "History_of_Zambia_L5.pdf",
                "Advanced_Calculus_Tutorial.pdf"
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span className="text-xs text-slate-300 truncate">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3 glass-card flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-4 max-w-[85%]",
                    m.role === "user" ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1",
                    m.role === "assistant" ? "bg-primary/20 text-primary" : "bg-white/10 text-slate-400"
                  )}>
                    {m.role === "assistant" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed",
                    m.role === "assistant"
                      ? "bg-white/5 text-slate-200 border border-white/5"
                      : "bg-primary text-white"
                  )}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="p-4 border-t border-white/10">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your study assistant anything..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-4 pr-16 outline-none focus:border-primary transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary p-2.5 rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
            <p className="text-[10px] text-slate-500 text-center mt-3 uppercase font-medium tracking-widest">
              AI can make mistakes. Verify important academic information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
