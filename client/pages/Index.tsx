import { Button } from "@/components/ui/button";
import { BookOpen, Headphones, Star, Users, Sparkles, ArrowUp } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import React from "react";
import { siteConfig } from "@/siteConfig";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function Index() {
  const { lang } = useLanguage();
  const isMobile = useIsMobile();
  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.split("?")[0];
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 0);
        }
      }
    };

    handleHashNavigation();
    window.addEventListener("hashchange", handleHashNavigation);
    return () => window.removeEventListener("hashchange", handleHashNavigation);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappLink = siteConfig.contacts?.whatsapp
    ? siteConfig.contacts.whatsapp.startsWith("http")
      ? siteConfig.contacts.whatsapp
      : `https://wa.me/${siteConfig.contacts.whatsapp.replace(/[^\d]/g, "")}`
    : "";

  return (
    <div className="">
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden hero-gradient-overlay">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-cyan/30 blur-3xl animate-float-slow parallax" />
        <div className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-brand-purple/30 blur-3xl animate-float-slower parallax" />
        <div className="bg-brand-cyan text-white relative z-10">
          <div className="container mx-auto py-16 md:py-32 px-4 md:px-0">
            <div className={`grid gap-8 md:gap-10 items-center ${isMobile ? "grid-cols-1" : "md:grid-cols-2"}`}>
              <div className={isMobile ? "order-2" : "order-2 md:order-1"}>
                <h1 className="text-3xl md:text-6xl font-black leading-tight uppercase animate-fade-up text-shadow-lg">
                  {t("Ayah Qur'an Tutor", "آية لتعليم القرآن")}
                </h1>
                <p className="mt-4 md:mt-6 max-w-xl text-white/90 text-base md:text-lg leading-7 text-shadow animate-slide-in-up stagger-1">
                  {t(
                    "Online Qur'an classes for children 6–12 and women 12+. Interactive, gentle lessons that nurture love for the Qur'an through tajwīd, memorization, stories, and character.",
                    "دروس قرآنية تفاعلية للأطفال والنساء بأسلوب لطيف يُنمّي حب القرآن من خلال التجويد والحفظ والقصص والقيم.",
                  )}
                </p>
                <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-slide-in-up stagger-2">
                  <a href="https://chat.whatsapp.com/C0FI3jlqcaUFTu8nmtF3Bk" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto rounded-full bg-black text-white hover:bg-black/90 px-6 md:px-8 py-2 md:py-3 h-auto uppercase tracking-wider font-extrabold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      {t("Book a Free Trial", "احجز تجربة مجانية")}
                    </Button>
                  </a>
                  <button
                    onClick={() => document.getElementById("offerings")?.scrollIntoView({ behavior: "smooth" })}
                    className="underline underline-offset-4 font-semibold hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    {t("See offerings", "عرض العروض")}
                  </button>
                </div>
              </div>
              <div className={isMobile ? "order-1" : "order-1 md:order-2"}>
                <div className="flex justify-center md:justify-end animate-bounce-in">
                  <div className="relative w-full max-w-md">
                    <div className="absolute -inset-4 rounded-[2rem] bg-white/20 blur-xl" />
                    <div className="relative bg-white text-slate-800 rounded-[2rem] p-6 md:p-8 shadow-xl animate-fade-up hover:shadow-2xl hover:scale-105 transition-all duration-500">
                      <div>
                        <p className="text-xs md:text-sm uppercase tracking-wider text-slate-500">
                          {t("Tutoring", "دروس")}
                        </p>
                        <p className="font-semibold text-sm md:text-base">Small group classes</p>
                      </div>
                      <div className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-sm">
                        <p className="flex items-center gap-2">
                          <Star className="text-brand-purple flex-shrink-0" size={18} /> Free trial for
                          every child
                        </p>
                        <p className="flex items-center gap-2">
                          <BookOpen className="text-brand-purple flex-shrink-0" size={18} /> Custom
                          materials for each student
                        </p>
                        <p className="flex items-center gap-2">
                          <Headphones className="text-brand-purple flex-shrink-0" size={18} /> Engaging
                          audio stories
                        </p>
                      </div>
                      <a href="https://chat.whatsapp.com/C0FI3jlqcaUFTu8nmtF3Bk" target="_blank" rel="noopener noreferrer" className="mt-4 md:mt-6 inline-block w-full">
                        <Button className="w-full rounded-full px-4 md:px-6 h-10 md:h-11 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                          {t("Book a free trial", "احجز تجربة مجانية")}
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white text-foreground py-20 md:py-32 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Vision */}
            <div className="rounded-3xl bg-white border-2 border-slate-200 p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <h3 className="text-2xl md:text-3xl font-black uppercase text-shadow-lg">
                {t("Vision", "الرؤية")}
              </h3>
              <p className="text-slate-700 mt-4 text-sm md:text-base leading-relaxed">
                {t(
                  "Nurture a generation that recites, understands, and loves the Qur'an from an early age. We hope to plant the light of the Qur'an in young hearts, helping the children grow in faith, understanding, and love for Allah's words. Through gentle guidance and meaningful learning, we aim to build a strong foundation that will inspire them for a lifetime.",
                  "تنشئة جيل يقرأ القرآن الكريم ويفهمه ويحب القرآن من صغره. نأمل أن نزرع نور القرآن في قلوب الصغار، ونساعد الأطفال على النمو في الإيمان والفهم والحب لكلمات الله. من خلال التوجيه اللطيف والتعلم الهادف، نهدف إلى بناء أساس قوي يعطيهم الإلهام مدى الحياة."
                )}
              </p>
            </div>

            {/* Mission */}
            <div className="rounded-3xl bg-white border-2 border-slate-200 p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <h3 className="text-2xl md:text-3xl font-black uppercase text-shadow-lg">
                {t("Mission", "الرسالة")}
              </h3>
              <p className="text-slate-700 mt-4 text-sm md:text-base leading-relaxed">
                {t(
                  "Provide interactive Qur'an classes for Arabic-speaking children ages 6–12 and girls 12+, where learning is filled with care, joy, and purpose. We focus on correct recitation, understanding the meanings and stories of the Qur'an, and connecting its lessons to daily life. Led by an experienced and compassionate teacher, our goal is to make every class a place where the Qur'an becomes a beloved companion and source of comfort for each child.",
                  "توفير حصص قرآنية تفاعلية للأطفال الناطقين بالعربية من 6-12 سنة والفتيات 12+، حيث يكون التعلم مليئاً بالعناية والفرح والهدف. نركز على التلاوة الصحيحة وفهم معاني وقصص القرآن الكريم، وربط دروسه بحياتنا اليومية. بقيادة معلمة ذات خبرة وعطف، هدفنا هو جعل كل حصة مكاناً يصبح فيه القرآن الكريم رفيقاً محبوباً ومصدر راحة لكل طفل."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section id="offerings" className="container mx-auto py-20 md:py-32 px-4 md:px-0">
        <div className="flex flex-col md:flex-row items-start md:items-baseline justify-between gap-4 md:gap-6 mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-shadow-sm">
              {t("What we offer", "ما نقدمه")}
            </h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card
            icon={<BookOpen className="text-brand-cyan" />}
            title="Students' Materials"
            arTitle="مواد الطالب"
            index={0}
          >
            {t(
              "Every child learns differently. That's why we designed lessons based on your child's pace, strengths, and needs. All students receive the same high-quality materials created by us, but lessons are personalized.",
              "كل طفل يتعلم بطريقة مختلفة. لذلك صممنا دروساً بناءً على وتيرة طفلك وقوته واحتياجاته. يحصل جميع الطلاب على نفس المواد عالية الجودة التي أنشأناها، لكن الدروس مخصصة."
            )}
          </Card>
          <Card
            icon={<Users className="text-brand-cyan" />}
            title="Our Promise"
            arTitle="وعدنا"
            index={1}
          >
            {t(
              "We offer personalized Qur'an lessons that help each child learn at their own pace while planting a deep love for the Qur'an through recitation, meanings, and stories.",
              "نقدم دروساً قرآنية مخصصة تساعد كل طفل على التعلم بالسرعة التي تناسبه مع غرس حب عميق للقرآن الكريم من خلال التلاوة والمعاني والقصص."
            )}
          </Card>
          <Card
            icon={<Sparkles className="text-brand-cyan" />}
            title="Small Group Classes"
            arTitle="الفصول الدراسية الصغيرة"
            index={2}
          >
            {t(
              "Special online materials we have prepared especially for our students.",
              "مواد خاصة عبر الإنترنت أعددناها خصيصاً لطل��بنا."
            )}
          </Card>
        </div>
      </section>

      {/* Materials (feature-flagged) */}
      {siteConfig.features?.showMaterials && (
        <section id="materials" className="container mx-auto py-20 md:py-32 px-4 md:px-0">
          <div className="rounded-3xl bg-gradient-to-r from-brand-cyan to-brand-purple p-[1px]">
            <div className="rounded-3xl bg-white p-6 md:p-12">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase">
                    {t("Students' materials", "مواد الطالب")}
                  </h3>
                  <p className="mt-4 text-slate-700 max-w-prose text-sm md:text-base leading-relaxed">
                    {t(
                      "Every child receives inspiring worksheets and progress trackers made just for them, reinforcing each lesson through fun practice.",
                      "يحصل كل طفل على أوراق عمل ملهمة ومتابعة للتقدم مصممة خصيصاً له لتعزيز كل درس.",
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-50 p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <Sparkles className="mx-auto text-brand-purple" size={24} />
                    <p className="mt-2 font-semibold text-sm">Worksheets</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <Star className="mx-auto text-brand-purple" size={24} />
                    <p className="mt-2 font-semibold text-sm">Rewards</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <BookOpen className="mx-auto text-brand-purple" size={24} />
                    <p className="mt-2 font-semibold text-sm">Reading</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <Headphones className="mx-auto text-brand-purple" size={24} />
                    <p className="mt-2 font-semibold text-sm">Audio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-brand-cyan text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-slide-in-up"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}

function Card({
  icon,
  title,
  arTitle,
  children,
  index = 0,
}: {
  icon: React.ReactNode;
  title: string;
  arTitle: string;
  children: React.ReactNode;
  index?: number;
}) {
  const ref = useIntersectionObserver<HTMLDivElement>();
  const staggerClass = [
    "stagger-1",
    "stagger-2",
    "stagger-3",
    "stagger-4",
    "stagger-5",
  ][index] || "stagger-1";

  return (
    <div
      ref={ref}
      className={`rounded-3xl border border-slate-200 p-6 md:p-8 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:border-brand-purple/50 animate-slide-in-up ${staggerClass}`}
    >
      <div className="flex items-start md:items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-brand-purple/10 grid place-items-center flex-shrink-0 group-hover:bg-brand-purple/20 transition-colors">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg md:text-xl font-extrabold text-shadow">{title}</h3>
          <p className="font-ar text-brand-deep font-bold text-sm">{arTitle}</p>
        </div>
      </div>
      <p className="mt-4 text-slate-700 text-sm md:text-base leading-relaxed">{children}</p>
    </div>
  );
}
