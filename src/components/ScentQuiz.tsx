import React, { useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, Check, Compass, Award, Heart, Wind, Flame } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PRESET_PERFUMES } from "../data";
import { Perfume } from "../types";

interface ScentQuizProps {
  onQuizComplete: (preferences: string[]) => void;
  onNavigateToPerfume: (perfume: Perfume) => void;
}

interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    icon: string;
    note: string;
  }[];
}

export default function ScentQuiz({ onQuizComplete, onNavigateToPerfume }: ScentQuizProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [recommendedPerfumes, setRecommendedPerfumes] = useState<Perfume[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      text: "أي الأجواء الجوية والمواسم تشعرك بالحيوية والراحة؟",
      options: [
        { label: "شمس الصيف المشرقة وهواء البحر المنعش", icon: "☀️", note: "حمضيات" },
        { label: "ليالي الشتاء الباردة أمام مدفأة خشبية", icon: "❄️", note: "خشبي" },
        { label: "ربيع متفتح مليء بالأزهار والورود الندية", icon: "🌸", note: "زهري" },
        { label: "الخريف الهادي بنسماته المحملة بالتوابل والغموض", icon: "🍁", note: "شرقي" }
      ]
    },
    {
      id: 2,
      text: "ما نوع الشخصية والحضور الذي تود أن يصفك الناس به؟",
      options: [
        { label: "كلاسيكي، وقور، ذو هيبة وجاذبية عميقة", icon: "👔", note: "شرقي" },
        { label: "رياضي، مفعم بالنشاط والانتعاش والحرية", icon: "👟", note: "حمضيات" },
        { label: "غامض، دافئ، جذاب ويحث الآخرين على التساؤل", icon: "✨", note: "خشبي" },
        { label: "رقيق، رومانسي، ناعم وهادئ الطباع", icon: "🩰", note: "زهري" }
      ]
    },
    {
      id: 3,
      text: "عندما تختار حلوى أو فاكهة مفضلة، تميل أكثر إلى:",
      options: [
        { label: "الخوخ، الفواكه الاستوائية، والتوت الأحمر", icon: "🍓", note: "فواكه" },
        { label: "الفانيليا الفاخرة، والتوابل والكراميل الدافئ", icon: "🧁", note: "شرقي" },
        { label: "الحمضيات الطازجة مثل الليمون والجريب فروت", icon: "🍋", note: "حمضيات" },
        { label: "رائحة الغابات المطيرة وأوراق شجر الأرز", icon: "🌲", note: "خشبي" }
      ]
    }
  ];

  const handleSelectOption = (note: string) => {
    const updatedAnswers = [...answers, note];
    setAnswers(updatedAnswers);

    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate majority preferences
      const counts: Record<string, number> = {};
      updatedAnswers.forEach(ans => { counts[ans] = (counts[ans] || 0) + 1; });
      const sortedPrefs = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(entry => entry[0]);
      
      // Determine recommended presets
      const selectedMainPref = sortedPrefs[0] || "شرقي";
      const matching = PRESET_PERFUMES.filter(p => 
        p.category.toLowerCase().includes(selectedMainPref.toLowerCase()) ||
        p.category.toLowerCase().includes(selectedMainPref === "حمضيات" ? "أروماتك" : selectedMainPref)
      );

      setRecommendedPerfumes(matching.length > 0 ? matching : PRESET_PERFUMES.slice(0, 2));
      setIsFinished(true);
      onQuizComplete(sortedPrefs);
    }
  };

  const handleBack = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
      const updatedAnswers = [...answers];
      updatedAnswers.pop();
      setAnswers(updatedAnswers);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="quiz-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border border-[#E5E1DA] rounded-3xl p-6 md:p-8 shadow-sm"
          >
            {/* Header / Tracker */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs text-[#D4AF37] font-medium">خطوة {currentQuestionIdx + 1} من {questions.length}</span>
              <div className="flex gap-1">
                {questions.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${idx <= currentQuestionIdx ? "bg-[#D4AF37]" : "bg-[#E5E1DA]"}`} 
                  />
                ))}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold font-display text-[#1A1A1A] text-right leading-snug mb-8">
              {questions[currentQuestionIdx].text}
            </h3>

            {/* Live Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {questions[currentQuestionIdx].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(opt.note)}
                  className="group relative flex items-center justify-between p-4 bg-[#FDFCFB] border border-[#E5E1DA] hover:bg-[#F9F8F6] hover:border-[#D4AF37] rounded-2xl transition-all duration-300 cursor-pointer text-right"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl bg-[#F9F8F6] group-hover:bg-[#faf5e6] w-12 h-12 flex items-center justify-center rounded-xl transition-colors">
                      {opt.icon}
                    </span>
                    <span className="text-[#2D2D2D] text-sm font-medium pr-2">{opt.label}</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border border-[#E5E1DA] flex items-center justify-center group-hover:border-[#D4AF37]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>

            {/* Footer Navigation */}
            <div className="flex justify-between mt-6">
              {currentQuestionIdx > 0 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-xs text-[#8E8E8E] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                  <span>السابق</span>
                </button>
              ) : (
                <div />
              )}
              <span className="text-[10px] text-[#8E8E8E] italic">يتم ضبط الهرم الأنثروبولوجي العطري المناسب لك</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#E5E1DA] rounded-3xl p-6 md:p-8 shadow-sm text-center"
          >
            {/* Visual Icon */}
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#D4AF37] flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Award className="w-8 h-8 text-[#D4AF37]" />
            </div>

            <h3 className="text-2xl font-bold font-display text-[#1A1A1A] mb-2 font-serif">
              اكتمل تحديد البصمة العطرية!
            </h3>
            <p className="text-[#555555] text-xs mb-6 max-w-md mx-auto leading-relaxed">
              وفقاً لعاداتك وميولك، عائلتك المفضلة هي <strong className="text-[#D4AF37] font-display">({answers[0] || "العطور الشرقية الخشبية"})</strong>. لقد قمنا بتصفية أفضل تطابق يناسب شخصيتك المتفردة.
            </p>

            {/* Mini Scent Profile Badges */}
            <div className="flex justify-center gap-2 mb-8 flex-wrap">
              {Array.from(new Set(answers)).map((pref, i) => (
                <span key={i} className="py-1 px-3 rounded-full bg-[#FDFCFB] border border-[#E5E1DA] text-[#D4AF37] text-[10px] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>طابع {pref}</span>
                </span>
              ))}
            </div>

            {/* Recommendations Subgrid */}
            <h4 className="text-right text-xs font-semibold text-[#8E8E8E] mb-4 flex items-center justify-end gap-1.5 font-display">
              <span>اقتراحات خاصة ببصمتك العطرية</span>
              <Heart className="w-3.5 h-3.5 text-red-500" />
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {recommendedPerfumes.map((perfume, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#FDFCFB] border border-[#E5E1DA] hover:border-[#D4AF37] rounded-2xl p-4 flex gap-4 transition-all hover:scale-[1.01] items-center text-right"
                >
                  <img 
                    src={perfume.image} 
                    alt={perfume.name} 
                    className="w-16 h-16 rounded-xl object-cover border border-[#E5E1DA]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#D4AF37] font-semibold">{perfume.brand}</p>
                    <h5 className="text-sm font-bold text-[#1A1A1A] truncate mb-1">{perfume.name}</h5>
                    <p className="text-[#8E8E8E] text-[10px] truncate">{perfume.category}</p>
                    <div className="mt-2 flex justify-between items-center flex-row-reverse">
                      <span className="text-[11px] text-[#D4AF37] font-bold">{perfume.stores[0]?.price} ر.س</span>
                      <button
                        onClick={() => onNavigateToPerfume(perfume)}
                        className="text-[10px] bg-white border border-[#E5E1DA] text-[#555555] hover:text-[#D4AF37] hover:border-[#D4AF37] py-1 px-2.5 rounded-lg transition-colors cursor-pointer"
                      >
                        تفاصيل وتجربة
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={resetQuiz}
                className="py-2.5 px-5 rounded-xl border border-[#E5E1DA] text-[#8E8E8E] hover:text-[#1A1A1A] hover:bg-[#F9F8F6] transition-colors text-xs cursor-pointer"
              >
                إعادة تشخيص البصمة
              </button>
              <button
                onClick={() => onQuizComplete(answers)}
                className="py-2.5 px-6 rounded-xl bg-[#D4AF37] hover:bg-[#b38f24] text-white font-semibold text-xs transition duration-300 cursor-pointer"
              >
                تحديث حسابي ومتابعة الاستخدام
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
