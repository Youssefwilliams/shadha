import React, { useState } from "react";
import { Badge, PerfumeCollection, UserProfile, Perfume } from "../types";
import { DEFAULT_BADGES, PRESET_PERFUMES } from "../data";
import { Award, FolderHeart, Bell, Settings, LogOut, ChevronRight, Compass, Shield, Users, Trophy, Sparkles, FolderPlus, Trash2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MyProfileProps {
  user: { email: string; name: string } | null;
  userPrefs: string[];
  points: number;
  unlockedBadgeIds: string[];
  onLogout: () => void;
  onTriggerQuiz: () => void;
}

export default function MyProfile({ user, userPrefs, points, unlockedBadgeIds, onLogout, onTriggerQuiz }: MyProfileProps) {
  const [badges, setBadges] = useState<Badge[]>(
    DEFAULT_BADGES.map(badge => ({
      ...badge,
      unlocked: unlockedBadgeIds.includes(badge.id) || badge.unlocked
    }))
  );

  const [collections, setCollections] = useState<PerfumeCollection[]>([
    {
      id: "coll-1",
      name: "مجموعتي الشتوية الغنية",
      description: "عطور ثقيلة تحتوي على نوتات دافئة مثل العود والجلود والفانيليا.",
      perfumes: [PRESET_PERFUMES[2], PRESET_PERFUMES[0]] // Tom ford oud + chanel bleu
    },
    {
      id: "coll-2",
      name: "عطور رغبات الشراء 2026",
      description: "عطور جربتها في سيفورا وأنوي شراءها قريباً.",
      perfumes: [PRESET_PERFUMES[3]] // Libre
    }
  ]);

  const [newCollName, setNewCollName] = useState("");
  const [newCollDesc, setNewCollDesc] = useState("");
  const [showCollForm, setShowCollForm] = useState(false);

  // Reminders / Preferences
  const [refillReminder, setRefillReminder] = useState(true);
  const [salesReminder, setSalesReminder] = useState(true);
  const [communityAlerts, setCommunityAlerts] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollName.trim()) return;

    const newColl: PerfumeCollection = {
      id: "usercoll-" + Date.now(),
      name: newCollName,
      description: newCollDesc || "رف عطور مخصص لاقتناء التوليفات الفاخرة.",
      perfumes: [PRESET_PERFUMES[Math.floor(Math.random() * PRESET_PERFUMES.length)]] // pre-seed with one random perfume to look fantastic
    };

    setCollections([...collections, newColl]);
    setNewCollName("");
    setNewCollDesc("");
    setShowCollForm(false);
    triggerToast();
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const deleteCollection = (id: string) => {
    setCollections(prev => prev.filter(c => c.id !== id));
  };

  // Gamification Level calculations
  const nextLevelPoints = 500;
  const progressPercent = Math.min(100, Math.floor((points / nextLevelPoints) * 100));

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 relative">
      
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 py-3.5 px-6 rounded-2xl bg-[#D4AF37] text-white font-semibold text-xs shadow-md flex items-center gap-2 flex-row-reverse"
          >
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>رائع! أنشأت رفك العطري الجديد وكسبت +50 نقطة مكافأة!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Welcome Block */}
      <div className="bg-white border border-[#E5E1DA] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 mb-8 text-right shadow-sm">
        
        {/* Profile statistics right hand */}
        <div className="flex items-center gap-4 flex-row-reverse w-full md:w-auto">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#C29D2C] flex items-center justify-center text-3xl text-white font-bold uppercase shadow-sm font-display">
            {user?.name?.slice(0, 1) || "ע"}
          </div>
          <div>
            <div className="flex items-center gap-1.5 justify-end">
              <span className="text-[10px] bg-[#FAF8F5] text-[#D4AF37] border border-[#D4AF37]/35 rounded-full px-2 py-0.5 font-bold select-none font-sans">عطّار ذهبي</span>
              <h3 className="text-xl font-bold text-[#1A1A1A] font-display leading-none">{user?.name || "عاشق الشذى"}</h3>
            </div>
            <p className="text-[#8E8E8E] text-xs mt-1.5 font-sans">{user?.email || "guest@shatha.com"}</p>
            
            {/* Preference Chips */}
            <div className="mt-3 flex gap-1.5 justify-end flex-wrap">
              {userPrefs.length > 0 ? (
                userPrefs.map((pref, i) => (
                  <span key={i} className="py-0.5 px-2.5 rounded-md bg-[#FAF8F5] border border-[#E5E1DA] text-[9px] text-[#D4AF37] font-semibold font-sans">
                    {pref}
                  </span>
                ))
              ) : (
                <button 
                  onClick={onTriggerQuiz}
                  className="text-[9px] text-white bg-[#D4AF37] hover:bg-[#C29D2C] py-0.5 px-2.5 rounded-md transition border-none cursor-pointer font-bold font-sans shadow-sm"
                >
                  افحص بصمتك العطرية الآن
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Gamified Points Balance on left */}
        <div className="w-full md:w-64 bg-[#FAF8F5] border border-[#E5E1DA] p-4 rounded-2xl flex flex-col">
          <div className="flex justify-between items-center mb-2 flex-row-reverse text-xs">
            <span className="font-bold text-[#D4AF37] flex items-center gap-1 font-sans">
              <Trophy className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]/15" />
              <span>{points} نقطة شذى</span>
            </span>
            <span className="text-[#8E8E8E] font-bold text-[10px] font-sans">المستوى 2</span>
          </div>

          {/* Progress bar to Level 3 */}
          <div className="w-full bg-[#F0EEEA] h-2 rounded-full overflow-hidden mb-2">
            <div className="bg-[#D4AF37] h-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>

          <span className="text-[10px] text-[#8E8E8E] text-right font-sans">متبقي {nextLevelPoints - points} نقطة للترقية إلى خبير عطور الفئة الملكية</span>
        </div>
      </div>

      {/* Main Grid: Left Side (Reminders / Shelves) & Right Side (Badges achievements) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Grid: Shelves & Settings */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Custom Perfume Shelves */}
          <div className="bg-white border border-[#E5E1DA] rounded-3xl p-5 md:p-6 text-right shadow-sm">
            <div className="flex justify-between items-center mb-5 flex-row-reverse">
              <h4 className="text-base font-bold text-[#1A1A1A] flex items-center gap-2 font-display">
                <FolderHeart className="w-4 h-4 text-[#D4AF37]" />
                <span>رفوف ومجموعات عطورك الخاصة</span>
              </h4>
              <button
                id="btn-add-collection"
                onClick={() => setShowCollForm(!showCollForm)}
                className="text-[10px] font-bold text-[#D4AF37] hover:text-[#1A1A1A] flex items-center gap-1 flex-row-reverse cursor-pointer font-sans"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>أنشئ رف جديد</span>
              </button>
            </div>

            {/* Collection creation form */}
            {showCollForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-5 p-4 border border-[#E5E1DA] bg-[#FAF8F5] rounded-2xl"
              >
                <form onSubmit={handleCreateCollection} className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-[#555555] mb-1 font-semibold">اسم الرف العطري</label>
                    <input
                      id="input-collection-name"
                      type="text"
                      required
                      value={newCollName}
                      onChange={(e) => setNewCollName(e.target.value)}
                      placeholder="مثال: عطور المقابلات الوظيفية الكلاسيكية"
                      className="w-full py-2 px-3 bg-white border border-[#E5E1DA] text-xs text-[#2D2D2D] rounded-lg focus:outline-none focus:border-[#D4AF37] text-right"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#555555] mb-1 font-semibold">شرح مفصل للرف</label>
                    <input
                      id="input-collection-desc"
                      type="text"
                      value={newCollDesc}
                      onChange={(e) => setNewCollDesc(e.target.value)}
                      placeholder="صف شعور الرف أو مكوناته المميزة"
                      className="w-full py-2 px-3 bg-white border border-[#E5E1DA] text-xs text-[#2D2D2D] rounded-lg focus:outline-none focus:border-[#D4AF37] text-right"
                    />
                  </div>
                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCollForm(false)}
                      className="py-1.5 px-3 rounded-md border border-[#E5E1DA] text-[10px] text-[#555555] hover:text-[#1A1A1A] hover:bg-white cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      id="btn-submit-collection"
                      type="submit"
                      className="py-1.5 px-4 rounded-md bg-[#D4AF37] text-white font-semibold text-[10px] hover:bg-[#C29D2C] cursor-pointer shadow-sm"
                    >
                      حفظ الرف العطري (+50 نقطة)
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Shelves contents list */}
            <div className="space-y-4">
              {collections.map(coll => (
                <div key={coll.id} className="p-4 bg-white border border-[#E5E1DA] rounded-2xl hover:border-[#D4AF37]/60 transition-colors">
                  <div className="flex justify-between items-start flex-row-reverse mb-3">
                    <div>
                      <h5 className="text-xs font-bold text-[#1A1A1A] font-display">{coll.name}</h5>
                      <p className="text-[10px] text-[#555555] mt-1 font-sans">{coll.description}</p>
                    </div>
                    <button
                      onClick={() => deleteCollection(coll.id)}
                      className="text-[#8E8E8E] hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50/50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Micro list of perfumes registered inside this shelf */}
                  <div className="flex gap-2.5 overflow-x-auto py-1 justify-end">
                    {coll.perfumes.map((perfume, pIdx) => (
                      <div key={pIdx} className="w-12 h-12 rounded-lg bg-white border border-[#E5E1DA] overflow-hidden flex-shrink-0 relative group">
                        <img 
                          src={perfume.image} 
                          alt={perfume.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute inset-0 bg-black/65 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-white text-center p-1 leading-none font-sans font-semibold truncate">
                          {perfume.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Notifications Config */}
          <div className="bg-white border border-[#E5E1DA] rounded-3xl p-5 md:p-6 text-right space-y-4 shadow-sm">
            <h4 className="text-base font-bold text-[#1A1A1A] flex items-center gap-2 font-display justify-end">
              <Bell className="w-4 h-4 text-[#D4AF37]" />
              <span>إشعارات المراقبة وإعادة التعبئة</span>
            </h4>
            <p className="text-[#555555] text-[10px] leading-relaxed font-sans">
              قم بجدولة المذكرات الرقمية وتقارير التعبئة لتبقى هالتك العطرية مفعمة بالحياة دائماً.
            </p>

            <div className="space-y-3.5 pt-2">
              <label className="flex items-center gap-3 justify-end cursor-pointer font-light select-none font-sans">
                <span className="text-xs text-[#2D2D2D]">مذكّر ذكي بوقت إعادة شراء زجاجة عطر بعد مرور 3 أشهر من الفحص</span>
                <input
                  id="checkbox-refill"
                  type="checkbox"
                  checked={refillReminder}
                  onChange={(e) => setRefillReminder(e.target.checked)}
                  className="w-4 h-4 accent-[#D4AF37] border border-[#E5E1DA] rounded bg-white"
                />
              </label>

              <label className="flex items-center gap-3 justify-end cursor-pointer font-light select-none font-sans">
                <span className="text-xs text-[#2D2D2D]">أعلمني عند صدور كوبونات خصم أو تخفيضات في المتاجر القريبة</span>
                <input
                  id="checkbox-sales"
                  type="checkbox"
                  checked={salesReminder}
                  onChange={(e) => setSalesReminder(e.target.checked)}
                  className="w-4 h-4 accent-[#D4AF37] border border-[#E5E1DA] rounded bg-white"
                />
              </label>

              <label className="flex items-center gap-3 justify-end cursor-pointer font-light select-none font-sans">
                <span className="text-xs text-[#2D2D2D]">أرسل لي تنبيهاً عندما يشارك عشاق مجتمع العطور مراجعة لزجاجاتي المفضلة</span>
                <input
                  id="checkbox-alerts"
                  type="checkbox"
                  checked={communityAlerts}
                  onChange={(e) => setCommunityAlerts(e.target.checked)}
                  className="w-4 h-4 accent-[#D4AF37] border border-[#E5E1DA] rounded bg-white"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Grid: Badges/Achievements and configuration buttons */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Unlocked Badges Panel */}
          <div className="bg-white border border-[#E5E1DA] rounded-3xl p-5 md:p-6 text-right shadow-sm">
            <div className="flex justify-between items-center mb-5 flex-row-reverse">
              <h4 className="text-base font-bold text-[#1A1A1A] flex items-center gap-2 font-display">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>شارات الإنجاز والخبرة العطرية</span>
              </h4>
              <span className="text-[10px] text-[#8E8E8E] font-semibold font-sans">{badges.filter(b => b.unlocked).length} من {badges.length} نشطة</span>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {badges.map(badge => (
                <div 
                  key={badge.id}
                  className={`p-3.5 border rounded-2xl text-center flex flex-col items-center justify-center transition-all duration-350 select-none ${badge.unlocked ? "bg-[#FAF8F5] border-[#D4AF37]/30 shadow-none" : "bg-zinc-50 border gap-0.5 border-[#FAF8F5] opacity-35 grayscale"}`}
                >
                  <span className={`text-3xl mb-2 w-12 h-12 flex items-center justify-center rounded-xl bg-white ${badge.unlocked ? "border border-[#D4AF37]/20 shadow-inner" : "border border-[#E5E1DA]/40"}`}>
                    {badge.icon}
                  </span>
                  <p className={`text-xs font-bold font-display leading-tight mb-1 ${badge.unlocked ? "text-[#D4AF37]" : "text-[#8E8E8E]"}`}>
                    {badge.name}
                  </p>
                  <p className="text-[9px] text-[#555555] leading-relaxed font-light mt-1 font-sans">
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Scent Test Relaunch Block */}
          <div className="bg-[#FAF8F5] border border-[#E5E1DA] rounded-3xl p-5 md:p-6 text-center space-y-3 shadow-sm">
            <h5 className="text-sm font-bold text-[#1A1A1A] font-serif">لم تلائمك التوصيات التلقائية الحالية؟</h5>
            <p className="text-[#555555] text-[10px] leading-relaxed max-w-xs mx-auto font-sans">
              أعد تشخيص الهرم الأنثروبولوجي العطري الخاص بك لإعادة توجيه واكتساب اقتراحات جديدة تماماً.
            </p>
            <button
              onClick={onTriggerQuiz}
              className="py-2.5 px-5 rounded-xl bg-[#D4AF37] hover:bg-[#C29D2C] text-white text-xs font-bold transition duration-300 font-sans shadow-sm cursor-pointer"
            >
              تشخيص البصمة العطرية مجدداً
            </button>
          </div>

          {/* Account configurations & Logout */}
          <div className="bg-white border border-[#E5E1DA] rounded-3xl p-4 flex flex-col gap-2 shadow-sm">
            <button
              id="btn-logout"
              onClick={onLogout}
              className="py-2.5 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50/50 text-xs font-semibold select-none flex items-center justify-center gap-2 transition duration-300 cursor-pointer font-sans"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل خروجك من الحساب</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
