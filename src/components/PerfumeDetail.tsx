import React, { useState } from "react";
import { Perfume, SimilarPerfume } from "../types";
import { ArrowRight, Star, ShoppingBag, ShieldCheck, Heart, Sparkles, FolderPlus, Compass, BookOpen, Clock, Users, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PerfumeDetailProps {
  perfume: Perfume;
  onBack: () => void;
  onSelectSimilar: (name: string, brand: string) => void;
  onAddPerfumeToShelf: (perfume: Perfume) => void;
}

export default function PerfumeDetail({ perfume, onBack, onSelectSimilar, onAddPerfumeToShelf }: PerfumeDetailProps) {
  const [activeTab, setActiveTab] = useState<"notes" | "stores" | "similar">("notes");
  const [shelveToast, setShelveToast] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [showRatingSuccess, setShowRatingSuccess] = useState(false);

  const handleShelfAdd = () => {
    onAddPerfumeToShelf(perfume);
    setShelveToast(true);
    setTimeout(() => setShelveToast(false), 3000);
  };

  const handleRate = () => {
    setHasRated(true);
    setShowRatingSuccess(true);
    setTimeout(() => setShowRatingSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 relative">
      
      {/* Toast popup */}
      <AnimatePresence>
        {shelveToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 py-3 px-6 rounded-2xl bg-[#D4AF37] text-white font-semibold text-xs shadow-md flex items-center gap-2 flex-row-reverse"
          >
            <Sparkles className="w-4 h-4" />
            <span>تم بنجاح إضافة {perfume.name} إلى رفوف مجموعتك!</span>
          </motion.div>
        )}

        {showRatingSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 py-3 px-6 rounded-2xl bg-[#D4AF37] text-white font-semibold text-xs shadow-md flex items-center gap-2 flex-row-reverse"
          >
            <ShieldCheck className="w-4 h-4 animate-bounce" />
            <span>شكراً جزيلاً لتقييمك! كسبت +20 نقطة خبرة عطرية جديدة!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation header back */}
      <div className="flex justify-between items-center mb-6 flex-row-reverse">
        <button
          id="btn-detail-back"
          onClick={onBack}
          className="py-2.5 px-5 rounded-xl border border-[#E5E1DA] bg-white hover:bg-[#F9F8F6] text-xs font-semibold text-[#2D2D2D] flex items-center gap-2 flex-row-reverse transition-colors cursor-pointer shadow-sm"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع للاكتشاف وفحص صورة أخرى</span>
        </button>
        <span className="text-[10px] text-[#8E8E8E] font-mono">ID: {perfume.id.slice(0, 10)}</span>
      </div>

      {/* Main detail card layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8 text-right">
        
        {/* Left Side: Massive High Res Image and shelf modifiers - taking 5/12 grid */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white border border-[#E5E1DA] rounded-3xl overflow-hidden shadow-sm p-4 relative group">
            {/* Scent category label on top of picture */}
            <span className="absolute top-6 right-6 bg-white border border-[#E5E1DA] text-[#D4AF37] font-extrabold text-[10px] px-3 py-1.5 rounded-full z-10 font-display shadow-sm">
              {perfume.category}
            </span>

            <img
              src={perfume.image}
              alt={perfume.name}
              className="w-full aspect-[4/5] object-cover rounded-2xl border border-[#F0EEEA]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex gap-3">
            <button
              id="btn-add-detail-shelf"
              onClick={handleShelfAdd}
              className="flex-1 py-3 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#b38f24] text-white font-bold text-xs transition duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <FolderPlus className="w-4 h-4" />
              <span>أضف لرف عطوري (+50)</span>
            </button>
            <button
              onClick={handleRate}
              disabled={hasRated}
              className={`py-3 px-4 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${hasRated ? "border-emerald-200 text-emerald-700 bg-emerald-50/50 cursor-default" : "border-[#E5E1DA] text-[#555555] hover:bg-[#F9F8F6]"}`}
            >
              <Star className="w-4 h-4 fill-current text-[#D4AF37]" />
              <span>{hasRated ? "تم تقييمه" : "قيّم الآن"}</span>
            </button>
          </div>
        </div>

        {/* Right Side: Perfume detailed properties - taking 7/12 grid */}
        <div className="md:col-span-7 bg-white border border-[#E5E1DA] rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          {/* Brand and titles */}
          <div>
            <span className="text-xs text-[#D4AF37] font-bold font-display leading-none mb-2 block">{perfume.brand}</span>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-[#1A1A1A] font-serif">{perfume.name}</h2>
            <div className="flex items-center gap-4 mt-2 justify-end text-xs text-[#8E8E8E]">
              <span className="font-mono text-[#8E8E8E]">{perfume.englishName}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <span className="text-[#1A1A1A] font-bold">{perfume.rating}</span>
                <span className="text-[#8E8E8E]">({perfume.ratingsCount} تقييم)</span>
                <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              </div>
            </div>
          </div>

          {/* Description biography style */}
          <div>
            <h4 className="text-xs font-bold text-[#8E8E8E] mb-2 font-display">عن روح العطر ورائحته</h4>
            <p className="text-[#555555] text-xs md:text-sm leading-relaxed font-light font-sans">
              {perfume.description}
            </p>
          </div>

          {/* Scent longevity & Ingredients quick columns */}
          <div className="grid grid-cols-2 gap-4 border-t border-b border-[#F0EEEA] py-4">
            <div>
              <span className="text-[10px] text-[#8E8E8E] font-bold block mb-1 font-display">نسبة الثبات والتأثير</span>
              <p className="text-xs font-extrabold text-[#1A1A1A] font-display flex items-center gap-1 justify-end">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{perfume.expectedDuration}</span>
              </p>
            </div>
            <div>
              <span className="text-[10px] text-[#8E8E8E] font-bold block mb-1 font-display">المكونات وتناغم النوتات</span>
              <p className="text-xs font-semibold text-[#D4AF37] truncate" title={perfume.ingredients.join(", ")}>
                {perfume.ingredients.slice(0, 3).join(" • ")}
              </p>
            </div>
          </div>

          {/* Detailed specifications tab selection (pyramid notes | buy stores | recommendations) */}
          <div className="space-y-4">
            {/* Tab buttons */}
            <div className="flex border-b border-[#F0EEEA] justify-end gap-6 text-xs font-bold font-display">
              <button
                onClick={() => setActiveTab("similar")}
                className={`pb-2 px-1 relative transition duration-300 cursor-pointer ${activeTab === "similar" ? "text-[#D4AF37]" : "text-[#8E8E8E] hover:text-[#1A1A1A]"}`}
              >
                <span>بدائل وعطور مشابهة</span>
                {activeTab === "similar" && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#D4AF37]" />}
              </button>

              <button
                onClick={() => setActiveTab("stores")}
                className={`pb-2 px-1 relative transition duration-300 cursor-pointer ${activeTab === "stores" ? "text-[#D4AF37]" : "text-[#8E8E8E] hover:text-[#1A1A1A]"}`}
              >
                <span>أسعار المتاجر ومنافذ الشراء</span>
                {activeTab === "stores" && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#D4AF37]" />}
              </button>

              <button
                onClick={() => setActiveTab("notes")}
                className={`pb-2 px-1 relative transition duration-300 cursor-pointer ${activeTab === "notes" ? "text-[#D4AF37]" : "text-[#8E8E8E] hover:text-[#1A1A1A]"}`}
              >
                <span>الهرم العطري والملاحظات</span>
                {activeTab === "notes" && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#D4AF37]" />}
              </button>
            </div>

            {/* Tab content area */}
            <AnimatePresence mode="wait">
              {activeTab === "notes" && (
                <motion.div
                  key="tab-notes"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 pt-2"
                >
                  {/* Scent Pyramid Breakdown */}
                  <div className="space-y-4">
                    <div className="p-3 rounded-2xl bg-[#FDFCFB] border border-[#F0EEEA] flex flex-col md:flex-row gap-3 items-start justify-between flex-row-reverse text-right">
                      <div className="flex-shrink-0 bg-[#FAF8F5] text-[#D4AF37] py-1.5 px-3 rounded-xl border border-[#D4AF37]/20 text-xs font-bold font-display ml-0 md:ml-4">
                        🔺 النوتات العليا (الافتتاحية)
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        {perfume.notes.top.map((n, i) => (
                          <span key={i} className="py-1 px-2.2 bg-white border border-[#E5E1DA] text-[10px] text-[#555555] rounded-lg">{n}</span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#FDFCFB] border border-[#F0EEEA] flex flex-col md:flex-row gap-3 items-start justify-between flex-row-reverse text-right">
                      <div className="flex-shrink-0 bg-[#FAF8F5] text-[#D4AF37] py-1.5 px-3 rounded-xl border border-[#D4AF37]/20 text-xs font-bold font-display ml-0 md:ml-4">
                        ❤️ النوتات الوسطى (القلب)
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        {perfume.notes.middle.map((n, i) => (
                          <span key={i} className="py-1 px-2.2 bg-white border border-[#E5E1DA] text-[10px] text-[#555555] rounded-lg">{n}</span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#FDFCFB] border border-[#F0EEEA] flex flex-col md:flex-row gap-3 items-start justify-between flex-row-reverse text-right">
                      <div className="flex-shrink-0 bg-[#FAF8F5] text-[#D4AF37] py-1.5 px-3 rounded-xl border border-[#D4AF37]/20 text-xs font-bold font-display ml-0 md:ml-4">
                        📦 النوتات القاعدة (قاع العطر)
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        {perfume.notes.base.map((n, i) => (
                          <span key={i} className="py-1 px-2.2 bg-white border border-[#E5E1DA] text-[10px] text-[#555555] rounded-lg">{n}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tips and Wearing recommendation */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/20 text-[#4a3b0c] text-[11px] leading-relaxed">
                    <strong>💡 نصيحة الخبراء المفضلة:</strong> {perfume.reviewTips}
                  </div>
                </motion.div>
              )}

              {activeTab === "stores" && (
                <motion.div
                  key="tab-stores"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 pt-2"
                >
                  {perfume.stores.map((store, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 bg-[#FDFCFB] border border-[#E5E1DA] rounded-2xl flex justify-between items-center flex-row-reverse text-right shadow-sm"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-[#1A1A1A] font-display">{store.name}</h4>
                        <div className="flex gap-2 items-center flex-row-reverse text-[9px] text-[#8e8e8e] mt-1">
                          <span className={`${store.inStock ? "text-emerald-600 font-semibold" : "text-red-500"}`}>
                            {store.inStock ? "المخزون متوفر" : "غير متوفر حالياً"}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            {store.rating} <Star className="w-2.5 h-2.5 fill-[#D4AF37] text-[#D4AF37]" />
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-[#D4AF37] font-display">{store.price} ر.س</span>
                        <a
                          href={store.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-3 bg-white hover:border-[#D4AF37] text-[#555555] hover:text-[#D4AF37] text-[10px] rounded-lg border border-[#E5E1DA] transition duration-300 font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <span>شراء مباشر</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "similar" && (
                <motion.div
                  key="tab-similar"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
                >
                  {perfume.similarPerfumes.map((similar, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 bg-[#FDFCFB] border border-[#E5E1DA] rounded-2xl flex gap-3 text-right flex-row-reverse items-center shadow-sm"
                    >
                      <img 
                        src={similar.image} 
                        alt={similar.name} 
                        className="w-14 h-14 rounded-xl object-cover border border-[#E5E1DA]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0 text-right">
                        <p className="text-[9px] text-[#8E8E8E] font-semibold leading-none">{similar.brand}</p>
                        <h5 className="text-xs font-bold text-[#1A1A1A] truncate my-1 font-display">{similar.name}</h5>
                        <div className="flex justify-between items-center mt-2 flex-row-reverse">
                          <span className="text-[10px] text-[#D4AF37] font-bold">{similar.price}</span>
                          <button
                            onClick={() => onSelectSimilar(similar.name, similar.brand)}
                            className="text-[9px] bg-white border border-[#E5E1DA] text-[#555555] py-1 px-2 rounded hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer shadow-sm"
                          >
                            اكتشف شبيهه رادارياً
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
