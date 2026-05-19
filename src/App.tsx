import React, { useState, useEffect } from "react";
import { PRESET_PERFUMES, DEFAULT_BADGES } from "./data";
import { Perfume, Badge } from "./types";
import { 
  Sparkles, Camera, Upload, Scale, MapPin, User, MessageSquare, 
  HelpCircle, Compass, ShieldCheck, RefreshCw, Trophy, Flame, Play, Eye, BookOpen, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Import custom sub-components
import WelcomeScreen from "./components/WelcomeScreen";
import ScentQuiz from "./components/ScentQuiz";
import PerfumeDetail from "./components/PerfumeDetail";
import CompareSection from "./components/CompareSection";
import StoresSection from "./components/StoresSection";
import MyProfile from "./components/MyProfile";
import CommunitySection from "./components/CommunitySection";

export default function App() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"discover" | "compare" | "stores" | "profile" | "community">("discover");
  const [userPrefs, setUserPrefs] = useState<string[]>([]);
  const [points, setPoints] = useState(150);
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>(["first_scan"]);
  
  // Scans history / Custom additions
  const [scannedPerfumes, setScannedPerfumes] = useState<Perfume[]>(PRESET_PERFUMES);
  const [selectedPerfumeForDetail, setSelectedPerfumeForDetail] = useState<Perfume | null>(null);

  // Quiz Overlay state
  const [showQuiz, setShowQuiz] = useState(false);

  // File Upload states
  const [dragActive, setDragActive] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<string | null>(null);
  const [selectedImageMime, setSelectedImageMime] = useState<string>("image/jpeg");
  
  // Analysis simulation state
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepMessage, setScanStepMessage] = useState("");
  const [scanError, setScanError] = useState("");
  const [activeNotice, setActiveNotice] = useState("");

  // Restore session from localStorage if present
  useEffect(() => {
    const savedUser = localStorage.getItem("shadha_user");
    const savedPrefs = localStorage.getItem("shadha_prefs");
    const savedPoints = localStorage.getItem("shadha_points");
    const savedUnlockedBadges = localStorage.getItem("shadha_unlocked_badges");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        if (savedPrefs) setUserPrefs(JSON.parse(savedPrefs));
        if (savedPoints) setPoints(parseInt(savedPoints, 10));
        if (savedUnlockedBadges) setUnlockedBadgeIds(JSON.parse(savedUnlockedBadges));
      } catch (e) {
        console.error("Error recovering session:", e);
      }
    }
  }, []);

  const handleLogin = (email: string, name: string) => {
    const newUser = { email, name };
    setUser(newUser);
    localStorage.setItem("shadha_user", JSON.stringify(newUser));
    
    // Automatically trigger scent quiz on very first fresh login to calibrate
    if (userPrefs.length === 0) {
      setTimeout(() => setShowQuiz(true), 600);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUserPrefs([]);
    setPoints(150);
    setUnlockedBadgeIds(["first_scan"]);
    localStorage.removeItem("shadha_user");
    localStorage.removeItem("shadha_prefs");
    localStorage.removeItem("shadha_points");
    localStorage.removeItem("shadha_unlocked_badges");
    setSelectedPerfumeForDetail(null);
    setActiveTab("discover");
  };

  const handleQuizComplete = (prefs: string[]) => {
    setUserPrefs(prefs);
    localStorage.setItem("shadha_prefs", JSON.stringify(prefs));
    
    // Award points
    const newPoints = points + 100;
    setPoints(newPoints);
    localStorage.setItem("shadha_points", newPoints.toString());

    // Unlock badge
    if (!unlockedBadgeIds.includes("oriental_lover") && prefs.includes("شرقي")) {
      const updatedBadges = [...unlockedBadgeIds, "oriental_lover"];
      setUnlockedBadgeIds(updatedBadges);
      localStorage.setItem("shadha_unlocked_badges", JSON.stringify(updatedBadges));
    }

    setShowQuiz(false);
  };

  const handleAddPerfumeToShelf = (perfume: Perfume) => {
    // Adds perfume and increments profile points
    const newPoints = points + 50;
    setPoints(newPoints);
    localStorage.setItem("shadha_points", newPoints.toString());

    if (!unlockedBadgeIds.includes("perfume_collector")) {
      const updated = [...unlockedBadgeIds, "perfume_collector"];
      setUnlockedBadgeIds(updated);
      localStorage.setItem("shadha_unlocked_badges", JSON.stringify(updated));
    }
  };

  // Drag-and-drop helpers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setSelectedImageMime(file.type);
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      if (uploadEvent.target?.result) {
        setSelectedImageFile(uploadEvent.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Triggers image upload analysis
  const runAnalysis = async () => {
    if (!selectedImageFile) return;
    setIsScanning(true);
    setScanError("");
    setActiveNotice("");

    // Fancy log update timers during analysis to look beautifully simulated
    const phrases = [
      "تصفح ملامح الصورة وقارورة العطر...",
      "توليف الأطياف اللونية ونسبة تركيز السائل...",
      "تحليل الانعكاس البصري لشعار الماركة الفاخرة...",
      "ضبط وتخمين النوتات العليا والوسطى...",
      "التواصل مع مستشار الذكاء الاصطناعي شذى..."
    ];

    let currentStep = 0;
    setScanStepMessage(phrases[0]);
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < phrases.length) {
        setScanStepMessage(phrases[currentStep]);
      }
    }, 1100);

    try {
      const res = await fetch("/api/perfume/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: selectedImageFile,
          mimeType: selectedImageMime
        })
      });

      const data = await res.json();
      clearInterval(interval);

      if (res.ok && data.success) {
        const resultPerfume: Perfume = data.perfume;
        
        // Add to scanned log so they see it
        setScannedPerfumes([resultPerfume, ...scannedPerfumes]);
        setSelectedPerfumeForDetail(resultPerfume);
        
        // Award points for scanning!
        const newPoints = points + 60;
        setPoints(newPoints);
        localStorage.setItem("shadha_points", newPoints.toString());

        // Unlock 10-scanned badge if history is rich
        if (!unlockedBadgeIds.includes("explorer_10") && scannedPerfumes.length >= 4) {
          const updated = [...unlockedBadgeIds, "explorer_10"];
          setUnlockedBadgeIds(updated);
          localStorage.setItem("shadha_unlocked_badges", JSON.stringify(updated));
        }

        if (data.notice) {
          setActiveNotice(data.notice);
        }

        // Clean upload state
        setSelectedImageFile(null);
      } else {
        setScanError(data.error || "عذراً، فشل الذكاء الاصطناعي في تمييز القارورة حالياً.");
      }
    } catch (err) {
      clearInterval(interval);
      setScanError("حدث خطأ تقني في تأمين الاتصال المحاكٍ بالخارج.");
    } finally {
      setIsScanning(false);
    }
  };

  // Trigger quick test scan based on demo samples
  const triggerSampleDemo = async (presetId: string) => {
    setIsScanning(true);
    setScanError("");
    setActiveNotice("");

    const phrases = [
      "تحميل زجاجة العينة المختارة...",
      "تحليل الهيكل الزجاجي والنوتات العليا الافتراضية...",
      "استخلاص المكونات والأسعار المتاجر القريبة...",
      "بناء نموذج العطور المشابهة بدقة عيارية..."
    ];

    let currentStep = 0;
    setScanStepMessage(phrases[0]);
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < phrases.length) {
        setScanStepMessage(phrases[currentStep]);
      }
    }, 1000);

    try {
      const res = await fetch("/api/perfume/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presetId })
      });

      const data = await res.json();
      clearInterval(interval);

      if (res.ok && data.success) {
        setSelectedPerfumeForDetail(data.perfume);
        
        // Give 20 test points
        const newPoints = points + 20;
        setPoints(newPoints);
        localStorage.setItem("shadha_points", newPoints.toString());
      } else {
        setScanError("فشل تحميل عينة التجربة.");
      }
    } catch (err) {
      clearInterval(interval);
      setScanError("خطأ في جلب بيانات العينة.");
    } finally {
      setIsScanning(false);
    }
  };

  // Navigates directly to similar perfume page
  const handleSelectSimilar = (name: string, brand: string) => {
    // Look up if we have preset match
    const found = PRESET_PERFUMES.find(p => p.name.includes(name) || name.includes(p.name));
    if (found) {
      setSelectedPerfumeForDetail(found);
    } else {
      // create a cute temporary profile
      const tempPerfume: Perfume = {
        id: "similar-" + Date.now(),
        name,
        brand,
        englishName: name,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400",
        category: "شرقي - زهري",
        notes: {
          top: ["دهن العود", "الياسمين"],
          middle: ["الزعفران", "الورود الندية"],
          base: ["العنبر الأسود", "المسك الفاخر"]
        },
        description: "عطر فريد من نوعه مكلل بالثقة والهدوء، جرى تركيبه بعناية ليماثل في خواصه ونوتاته العطر الأصلي بدقة متناهية.",
        ingredients: ["كحول", "ماء عطر", "زيوت تجميلية"],
        expectedDuration: "8 ساعات ثبات ممتاز",
        rating: 4.6,
        ratingsCount: 420,
        reviewTips: "بخه بعد الاستحمام مباشرة وقبل ارتداء الملابس للحصول على رائحة متفتحة ومبهجة طوال المساء.",
        stores: [
          { name: "سيفورا (Sephora)", price: 480, link: "https://www.sephora.com", inStock: true, rating: 4.8 },
          { name: "أمازون (Amazon)", price: 440, link: "https://www.amazon.sa", inStock: true, rating: 4.6 }
        ],
        similarPerfumes: []
      };
      setSelectedPerfumeForDetail(tempPerfume);
    }
  };

  if (!user) {
    return <WelcomeScreen onLoginSuccess={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#2D2D2D] flex flex-col justify-between selection:bg-[#D4AF37]/35 selection:text-[#1A1A1A] relative">
      <div className="absolute top-0 right-0 left-0 h-[450px] bg-radial-glow pointer-events-none" />

      {/* LUXURY MAIN HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#E5E1DA] px-6 py-4 flex justify-between items-center flex-row-reverse shadow-sm">
        <div className="flex items-center gap-2.5 flex-row-reverse cursor-pointer">
          <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-serif text-2xl select-none shadow-sm">
            ش
          </div>
          <h1 onClick={() => { setSelectedPerfumeForDetail(null); setActiveTab("discover"); }} className="text-xl font-bold tracking-widest font-display text-[#1A1A1A] uppercase select-none">
            شَذى | Aura
          </h1>
        </div>

        {/* Header Badges Points Status */}
        <div className="flex items-center gap-4 text-right">
          <button
            onClick={() => setActiveTab("profile")}
            className="flex items-center gap-1.5 py-2 px-4 rounded-full bg-[#F0EEEA] border border-[#E5E1DA] hover:bg-[#E5E1DA]/60 text-[#1A1A1A] transition text-[11px] font-bold cursor-pointer flex-row-reverse"
          >
            <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{points} نقطة مكافأة</span>
          </button>
        </div>
      </header>

      {/* CORE WORKSPACE SCREEN CONTAINER */}
      <main className="flex-1 pb-24 z-10">
        
        {/* Scent Quiz Overlay if requested */}
        {showQuiz && (
          <div className="fixed inset-0 bg-[#F9F8F6]/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-xl text-center">
              <button
                onClick={() => setShowQuiz(false)}
                className="mb-4 text-xs text-[#8E8E8E] hover:text-[#1A1A1A] transition cursor-pointer"
              >
                إغلاق مؤقت وتأجيل الفحص
              </button>
              <ScentQuiz 
                onQuizComplete={handleQuizComplete} 
                onNavigateToPerfume={(perfume) => { setSelectedPerfumeForDetail(perfume); setShowQuiz(false); }} 
              />
            </div>
          </div>
        )}

        {/* Perfume Detail Modal overlay directly if selected */}
        {selectedPerfumeForDetail ? (
          <PerfumeDetail
            perfume={selectedPerfumeForDetail}
            onBack={() => setSelectedPerfumeForDetail(null)}
            onSelectSimilar={handleSelectSimilar}
            onAddPerfumeToShelf={handleAddPerfumeToShelf}
          />
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === "discover" && (
              <motion.div
                key="discover"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="w-full max-w-4xl mx-auto px-4 py-8"
              >
                
                {/* Visual Welcome Banner */}
                <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#E5E1DA] text-right space-y-4 mb-8 relative overflow-hidden shadow-sm">
                  <span className="bg-[#D4AF37] text-white font-bold py-1 px-3 rounded-full text-[10px] uppercase inline-block font-display tracking-wider">رادار عطور شذى المطور</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] font-display">اكتشف لغة عطرك بالذكاء الاصطناعي</h2>
                  <p className="text-[#555555] text-xs md:text-sm font-light leading-relaxed max-w-2xl">
                    التقط قنينة العطور أو ارفع صورتها الجاهزة، وسيقوم النموذج بتحليل الزجاجة فورياً ليزودك بالماركة، السعر، النوتات والبدائل العطرية المشابهة.
                  </p>

                  <div className="pt-2 flex gap-4 justify-end flex-wrap">
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="py-2 px-4 rounded-xl bg-[#D4AF37] text-white hover:bg-[#b38f24] text-[11px] font-semibold transition cursor-pointer shadow-sm"
                    >
                      اختبر واستكشف هرمك المفضل 🌸
                    </button>
                    <button
                      onClick={() => setActiveTab("community")}
                      className="py-2 px-4 rounded-xl bg-[#F0EEEA] border border-[#E5E1DA] text-[#555555] hover:text-[#1A1A1A] text-[11px] font-semibold transition cursor-pointer"
                    >
                      تصفّح مجلة عِلم العطور 📖
                    </button>
                  </div>
                </div>

                {/* Main Scanning interactive block */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left panel: Upload Zone - takes 7/12 */}
                  <div className="md:col-span-7 space-y-5">
                    
                    {/* File Upload Zone */}
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`relative rounded-3xl border-2 border-dashed p-8 text-center transition-all flex flex-col items-center justify-center cursor-pointer min-h-[280px] ${dragActive ? "border-[#D4AF37] bg-[#D4AF37]/5 shadow-sm" : "border-[#E5E1DA] bg-white hover:border-[#D4AF37]/60 hover:bg-[#FDFCFB]"}`}
                    >
                      <input
                        id="file-perfume-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {/* Scanning Visual line */}
                      {isScanning && (
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center rounded-3xl">
                          {/* Animated laser scan bar */}
                          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_12px_rgba(212,175,55,0.5)] animate-scan" />
                          
                          <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#F9F8F6] animate-spin mb-4 text-[#D4AF37]">
                            <Sparkles className="w-5 h-5" />
                          </div>

                          <span className="text-xs font-bold text-[#D4AF37] mb-1.5 uppercase tracking-wide font-display">جاري المسح الراداري الذكي</span>
                          <span className="text-[11px] text-[#555555] font-light select-none">{scanStepMessage}</span>
                        </div>
                      )}

                      {/* Standard Idle Content */}
                      {!selectedImageFile ? (
                        <label htmlFor="file-perfume-upload" className="cursor-pointer space-y-4 flex flex-col items-center">
                          <div className="w-16 h-16 rounded-3xl bg-[#F9F8F6] border border-[#E5E1DA] flex items-center justify-center shadow-sm text-[#D4AF37]">
                            <Camera className="w-7 h-7" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1A1A1A] font-display">اسحب صورة علبة العطر هنا</p>
                            <p className="text-[#8E8E8E] text-xs mt-1.5 font-light">أو انقر لتصفح ملفات جهازك أو الكاميرا الفورية</p>
                          </div>
                          <span className="inline-block py-1.5 px-4 bg-[#F9F8F6] text-[#D4AF37] text-[10px] rounded-lg border border-[#E5E1DA]">
                            صيغ JPG, PNG, WEBP مدعومة
                          </span>
                        </label>
                      ) : (
                        <div className="space-y-4 w-full">
                          <img
                            src={selectedImageFile}
                            alt="Preview uploaded"
                            className="w-32 h-32 object-cover rounded-2xl mx-auto border border-[#E5E1DA] shadow-sm"
                          />
                          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 justify-center">
                            <ShieldCheck className="w-4 h-4" />
                            <span>تم تحميل زجاجتك بنجاح ومستعدة للفحص</span>
                          </p>

                          <div className="flex gap-2.5 justify-center">
                            <button
                              id="btn-clear-upload"
                              onClick={() => setSelectedImageFile(null)}
                              className="py-2.5 px-4 rounded-xl border border-[#E5E1DA] hover:bg-[#F9F8F6] text-[#8E8E8E] text-xs transition cursor-pointer"
                            >
                              إلغاء الصورة
                            </button>
                            <button
                              id="btn-run-analysis"
                              onClick={runAnalysis}
                              className="py-2.5 px-6 rounded-xl bg-[#D4AF37] hover:bg-[#b38f24] text-white font-bold text-xs shadow-sm hover:scale-[1.01] transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>ابدأ تحليل الصورة الآن (+60نقطة)</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {scanError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs text-right flex items-center gap-2 flex-row-reverse">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{scanError}</span>
                      </div>
                    )}

                    {activeNotice && (
                      <div className="p-3 bg-[#FAF8F5] border border-[#D4AF37]/30 text-[#4a3b0c] rounded-xl text-xs text-right">
                        {activeNotice}
                      </div>
                    )}
                  </div>

                  {/* Right panel: Preset click options for fast test runs - takes 5/12 */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="p-5 rounded-3xl bg-white border border-[#E5E1DA] text-right space-y-4 shadow-sm">
                      <div>
                        <h4 className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 justify-end font-display">
                          <span>عينات جاهزة للفحص السريع</span>
                          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        </h4>
                        <p className="text-[10px] text-[#8E8E8E] mt-1 leading-normal">
                          لا تملك صورة قريبة؟ انقر على أي عطر عينة أدناه لمحاكاة تجربة المسح الذكي الفعلي فوراً!
                        </p>
                      </div>

                      {/* Sample presets layout */}
                      <div className="grid grid-cols-2 gap-3.5">
                        {PRESET_PERFUMES.map(p => (
                          <button
                            id={`btn-sample-${p.id}`}
                            key={p.id}
                            disabled={isScanning}
                            onClick={() => triggerSampleDemo(p.id)}
                            className="bg-[#FDFCFB] hover:bg-[#F9F8F6] border border-[#F0EEEA] hover:border-[#D4AF37] rounded-2xl p-2.5 text-right flex flex-col gap-2 transition duration-300 cursor-pointer disabled:opacity-40"
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full aspect-[4/3] object-cover rounded-xl border border-[#E5E1DA]"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <p className="text-[9px] text-[#D4AF37] font-semibold mb-0.5">{p.brand.split(" ")[0]}</p>
                              <h5 className="text-[11px] font-bold text-[#1A1A1A] truncate">{p.name}</h5>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* History list of scanned perfumes on search page */}
                <div className="mt-12 space-y-4 text-right">
                  <h3 className="text-lg font-bold font-display text-[#1A1A1A]">العطور المفحوصة والمكتشفة مؤخراً</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {scannedPerfumes.slice(0, 3).map((p, idx) => (
                      <div 
                        key={idx}
                        className="bg-white border border-[#E5E1DA] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-40 object-cover border-b border-[#F0EEEA]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="p-4 text-right">
                          <span className="text-[9px] text-[#D4AF37] font-bold uppercase">{p.brand}</span>
                          <h4 className="text-sm font-bold text-[#1A1A1A] truncate my-1 font-display">{p.name}</h4>
                          <p className="text-[10px] text-[#555555] line-clamp-2 leading-relaxed">{p.category}</p>
                          
                          <div className="mt-4 pt-3 border-t border-[#F0EEEA] flex justify-between items-center flex-row-reverse">
                            <span className="text-xs text-[#D4AF37] font-bold">{p.stores[0]?.price} ر.س</span>
                            <button
                              id={`btn-view-scanned-${p.id}`}
                              onClick={() => setSelectedPerfumeForDetail(p)}
                              className="py-1 px-3 bg-white border border-[#E5E1DA] text-[#555555] hover:text-[#D4AF37] hover:border-[#D4AF37] text-[10px] rounded-lg transition cursor-pointer"
                            >
                              تفاصيل كاملة
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {activeTab === "compare" && (
              <CompareSection
                onNavigateToPerfume={(perfume) => setSelectedPerfumeForDetail(perfume)}
              />
            )}

            {activeTab === "stores" && (
              <StoresSection />
            )}

            {activeTab === "community" && (
              <CommunitySection />
            )}

            {activeTab === "profile" && (
              <MyProfile 
                user={user}
                userPrefs={userPrefs}
                points={points}
                unlockedBadgeIds={unlockedBadgeIds}
                onLogout={handleLogout}
                onTriggerQuiz={() => setShowQuiz(true)}
              />
            )}
          </AnimatePresence>
        )}
      </main>

      {/* LUXURY AMINO BOTTOM NAVBAR */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-[#E5E1DA] py-3.5 z-40 max-w-xl mx-auto rounded-t-3xl shadow-sm flex justify-around items-center">
        {/* Discover Button */}
        <button
          id="tab-discover"
          onClick={() => { setSelectedPerfumeForDetail(null); setActiveTab("discover"); }}
          className={`flex flex-col items-center gap-1 transition-all duration-300 cursor-pointer ${activeTab === "discover" ? "text-[#D4AF37] scale-105" : "text-[#8E8E8E] hover:text-[#1A1A1A]"}`}
        >
          <Camera className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold font-display">اكتشاف</span>
        </button>

        {/* Compare Button */}
        <button
          id="tab-compare"
          onClick={() => { setSelectedPerfumeForDetail(null); setActiveTab("compare"); }}
          className={`flex flex-col items-center gap-1 transition-all duration-300 cursor-pointer ${activeTab === "compare" ? "text-[#D4AF37] scale-105" : "text-[#8E8E8E] hover:text-[#1A1A1A]"}`}
        >
          <Scale className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold font-display">مقارنة</span>
        </button>

        {/* Map Stores button */}
        <button
          id="tab-stores"
          onClick={() => { setSelectedPerfumeForDetail(null); setActiveTab("stores"); }}
          className={`flex flex-col items-center gap-1 transition-all duration-300 cursor-pointer ${activeTab === "stores" ? "text-[#D4AF37] scale-105" : "text-[#8E8E8E] hover:text-[#1A1A1A]"}`}
        >
          <MapPin className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold font-display">متاجر</span>
        </button>

        {/* Community Button */}
        <button
          id="tab-community"
          onClick={() => { setSelectedPerfumeForDetail(null); setActiveTab("community"); }}
          className={`flex flex-col items-center gap-1 transition-all duration-300 cursor-pointer ${activeTab === "community" ? "text-[#D4AF37] scale-105" : "text-[#8E8E8E] hover:text-[#1A1A1A]"}`}
        >
          <MessageSquare className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold font-display">المجتمع</span>
        </button>

        {/* Profile Button */}
        <button
          id="tab-profile"
          onClick={() => { setSelectedPerfumeForDetail(null); setActiveTab("profile"); }}
          className={`flex flex-col items-center gap-1 transition-all duration-300 cursor-pointer ${activeTab === "profile" ? "text-[#D4AF37] scale-105" : "text-[#8E8E8E] hover:text-[#1A1A1A]"}`}
        >
          <User className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold font-display">حسابي</span>
        </button>
      </nav>
    </div>
  );
}
