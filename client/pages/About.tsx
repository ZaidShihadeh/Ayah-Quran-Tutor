import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { lang } = useLanguage();
  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);

  const englishText =
    "Our online Qur'an classes are for Arabic-speaking children ages 6–12 and girls 12+, with the hope of planting love for the Qur'an in their hearts. The lessons are interactive and gentle, helping students recite with care, understand the meanings of Surahs and the stories behind them, and connect with Islamic teachings in their daily lives. Classes are led by a caring teacher with experience in Islamic Studies, and every child is welcomed with a free trial and special materials made just for them.";

  const arabicText =
    "دروسنا القرآنية الإلكترونية مُخصصة للأطفال الناطقين باللغة العربية من سن 6 إلى 12 عامًا وللبنات من سن 12 عامًا فما فوق، بهدف غرس حب القرآن في قلوبهم. الدروس تفاعلية ولطيفة، تُساعد الطلاب على التلاوة بتأنٍّ، وفهم معاني السور وقصصها، والتواصل مع التعاليم الإسلامية في حياتهم اليومية. الدروس تُقدم مع مُعلمة مُهتمة ذات خبرة في الدراسات الإسلامية، ويُرحب بكل طفل بتجربة مجانية ومواد خاصة أعددناها خصيصًا لهم.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cyan/5 to-brand-purple/5 mt-20">
      {/* Title Section */}
      <section className="relative overflow-hidden hero-gradient-overlay bg-brand-cyan text-white py-16 md:py-24 px-4 md:px-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-black uppercase text-shadow-lg">
            {t("About Us", "من نحن")}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto py-20 md:py-32 px-4 md:px-0">
        <div className={`max-w-4xl mx-auto`}>
          <p className={`text-lg md:text-xl leading-relaxed text-slate-700 ${lang === "ar" ? "font-ar text-right" : ""}`}>
            {lang === "ar" ? arabicText : englishText}
          </p>
        </div>
      </section>
    </div>
  );
}
