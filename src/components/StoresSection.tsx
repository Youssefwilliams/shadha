import React, { useState } from "react";
import { MOCK_STORES_MAP } from "../data";
import { MapPin, Navigation, Phone, Search, SlidersHorizontal, Tag, Star, Gift, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function StoresSection() {
  const [selectedCity, setSelectedCity] = useState<string>("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStoreId, setActiveStoreId] = useState<string | null>("shop-1");

  const cities = ["الكل", "الرياض", "جدة", "مكة المكرمة"];

  const filteredStores = MOCK_STORES_MAP.filter(store => {
    const matchesCity = selectedCity === "الكل" || store.city === selectedCity;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          store.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const activeStore = MOCK_STORES_MAP.find(s => s.id === activeStoreId) || MOCK_STORES_MAP[0];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="flex flex-col items-center justify-center text-center mb-10">
        <div className="w-12 h-12 bg-[#FAF8F5] border border-[#D4AF37]/35 text-[#D4AF37] rounded-full flex items-center justify-center shadow-sm mb-3 animate-pulse">
          <MapPin className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold font-display text-[#1A1A1A] font-serif mb-2">متاجر العطور الفاخرة</h2>
        <p className="text-[#555555] text-xs max-w-sm">
          ابحث عن فروع سيفورا ومتاجر العود الرسمية القريبة منك، واحصل على عروض شراء وخصومات حصرية.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Custom Virtual Map simulation - taking 5/12 grid */}
        <div className="lg:col-span-5 bg-white border border-[#E5E1DA] rounded-3xl p-5 shadow-sm overflow-hidden h-[460px] flex flex-col relative">
          <div className="flex justify-between items-center mb-4 flex-row-reverse">
            <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 font-display">
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>مخطط المواقع العينات</span>
            </span>
            <span className="text-[10px] text-[#8E8E8E] font-mono">Simulated Radar Map</span>
          </div>

          {/* Interactive Styled Map Grid Mockup */}
          <div className="flex-1 bg-[#F9F8F6] border border-[#E5E1DA] rounded-2xl relative overflow-hidden flex items-center justify-center">
            {/* Grid Line patterns */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E1DA_1px,transparent_1px),linear-gradient(to_bottom,#E5E1DA_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
            
            {/* Simulated circular radar wave */}
            <div className="absolute w-64 h-64 border border-[#D4AF37]/20 rounded-full animate-ping pointer-events-none" />
            <div className="absolute w-44 h-44 border border-[#E5E1DA] rounded-full pointer-events-none" />
            <div className="absolute w-24 h-24 border border-[#E5E1DA] rounded-full pointer-events-none" />

            {/* Simulated Pins scattered around based on active stores coordinates */}
            {filteredStores.map(store => {
              // Calculate a simulated coordinate ratio offset
              const latSeed = (store.coordinates.lat - 21) * 20;
              const lngSeed = (store.coordinates.lng - 39) * 12;
              const leftOffset = Math.max(10, Math.min(90, 50 + lngSeed));
              const topOffset = Math.max(10, Math.min(90, 50 - latSeed));

              const isSelected = store.id === activeStoreId;

              return (
                <button
                  key={store.id}
                  onClick={() => setActiveStoreId(store.id)}
                  style={{ left: `${leftOffset}%`, top: `${topOffset}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ring glow */}
                    <div className={`absolute w-8 h-8 rounded-full transition-all duration-300 ${isSelected ? "bg-[#D4AF37]/30 scale-125" : "bg-zinc-300/0 group-hover:bg-[#D4AF37]/10"}`} />
                    
                    {/* Pin element */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${isSelected ? "bg-[#D4AF37] border-white text-white scale-110 shadow-sm" : "bg-white border-[#D4AF37] text-[#D4AF37] group-hover:bg-[#FAF8F5]"}`}>
                      <MapPin className="w-3.5 h-3.5 fill-current" />
                    </div>

                    {/* Miniature Tooltip on hover */}
                    <span className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1A1A1A] text-white text-[9px] px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20 font-display">
                      {store.name} ({store.distance})
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Bottom Floating Map Details Card */}
            <AnimatePresence mode="wait">
              {activeStore && (
                <motion.div
                  key={activeStore.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-3 inset-x-3 bg-white border border-[#E5E1DA] p-3 rounded-xl flex items-center gap-3 text-right shadow-md"
                >
                  <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#D4AF37]/20 text-[#D4AF37]">
                    <Navigation className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[12px] font-bold text-[#1A1A1A] truncate font-display">{activeStore.name}</h4>
                    <p className="text-[10px] text-[#8E8E8E] truncate mt-0.5">{activeStore.address}</p>
                    <div className="mt-1 flex gap-2 items-center flex-row-reverse text-[9px]">
                      <span className="text-[#D4AF37] font-bold">{activeStore.distance}</span>
                      <span className="text-[#E5E1DA]">•</span>
                      <span className="text-[#8E8E8E]">{activeStore.city}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Search and Listings directory - taking 7/12 grid */}
        <div className="lg:col-span-7 space-y-4">
          {/* Controls Bar */}
          <div className="bg-white border border-[#E5E1DA] rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1 text-right">
                <span className="absolute inset-y-0 right-3 flex items-center text-[#8E8E8E]">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  id="input-store-search"
                  type="text"
                  placeholder="ابحث عن اسم المتجر أو عنوانه..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2.5 pl-4 pr-10 text-xs bg-white border border-[#E5E1DA] rounded-xl text-[#2D2D2D] placeholder-[#8E8E8E] focus:outline-none focus:border-[#D4AF37] text-right"
                />
              </div>

              {/* City selector filters */}
              <div className="flex gap-1.5 overflow-x-auto py-1 scrollbar-none items-center justify-end">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${selectedCity === city ? "bg-[#D4AF37] text-white font-bold" : "bg-white border border-[#E5E1DA] text-[#555555] hover:text-[#D4AF37]"}`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Directory Listings */}
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            <AnimatePresence>
              {filteredStores.length > 0 ? (
                filteredStores.map(store => {
                  const isActive = store.id === activeStoreId;
                  return (
                    <motion.div
                      key={store.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl border transition-all duration-300 text-right cursor-pointer ${isActive ? "bg-[#FAF8F5] border-[#D4AF37] shadow-sm" : "bg-white border-[#E5E1DA] hover:border-[#D4AF37]/60 hover:bg-[#FDFCFB]"}`}
                      onClick={() => setActiveStoreId(store.id)}
                    >
                      <div className="flex justify-between items-start flex-row-reverse mb-2">
                        <div>
                          <h3 className="text-sm font-bold text-[#1A1A1A] font-display flex items-center justify-end gap-1.5">
                            {store.name}
                            {store.hasDiscount && (
                              <span className="text-[9px] bg-red-50 text-red-700 py-0.5 px-2 rounded-full border border-red-200">خصم نشط</span>
                            )}
                          </h3>
                          <p className="text-[10px] text-[#555555] mt-1 font-sans">{store.address}</p>
                        </div>
                        <span className="text-xs text-[#D4AF37] font-bold whitespace-nowrap bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#D4AF37]/10">
                          على بعد {store.distance}
                        </span>
                      </div>

                      {/* Store specific expandable coupons / metadata */}
                      {store.hasDiscount && (
                        <div className="my-3 p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[10px] leading-snug flex items-center gap-2 flex-row-reverse font-sans">
                          <Tag className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{store.discountMessage}</span>
                        </div>
                      )}

                      <div className="mt-3 pt-3 border-t border-[#F0EEEA] flex justify-between items-center flex-row-reverse text-[11px]">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-[#1A1A1A]">{store.rating}</span>
                          <Star className="w-3 fill-[#D4AF37] text-[#D4AF37]" />
                        </div>
                        <div className="flex gap-3">
                          <a
                            href={`tel:${store.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#8E8E8E] hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors cursor-pointer font-mono"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>اتصال {store.phone}</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="p-8 text-center bg-white border border-[#E5E1DA] rounded-2xl text-[#8E8E8E] font-light text-xs">
                  لا توجد فروع عطور مطابقة للفلاتر النشطة حالياً. جرب البحث في الرياض أو جدة.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
