import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/siteConfig";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Zap, BookOpen, Clock } from "lucide-react";
import React from "react";

export default function Lessons() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);

  const handlePayNow = (lessonId: string) => {
    const lesson = siteConfig.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      addItem({
        id: lesson.id,
        name: lang === "ar" ? lesson.titleAr : lesson.titleEn,
        price: lesson.price,
        quantity: 1,
        type: "lesson",
      });
      navigate("/checkout");
    }
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="bg-gradient-to-r from-brand-cyan to-brand-purple text-white py-12 md:py-16 px-4 md:px-0">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-5xl font-black uppercase mb-4">
            {t("Premium Lessons", "الدروس المتميزة")}
          </h1>
          <p className="text-white/90 max-w-2xl text-sm md:text-base">
            {t(
              "Explore our comprehensive Qur'an lessons with complete materials. Purchase once and access forever.",
              "استكشف دروسنا الشاملة للقرآن الكريم مع المواد الكاملة. اشتري مرة واحدة والوصول إلى الأبد."
            )}
          </p>
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="container mx-auto py-16 md:py-24 px-4 md:px-0">
        {siteConfig.lessons.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">
              {t("No lessons available yet", "لا توجد دروس متاحة حالياً")}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {siteConfig.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="rounded-3xl border-2 border-slate-200 p-6 md:p-8 bg-white hover:shadow-2xl hover:border-brand-purple/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-brand-cyan/10 grid place-items-center flex-shrink-0">
                    <Zap className="text-brand-cyan" size={28} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-black text-shadow">
                      {lang === "ar" ? lesson.titleAr : lesson.titleEn}
                    </h2>
                    {lesson.level && (
                      <p className="text-xs md:text-sm text-slate-500 mt-2 font-semibold">
                        {lesson.level}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-6">
                  {lang === "ar" ? lesson.descriptionAr : lesson.descriptionEn}
                </p>

                <div className="space-y-3 mb-6">
                  {lesson.duration && (
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <Clock size={16} className="text-brand-purple" />
                      <span>{lesson.duration}</span>
                    </div>
                  )}
                  {lesson.materials && lesson.materials.length > 0 && (
                    <div className="flex items-start gap-2 text-slate-600 text-sm">
                      <BookOpen size={16} className="text-brand-purple flex-shrink-0 mt-0.5" />
                      <span>{lesson.materials.length} {t("materials included", "مواد مضمنة")}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-200 pt-6 mb-6">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl md:text-5xl font-black text-brand-purple">${lesson.price}</span>
                    <span className="text-slate-600">{t("one-time", "لمرة واحدة")}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-6">
                    {t("Access to all lesson materials permanently", "الوصول إلى جميع مواد الدرس بشكل دائم")}
                  </p>
                </div>

                <Button
                  onClick={() => handlePayNow(lesson.id)}
                  className="w-full rounded-full bg-brand-cyan text-white hover:bg-brand-cyan/90 px-6 py-3 h-auto transition-all duration-300 hover:scale-105 hover:shadow-lg uppercase tracking-wider font-extrabold text-sm md:text-base"
                >
                  {t("Pay Now", "ادفع الآن")}
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
