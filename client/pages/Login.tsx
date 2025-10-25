import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, isLoading: isAuthLoading } = useAuth();
  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && user) {
      navigate(location.state?.from?.pathname || "/");
    }
  }, [user, isAuthLoading, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!email || !password) {
        setError(t("Please fill in all fields", "يرجى ملء جميع الحقول"));
        setIsLoading(false);
        return;
      }

      if (!email.includes("@")) {
        setError(t("Please enter a valid email", "يرجى إدخال بريد إلكتروني صحيح"));
        setIsLoading(false);
        return;
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        localStorage.setItem("userEmail", email);
        toast({
          title: t("Success!", "نجح!"),
          description: t("You have been logged in successfully", "تم تسجيل دخولك بنجاح"),
        });
        navigate(location.state?.from?.pathname || "/");
      }
    } catch (err: any) {
      setError(t("Login failed. Please try again.", "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى."));
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-cyan/5 to-brand-purple/5 flex items-center justify-center py-12 px-4 md:px-0 mt-20">
        <div className="w-full max-w-md text-center">
          <p className="text-slate-600">{t("Loading...", "جاري التحميل...")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cyan/5 to-brand-purple/5 flex items-center justify-center py-12 px-4 md:px-0 mt-20">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h1 className="text-3xl font-black uppercase text-shadow-sm mb-2">
            {t("Welcome Back", "مرحباً بك")}
          </h1>
          <p className="text-slate-600 text-sm mb-8">
            {t(
              "Sign in to your account to manage your lessons",
              "قم بتسجيل الدخول إلى حسابك لإدارة دروسك"
            )}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                {t("Email Address", "عنوان البريد الإلكتروني")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors ltr"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {t("Password", "كلمة المرور")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("••••••••", "••••••••")}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-black text-white hover:bg-black/90 px-6 py-3 h-auto font-extrabold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t("Signing in...", "جاري تسجيل الدخول...") : t("Sign In", "تسجيل الدخول")}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            {t("Don't have an account?", "ليس لديك حساب؟")}{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-semibold text-brand-cyan hover:text-brand-deep transition-colors"
            >
              {t("Create one", "أنشئ حساباً")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
