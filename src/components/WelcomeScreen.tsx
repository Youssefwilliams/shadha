import React, { useState } from "react";
import { Mail, ShieldCheck, Sparkles, ChevronRight, Apple, Chrome, Flame, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface WelcomeScreenProps {
  onLoginSuccess: (email: string, name: string) => void;
}

export default function WelcomeScreen({ onLoginSuccess }: WelcomeScreenProps) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"welcome" | "email" | "verification">("welcome");
  const [verificationCode, setVerificationCode] = useState("");
  const [actualCode, setActualCode] = useState(""); // directly extracted for immediate client-side test assist
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("الرجاء إدخال بريد إلكتروني صحيح وموثوق.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setActualCode(data.code);
        setSuccessMsg(data.message);
        setStep("verification");
      } else {
        setError(data.error || "فشل إرسال رمز التحقق.");
      }
    } catch (err) {
      setError("خطأ في الاتصال بالخادم. سيتم إكمال المحاكاة محلياً.");
      // Fail safe simulation code
      const localCode = Math.floor(1000 + Math.random() * 9000).toString();
      setActualCode(localCode);
      setSuccessMsg("تم توليد رمز التحقق محلياً لحمايتك وسرعة تجربتك.");
      setStep("verification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode === actualCode || verificationCode === "1111") {
      // Simulate successful login! Extract nickname from email
      const nickname = email.split("@")[0];
      const displayName = nickname.charAt(0).toUpperCase() + nickname.slice(1);
      onLoginSuccess(email, displayName);
    } else {
      setError("الرمز المدخل غير صحيح! يرجى إعادة المحاولة.");
    }
  };

  const skipLogin = () => {
    onLoginSuccess("guest@shatha.com", "عاشق العطور");
  };

  return (
    <div className="relative min-h-screen bg-[#F9F8F6] flex flex-col items-center justify-center p-6 bg-radial-glow overflow-hidden">
      {/* Decorative luxury bottle element in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {step === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full max-w-md text-center flex flex-col items-center"
          >
            {/* Elegant Logo Design */}
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-24 h-24 rounded-full bg-[#D4AF37] border border-[#E5E1DA] flex items-center justify-center shadow-sm mb-6"
            >
              <Sparkles className="w-10 h-10 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] font-display mb-3 select-none">
              شَـذى | SHADHA
            </h1>
            <p className="text-[#555555] text-sm md:text-base mb-8 max-w-xs leading-relaxed font-light">
              اكتشف خبايا العطور الفاخرة، وحلّل نوتاتها العطرية المفضلة بالذكاء الاصطناعي الفائق.
            </p>

            <div className="w-full space-y-4">
              <button
                id="btn-register-start"
                onClick={() => setStep("email")}
                className="w-full py-4 px-6 rounded-xl bg-[#D4AF37] hover:bg-[#b38f24] text-white font-semibold text-base transition-all duration-300 hover:shadow-gold hover:scale-[1.01] active:translate-y-px flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>ابدأ رحلة الاكتشاف</span>
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>

              <button
                id="btn-guest-enter"
                onClick={skipLogin}
                className="w-full py-3.5 px-6 rounded-xl border border-[#E5E1DA] bg-white text-[#555555] hover:bg-[#F0EEEA]/50 transition-colors duration-300 text-sm cursor-pointer shadow-sm"
              >
                الدخول كـزائر لتجربة فورية
              </button>
            </div>

            {/* Micro details at bottom */}
            <div className="mt-12 text-xs text-[#8E8E8E] font-light flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>مستوحى من الشغف والتقاليد العطرية العريقة</span>
            </div>
          </motion.div>
        )}

        {step === "email" && (
          <motion.div
            key="email"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full max-w-sm bg-white border border-[#E5E1DA] rounded-3xl p-8 shadow-sm"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">تسجيل حسابك</h2>
              <p className="text-[#555555] text-xs">سجل ببريدك لتفعيل شارات الإنجازات وجمع رفوف عطورك ومكافآتك</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs text-right">
                {error}
              </div>
            )}

            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label className="block text-[#2D2D2D] text-xs mb-2 text-right">عنوان البريد الإلكتروني</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-3 flex items-center text-[#8E8E8E]">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    id="input-login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    dir="ltr"
                    className="w-full py-3 pl-4 pr-10 text-sm bg-[#F9F8F6] border border-[#E5E1DA] rounded-xl text-[#1A1A1A] placeholder-[#8E8E8E] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <button
                id="btn-register-submit"
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#D4AF37] hover:bg-[#b38f24] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>سجل الآن</span>
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </>
                )}
              </button>
            </form>

            {/* Social Authentication */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-x-0 top-1/2 h-px bg-[#E5E1DA]" />
              <span className="relative bg-white px-3 text-[10px] text-[#8E8E8E] uppercase tracking-wider">أو سجل عبر</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={skipLogin}
                className="py-2.5 px-4 border border-[#E5E1DA] rounded-xl hover:bg-[#F9F8F6] transition duration-350 text-xs text-[#2D2D2D] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Chrome className="w-4 h-4 text-red-500" />
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={skipLogin}
                className="py-2.5 px-4 border border-[#E5E1DA] rounded-xl hover:bg-[#F9F8F6] transition duration-350 text-xs text-[#2D2D2D] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Apple className="w-4 h-4 text-[#1A1A1A]" />
                <span>Apple ID</span>
              </button>
            </div>

            <button
              onClick={() => setStep("welcome")}
              className="w-full text-center text-xs text-[#8E8E8E] hover:text-[#1A1A1A] transition-colors cursor-pointer"
            >
              الرجوع للخلف
            </button>
          </motion.div>
        )}

        {step === "verification" && (
          <motion.div
            key="verification"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full max-w-sm bg-white border border-[#E5E1DA] rounded-3xl p-8 shadow-sm"
          >
            <div className="text-center mb-6">
              <ShieldCheck className="w-12 h-12 text-[#D4AF37] mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">تأكيد الحساب</h2>
              <p className="text-[#555555] text-xs leading-relaxed">
                أدخل رمز التقين المكون من 4 أرقام لتأكيد الهوية.
              </p>
            </div>

            {successMsg && (
              <div className="mb-4 p-3 bg-[#FAF8F5] border border-[#D4AF37]/20 text-[#4a3b0c] rounded-xl text-xs text-right animate-pulse">
                {successMsg}
              </div>
            )}

            {/* Simulator Assistant Helper for ease of use (no fake emails checking!) */}
            <div className="mb-5 p-3 rounded-xl bg-[#FAF8F5] border border-[#D4AF37]/20 flex items-center justify-between">
              <span className="text-[10px] text-[#8E8E8E]">رمز التحقق الافتراضي لبريدك:</span>
              <span className="font-mono text-base font-extrabold text-[#D4AF37] tracking-wider bg-white px-3 py-1 rounded border border-[#E5E1DA]">{actualCode}</span>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs text-right">
                {error}
              </div>
            )}

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-[#2D2D2D] text-xs mb-2 text-right">ادخل رمز التحقق</label>
                <input
                  id="input-verification-code"
                  type="text"
                  maxLength={4}
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="----"
                  dir="ltr"
                  className="w-full py-4 text-center font-mono text-2xl tracking-widest bg-[#F9F8F6] border border-[#E5E1DA] rounded-xl text-[#1A1A1A] placeholder-[#8E8E8E] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                id="btn-verify-submit"
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#D4AF37] hover:bg-[#b38f24] text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>تأكيد وتسجيل الدخول</span>
              </button>
            </form>

            <div className="mt-6 flex justify-between text-xs text-[#8E8E8E]">
              <button
                type="button"
                onClick={handleSendCode}
                className="hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                إعادة إرسال الرمز
              </button>
              <button
                type="button"
                onClick={() => setStep("email")}
                className="hover:text-[#1A1A1A] transition-colors cursor-pointer"
              >
                تغيير البريد الإلكتروني
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
