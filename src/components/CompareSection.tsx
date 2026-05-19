import React, { useState } from "react";
import { PRESET_PERFUMES } from "../data";
import { Perfume } from "../types";
import { Scale, Sparkles, HelpCircle, Star, ShoppingBag, Eye, Zap, Flame, Shield, ArrowLeftRight } from "lucide-react";
import { motion } from "motion/react";

interface CompareSectionProps {
  onNavigateToPerfume: (perfume: Perfume) => void;
}

export default function CompareSection({ onNavigateToPerfume }: CompareSectionProps) {
  const [perfumeAId, setPerfumeAId] = useState(PRESET_PERFUMES[0]?.id || "");
  const [perfumeBId, setPerfumeBId] = useState(PRESET_PERFUMES[1]?.id || "");

  const perfumeA = PRESET_PERFUMES.find(p => p.id === perfumeAId) || PRESET_PERFUMES[0];
  const perfumeB = PRESET_PERFUMES.find(p => p.id === perfumeBId) || PRESET_PERFUMES[1];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Title block */}
      <div className="flex flex-col items-center text-center justify-center mb-10">
        <div className="w-12 h-12 bg-[#FAF8F5] border border-[#D4AF37]/30 text-[#D4AF37] rounded-full flex items-center justify-center shadow-sm mb-3">
          <Scale className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold font-display text-[#1A1A1A] font-serif mb-2">المقارنة العطرية الذكية</h2>
        <p className="text-[#555555] text-xs max-w-sm leading-relaxed">
          وازن بين نوتات العطور الفاخرة، عمر الثبات، والتفاصيل لتختار عطرك المثالي بدقة ميكروسكوبية.
        </p>
      </div>

      {/* Selectors card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mb-8">
        <div className="bg-white border border-[#E5E1DA] rounded-2xl p-4 flex flex-col shadow-sm">
          <label className="text-[11px] font-bold text-[#8E8E8E] mb-2 block text-right">العطر الأول (A)</label>
          <select
            id="select-perfume-a"
            value={perfumeAId}
            onChange={(e) => setPerfumeAId(e.target.value)}
            className="w-full py-2.5 px-3 bg-white border border-[#E5E1DA] text-[#2D2D2D] text-sm rounded-xl focus:outline-none focus:border-[#D4AF37]"
          >
            {PRESET_PERFUMES.map(p => (
              <option key={p.id} value={p.id}>{p.brand} - {p.name}</option>
            ))}
          </select>
        </div>

        <div className="bg-white border border-[#E5E1DA] rounded-2xl p-4 flex flex-col shadow-sm">
          <label className="text-[11px] font-bold text-[#8E8E8E] mb-2 block text-right">العطر الثاني (B)</label>
          <select
            id="select-perfume-b"
            value={perfumeBId}
            onChange={(e) => setPerfumeBId(e.target.value)}
            className="w-full py-2.5 px-3 bg-white border border-[#E5E1DA] text-[#2D2D2D] text-sm rounded-xl focus:outline-none focus:border-[#D4AF37]"
          >
            {PRESET_PERFUMES.map(p => (
              <option key={p.id} value={p.id}>{p.brand} - {p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Two column compare view */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 rounded-3xl bg-white border border-[#E5E1DA] p-5 md:p-8 shadow-sm relative overflow-hidden">
        {/* Central decorative divider */}
        <div className="absolute inset-y-0 left-1/2 w-px bg-[#F0EEEA] hidden md:block" />

        {/* Column A */}
        <div className="flex flex-col text-right pl-2 md:pl-6 border-l border-[#F0EEEA] pr-1">
          <motion.div
            key={perfumeA.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Visual Head */}
            <div className="text-center md:text-right flex flex-col md:flex-row gap-4 items-center">
              <img
                src={perfumeA.image}
                alt={perfumeA.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border border-[#E5E1DA] shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-[#D4AF37] font-bold uppercase">{perfumeA.brand}</p>
                <h3 className="text-base md:text-xl font-bold text-[#1A1A1A] font-serif leading-tight truncate">{perfumeA.name}</h3>
                <p className="text-[#8E8E8E] text-[10px] md:text-xs font-mono">{perfumeA.englishName}</p>
                <div className="flex items-center gap-1 mt-1 justify-center md:justify-end">
                  <span className="text-xs text-[#8E8E8E] mt-0.5">({perfumeA.ratingsCount})</span>
                  <span className="text-xs font-bold text-[#1A1A1A]">{perfumeA.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                </div>
              </div>
            </div>

            {/* Quick specifications */}
            <div className="space-y-3 pt-4 border-t border-[#F0EEEA]">
              <div>
                <span className="text-[10px] text-[#8E8E8E] font-bold">عائلة الرائحة</span>
                <p className="text-xs font-semibold text-[#D4AF37]">{perfumeA.category}</p>
              </div>
              <div>
                <span className="text-[10px] text-[#8E8E8E] font-bold">ثبات العطر</span>
                <p className="text-xs font-semibold text-[#2D2D2D]">{perfumeA.expectedDuration}</p>
              </div>
              <div>
                <span className="text-[10px] text-[#8E8E8E] font-bold">متوسط السعر للشراء</span>
                <p className="text-sm font-bold text-[#D4AF37]">{perfumeA.stores[0]?.price} ر.س</p>
              </div>
            </div>

            {/* Detailed Notes comparing */}
            <div className="space-y-4 pt-4 border-t border-[#F0EEEA]">
              <h4 className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 justify-end font-display">
                <span>افتتاحية العطر (النوتات العليا)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </h4>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {perfumeA.notes.top.map((note, i) => (
                  <span key={i} className="py-1 px-2 rounded-lg bg-white border border-[#E5E1DA] text-[10px] text-[#555555]">
                    {note}
                  </span>
                ))}
              </div>

              <h4 className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 justify-end font-display">
                <span>قلب العطر (النوتات الوسطى)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </h4>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {perfumeA.notes.middle.map((note, i) => (
                  <span key={i} className="py-1 px-2 rounded-lg bg-white border border-[#E5E1DA] text-[10px] text-[#555555]">
                    {note}
                  </span>
                ))}
              </div>

              <h4 className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 justify-end font-display">
                <span>قاعدة العطر (النوتات القاعدية)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </h4>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {perfumeA.notes.base.map((note, i) => (
                  <span key={i} className="py-1 px-2 rounded-lg bg-white border border-[#E5E1DA] text-[10px] text-[#555555]">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Detail button */}
            <div className="pt-6">
              <button
                id="btn-nav-compare-a"
                onClick={() => onNavigateToPerfume(perfumeA)}
                className="w-full py-2.5 px-4 bg-white border border-[#E5E1DA] hover:border-[#D4AF37] text-xs font-bold text-[#555555] hover:text-[#D4AF37] rounded-xl transition-all duration-350 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Eye className="w-4 h-4" />
                <span>عرض الصفحة الشاملة (A)</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Column B */}
        <div className="flex flex-col text-right pr-2 md:pr-6">
          <motion.div
            key={perfumeB.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Visual Head */}
            <div className="text-center md:text-right flex flex-col md:flex-row gap-4 items-center">
              <img
                src={perfumeB.image}
                alt={perfumeB.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border border-[#E5E1DA] shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-[#D4AF37] font-bold uppercase">{perfumeB.brand}</p>
                <h3 className="text-base md:text-xl font-bold text-[#1A1A1A] font-serif leading-tight truncate">{perfumeB.name}</h3>
                <p className="text-[#8E8E8E] text-[10px] md:text-xs font-mono">{perfumeB.englishName}</p>
                <div className="flex items-center gap-1 mt-1 justify-center md:justify-end">
                  <span className="text-xs text-[#8E8E8E] mt-0.5">({perfumeB.ratingsCount})</span>
                  <span className="text-xs font-bold text-[#1A1A1A]">{perfumeB.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                </div>
              </div>
            </div>

            {/* Quick specifications */}
            <div className="space-y-3 pt-4 border-t border-[#F0EEEA]">
              <div>
                <span className="text-[10px] text-[#8E8E8E] font-bold">عائلة الرائحة</span>
                <p className="text-xs font-semibold text-[#D4AF37]">{perfumeB.category}</p>
              </div>
              <div>
                <span className="text-[10px] text-[#8E8E8E] font-bold">ثبات العطر</span>
                <p className="text-xs font-semibold text-[#2D2D2D]">{perfumeB.expectedDuration}</p>
              </div>
              <div>
                <span className="text-[10px] text-[#8E8E8E] font-bold">متوسط السعر للشراء</span>
                <p className="text-sm font-bold text-[#D4AF37]">{perfumeB.stores[0]?.price} ر.س</p>
              </div>
            </div>

            {/* Detailed Notes comparing */}
            <div className="space-y-4 pt-4 border-t border-[#F0EEEA]">
              <h4 className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 justify-end font-display">
                <span>افتتاحية العطر (النوتات العليا)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </h4>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {perfumeB.notes.top.map((note, i) => (
                  <span key={i} className="py-1 px-2 rounded-lg bg-white border border-[#E5E1DA] text-[10px] text-[#555555]">
                    {note}
                  </span>
                ))}
              </div>

              <h4 className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 justify-end font-display">
                <span>قلب العطر (النوتات الوسطى)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </h4>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {perfumeB.notes.middle.map((note, i) => (
                  <span key={i} className="py-1 px-2 rounded-lg bg-white border border-[#E5E1DA] text-[10px] text-[#555555]">
                    {note}
                  </span>
                ))}
              </div>

              <h4 className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 justify-end font-display">
                <span>قاعدة العطر (النوتات القاعدية)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </h4>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {perfumeB.notes.base.map((note, i) => (
                  <span key={i} className="py-1 px-2 rounded-lg bg-white border border-[#E5E1DA] text-[10px] text-[#555555]">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Detail button */}
            <div className="pt-6">
              <button
                id="btn-nav-compare-b"
                onClick={() => onNavigateToPerfume(perfumeB)}
                className="w-full py-2.5 px-4 bg-white border border-[#E5E1DA] hover:border-[#D4AF37] text-xs font-bold text-[#555555] hover:text-[#D4AF37] rounded-xl transition-all duration-350 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Eye className="w-4 h-4" />
                <span>عرض الصفحة الشاملة (B)</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative summary tip */}
      <div className="mt-8 p-4 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/20 text-[#555555] text-xs text-right leading-relaxed flex gap-3 items-center flex-row-reverse">
        <Sparkles className="w-5 h-5 flex-shrink-0 text-[#D4AF37]" />
        <p>
          تلميحة نوتات ذكية: عطر {perfumeA.name} ينضح بنوتة <strong className="text-[#1A1A1A]">({perfumeA.notes.top[0]})</strong> في الرذاذ الأول مما يجعله أكثر {perfumeA.category.includes("حمض") ? "انتعاشاً" : "دفءاً"} بينما عطر {perfumeB.name} تبرز في قلبه رائحة <strong className="text-[#1A1A1A]">({perfumeB.notes.middle[0]})</strong> ليدوم عبيرها ويهدأ هالتك طيلة السهرة.
        </p>
      </div>
    </div>
  );
}
