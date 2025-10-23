import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Team() {
  const { lang } = useLanguage();
  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);

  return (
    <div>
      {/* Team */}
      <section id="team" className="container mx-auto py-20 md:py-32 px-4 md:px-0">
        <div className="mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-black uppercase text-shadow-sm">
            {t("Meet our team members", "تعرف على أعضاء فريقنا")}
          </h1>
        </div>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <TeamCard
            name="Ayah Ibrahim"
            role="Founder & Teacher"
            arRole="المؤسسة والمعلمة"
          >
            {t(
              "Ayah Ibrahim is dedicated to helping her students build a strong and lasting connection with the Qur'an. With her background in Islamic Studies (Usul al-Din) and experience teaching Qur'an online, she brings both knowledge and compassion to every lesson.",
              "تُكرّس آية إبراهيم جهودها لمساعدة طلابها على بناء علاقة قوية ودائمة مع القرآن الكريم. بخلفيتها في الدراسات الإسلامية (أصول الدين) وخبرتها في تدريس القرآن الكريم عبر الإنترنت، تجمع بين المعرفة الأكاديمية والأسلوب الودود في كل درس.",
            )}
          </TeamCard>
          <TeamCard
            name="Kinda Shihadeh"
            role="Co‑founder & CEO"
            arRole="شريكة المؤسسة والمديرة التنفيذية"
          >
            {t(
              "Kinda Shihadeh manages communication, scheduling, organization, etc. to make every student's journey smooth and stress-free. As a bilingual Arabic and English speaker with a background in General Management, she supports families with care and professionalism so students can focus on learning and loving the Qur'an.",
              "تتولى كِندة شحادة برنامجنا القرآني من خلال إدارة التواصل، والجدولة، والتنظيم، وغيرها لضمان تجربة سَلِسة ومريحة لكل طالب. وبإجادتها اللغتين العربية والإنجليزية وخلفيتها في الإدارة العامة، تدعم الأسر بعناية واحترافية ليتمكن الطلاب من التركيز على تعلم القرآن ومحبة كتاب الله.",
            )}
          </TeamCard>
        </div>
      </section>
    </div>
  );
}

function TeamCard({
  name,
  role,
  arRole,
  children,
}: {
  name: string;
  role: string;
  arRole: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 p-6 md:p-8 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:border-brand-cyan/50 animate-slide-in-up">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-full bg-brand-cyan text-white grid place-items-center text-lg font-extrabold flex-shrink-0">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-lg md:text-xl font-extrabold text-shadow">{name}</h4>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">{role}</p>
          <p className="font-ar text-brand-deep text-xs md:text-sm font-bold">{arRole}</p>
          <p className="mt-3 text-slate-700 text-sm md:text-base leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );
}
