"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  MapPin,
  Tag,
  Book,
  Laptop,
  Home,
  Smartphone,
  CheckCircle2,
  X,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePocketBaseList } from "@/hooks/usePocketBase";
import { RecordModel } from "pocketbase";

interface Product extends RecordModel {
  title: string;
  price: number;
  category: string;
  location: string;
  seller_name: string;
}

export default function MarketplacePage() {
  const { data: products, loading } = usePocketBaseList<Product>('marketplace');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [paymentStep, setPaymentStep] = useState<"method" | "processing" | "success">("method");
  const [selectedMethod, setSelectedMethod] = useState("");

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBuy = (product: Product) => {
    setSelectedProduct(product);
    setPaymentStep("method");
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    setPaymentStep("processing");
    setTimeout(() => {
      setPaymentStep("success");
    }, 2500);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campus Marketplace</h1>
          <p className="text-slate-400">Securely buy and sell items with fellow students.</p>
        </div>
        <button className="btn-primary py-2 px-6 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          List an Item
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 flex flex-col gap-6">
          <div className="glass-card p-5">
             <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>

             <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 px-2">Categories</h3>
             <div className="space-y-1">
                {[
                  { name: "All", icon: Tag },
                  { name: "Books", icon: Book },
                  { name: "Electronics", icon: Laptop },
                  { name: "Housing", icon: Home },
                  { name: "Phones", icon: Smartphone },
                ].map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all",
                      selectedCategory === cat.name
                        ? "bg-primary text-white"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                ))}
             </div>
          </div>
        </div>

        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 glass-card">
              <p className="text-slate-400">No products found. Be the first to list one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glass-card overflow-hidden flex flex-col group"
                  >
                    <div className="relative aspect-square overflow-hidden bg-white/5 flex items-center justify-center">
                       <Tag className="w-12 h-12 text-slate-700" />
                      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        <span className="text-xs font-bold text-white">K{product.price}</span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] uppercase font-bold text-primary tracking-wider px-2 py-0.5 bg-primary/10 rounded-md">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{product.title}</h3>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-4">
                        <MapPin className="w-3 h-3" />
                        {product.location}
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10" />
                            <span className="text-xs text-slate-400">{product.seller_name}</span>
                         </div>
                         <button
                          onClick={() => handleBuy(product)}
                          className="btn-primary py-1.5 px-4 text-xs font-semibold"
                        >
                           Buy Now
                         </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setShowPaymentModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md glass-card p-8 relative z-10"
            >
              <button
                onClick={() => setShowPaymentModal(false)}
                className="absolute right-6 top-6 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {paymentStep === "method" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">Secure Checkout</h2>
                    <p className="text-slate-400 text-sm mt-1">Paying for: <span className="text-white font-medium">{selectedProduct?.title}</span></p>
                    <p className="text-2xl font-black mt-2 gradient-text">K{selectedProduct?.price}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Select Payment Method</p>
                    {[
                      { id: "airtel", name: "Airtel Money", color: "bg-red-600" },
                      { id: "mtn", name: "MTN Mobile Money", color: "bg-yellow-500" },
                      { id: "zamtel", name: "Zamtel Kwacha", color: "bg-green-600" },
                      { id: "bank", name: "Bank Transfer", color: "bg-blue-600" },
                    ].map(method => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={cn(
                          "w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/30 transition-all",
                          selectedMethod === method.id && "bg-white/10 border-primary shadow-lg shadow-primary/10"
                        )}
                      >
                        <div className="flex items-center gap-3">
                           <div className={cn("w-3 h-3 rounded-full", method.color)} />
                           <span className="font-semibold">{method.name}</span>
                        </div>
                        {selectedMethod === method.id && <CheckCircle2 className="w-5 h-5 text-primary" />}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={!selectedMethod}
                    onClick={processPayment}
                    className="w-full btn-primary disabled:opacity-50"
                  >
                    Confirm & Pay
                  </button>
                </div>
              )}

              {paymentStep === "processing" && (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Processing Transaction</h3>
                    <p className="text-slate-400 text-sm">Please check your phone for the USSD prompt and enter your PIN.</p>
                  </div>
                </div>
              )}

              {paymentStep === "success" && (
                <div className="py-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-green-500">Payment Successful!</h3>
                    <p className="text-slate-400 text-sm">You have successfully purchased {selectedProduct?.title}. The seller has been notified.</p>
                  </div>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="btn-primary w-full"
                  >
                    Back to Marketplace
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
