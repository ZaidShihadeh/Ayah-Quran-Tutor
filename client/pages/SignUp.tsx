import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

export default function SignUp() {
  const { lang } = useLanguage();
  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    childAge: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.childAge) {
      toast.error(t("Please fill in all required fields", "يرجى ملء جميع الحقول المطلوبة"));
      return;
    }

    setLoading(true);
    try {
      setFormData({
        name: "",
        email: "",
        phone: "",
        childAge: "",
        message: "",
      });
      toast.success(t(
        "Thank you! We'll contact you soon to schedule a free trial.",
        "شكراً لك! سنتواصل معك قريباً لتحديد موعد التجربة المجانية."
      ));
    } catch (error) {
      toast.error(t("Something went wrong. Please try again.", "حدث خطأ ما. يرجى المحاولة مرة أخرى."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cyan/5 to-brand-purple/5 py-16 md:py-24 px-4 md:px-0 mt-20">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black uppercase text-shadow-sm mb-4">
            {t("Join Our Community", "انضم إلى مجتمعنا")}
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            {t(
              "Sign up for a free trial and let your child start their Qur'an journey with us",
              "سجل طفلك للحصول على تجربة مجانية وابدأ رحلته القرآنية معنا"
            )}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {t("Parent/Guardian Name", "اسم الوالد/الوالدة")} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("Your full name", "اسمك الكامل")}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {t("Email Address", "عنوان البريد الإلكتروني")} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("you@example.com", "انت@مثال.com")}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {t("Phone Number", "رقم الهاتف")} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("Your phone number", "رقم هاتفك")}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {t("Child's Age", "عمر الطفل")} *
                </label>
                <select
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors"
                  required
                >
                  <option value="">{t("Select age", "اختر العمر")}</option>
                  <option value="6-8">6-8 {t("years", "سنوات")}</option>
                  <option value="8-10">8-10 {t("years", "سنوات")}</option>
                  <option value="10-12">10-12 {t("years", "سنوات")}</option>
                  <option value="12+">12+ {t("years", "سنوات")}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {t("Message (Optional)", "الرسالة (اختياري)")}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("Tell us about your child and their interests...", "أخبرنا عن طفلك واهتماماته...")}
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan transition-colors resize-none"
              />
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-sm text-slate-600">
                {t(
                  "After submitting this form, we'll contact you within 24 hours to schedule your free trial class.",
                  "بعد تقديم هذا النموذج، سنتواصل معك خلال 24 ساعة لتحديد موعد حصة التجربة المجانية."
                )}
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-brand-cyan text-white hover:bg-brand-cyan/90 px-6 py-3 h-auto font-extrabold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t("Signing up...", "جاري التسجيل...") : t("Sign Up for Free Trial", "سجل للتجربة المجانية")}
            </Button>

            <p className="text-center text-sm text-slate-600">
              {t("We respect your privacy. No spam, ever.", "نحترم خصوصيتك. لا رسائل غير مرغوبة.")}
            </p>
          </form>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-black text-brand-cyan mb-2">✓</div>
            <h3 className="font-bold text-lg mb-1">{t("Free Trial", "تجربة مجانية")}</h3>
            <p className="text-sm text-slate-600">
              {t("60-minute class with no commitment", "حصة مدتها 60 دقيقة بدون التزام")
              }
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-brand-purple mb-2">✓</div>
            <h3 className="font-bold text-lg mb-1">{t("Personalized", "مخصص")}</h3>
            <p className="text-sm text-slate-600">
              {t("Tailored to your child's level", "مصمم خصيصاً لمستوى طفلك")}
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-brand-cyan mb-2">✓</div>
            <h3 className="font-bold text-lg mb-1">{t("Expert Teacher", "معلم متخصص")}</h3>
            <p className="text-sm text-slate-600">
              {t("Experienced and compassionate instruction", "تدريس محترف وعطوف")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
