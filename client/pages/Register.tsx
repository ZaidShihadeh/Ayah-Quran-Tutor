import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        toast.error(t("Please fill in all fields", "يرجى ملء جميع الحقول"));
        setIsLoading(false);
        return;
      }

      if (!formData.email.includes("@")) {
        toast.error(t("Please enter a valid email", "يرجى إدخال بريد إلكتروني صحيح"));
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        toast.error(t("Password must be at least 6 characters", "كلمة المرور يجب أن تكون 6 أحرف على الأقل"));
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error(t("Passwords do not match", "كلمات المرور غير متطابقة"));
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userName", formData.name);

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) {
          toast.success(t("Account created successfully! Please sign in.", "تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول."));
          navigate("/login");
        } else {
          toast.success(t("Account created successfully! You are now logged in.", "تم إنشاء الحساب بنجاح! أنت الآن مسجل الدخول."));
          navigate("/");
        }
      }
    } catch (err: any) {
      toast.error(t("Registration failed. Please try again.", "فشل التسجيل. يرجى المحاولة مرة أخرى."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cyan/5 to-brand-purple/5 flex items-center justify-center py-12 px-4 md:px-0 mt-20">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h1 className="text-3xl font-black uppercase text-shadow-sm mb-2">
            {t("Create Account", "إنشاء حساب")}
          </h1>
          <p className="text-slate-600 text-sm mb-8">
            {t(
              "Join us and start your Qur'an learning journey",
              "انضم إلينا وابدأ رحلتك في تعلم القرآن الكريم"
            )}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                {t("Full Name", "الاسم الكامل")}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("Your full name", "اسمك الكامل")}
                className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors ${
                  lang === "ar" ? "text-right" : ""
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {t("Email Address", "عنوان البريد الإلكتروني")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
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

            <div>
              <label className="block text-sm font-semibold mb-2">
                {t("Confirm Password", "تأكيد كلمة المرور")}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-brand-cyan text-white hover:bg-brand-cyan/90 px-6 py-3 h-auto font-extrabold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t("Creating account...", "جاري إنشاء الحساب...") : t("Create Account", "إنشاء الحساب")}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            {t("Already have an account?", "هل لديك حساب بالفعل؟")}{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-brand-cyan hover:text-brand-deep transition-colors"
            >
              {t("Sign in", "سجل الدخول")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
