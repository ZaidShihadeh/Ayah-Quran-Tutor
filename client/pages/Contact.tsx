import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Instagram, Linkedin } from "lucide-react";
import { siteConfig } from "@/siteConfig";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { lang } = useLanguage();
  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);
  const { contacts, socials } = siteConfig;

  const waLink = contacts.whatsapp
    ? (contacts.whatsapp.startsWith("http") ? contacts.whatsapp : `https://wa.me/${contacts.whatsapp.replace(/[^\\d]/g, "")}`)
    : "";

  return (
    <div className="container mx-auto py-16 md:py-24 px-4 md:px-0 min-h-screen flex items-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-black uppercase mb-4">
            {t("Get in touch", "تواصل معنا")}
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            {t(
              "Choose your preferred way to reach us",
              "اختر الطريقة المفضلة للتواصل معنا"
            )}
          </p>
        </div>

        <div className="space-y-4 md:space-y-5">
          {contacts.email && (
            <a
              href={`mailto:${contacts.email}`}
              className="block group"
            >
              <div className="rounded-2xl border border-slate-200 p-6 md:p-8 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-brand-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-cyan/20 transition-colors">
                    <Mail className="text-brand-cyan" size={32} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                      {t("Email", "البريد الإلكتروني")}
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base break-all hover:text-brand-cyan transition-colors">
                      {contacts.email}
                    </p>
                    <p className="text-xs md:text-sm text-slate-500 mt-2">
                      {t("Send us a message", "أرسل لنا رسالة")}
                    </p>
                  </div>
                  <div className="hidden md:flex items-center text-brand-cyan font-semibold text-sm">
                    →
                  </div>
                </div>
              </div>
            </a>
          )}

          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="rounded-2xl border border-slate-200 p-6 md:p-8 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-brand-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-cyan/20 transition-colors">
                    <MessageCircle className="text-brand-cyan" size={32} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                      {t("WhatsApp", "واتساب")}
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base">
                      {t("Chat with us on WhatsApp", "تحدث معنا عبر واتساب")}
                    </p>
                    <p className="text-xs md:text-sm text-slate-500 mt-2">
                      {t("Quick response and support", "الرد السريع والدعم")}
                    </p>
                  </div>
                  <div className="hidden md:flex items-center text-brand-cyan font-semibold text-sm">
                    →
                  </div>
                </div>
              </div>
            </a>
          )}

          {socials.instagram && (
            <a 
              href={socials.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="rounded-2xl border border-slate-200 p-6 md:p-8 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-brand-deep/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-deep/20 transition-colors">
                    <Instagram className="text-brand-deep" size={32} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                      {t("Instagram", "إنستاجرام")}
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base">
                      {t("Follow and message us", "تابعنا وراسلنا")}
                    </p>
                    <p className="text-xs md:text-sm text-slate-500 mt-2">
                      {t("See our latest updates", "شاهد آخر تحديثاتنا")}
                    </p>
                  </div>
                  <div className="hidden md:flex items-center text-brand-deep font-semibold text-sm">
                    →
                  </div>
                </div>
              </div>
            </a>
          )}

          {socials.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="rounded-2xl border border-slate-200 p-6 md:p-8 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-brand-deep/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-deep/20 transition-colors">
                    <Linkedin className="text-brand-deep" size={32} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                      {t("LinkedIn", "لينكد إن")}
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base">
                      {t("Connect with us on LinkedIn", "تواصل معنا على لينكد إن")}
                    </p>
                    <p className="text-xs md:text-sm text-slate-500 mt-2">
                      {t("Professional updates and news", "التحديثات والأخبار المهنية")}
                    </p>
                  </div>
                  <div className="hidden md:flex items-center text-brand-deep font-semibold text-sm">
                    →
                  </div>
                </div>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/*
  ===== ORIGINAL CONTACT PAGE CODE (COMMENTED OUT) =====
  
  Keep this section intact to restore the original form when needed.
  To restore: uncomment this section and replace the contact methods above.

import React from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const [name, setName] = React.useState("");
const [email, setEmail] = React.useState("");
const [message, setMessage] = React.useState("");
const [loading, setLoading] = React.useState(false);

const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name || !email || !message) {
    toast.error(t("Please fill out all fields", "يرجى تعبئة جميع الحقول"));
    return;
  }
  setLoading(true);
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, lang }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
    toast.success(t("Message sent! We'll reply soon.", "تم الإرسال! سنعاود التواصل قريبًا."));
    setName("");
    setEmail("");
    setMessage("");
  } catch (err) {
    toast.error(t("Could not send message. Please try again.", "تعذر إرسال الرسالة. حاول مرة أخرى."));
  } finally {
    setLoading(false);
  }
};

const isMobile = useIsMobile();

// ORIGINAL FORM RETURN (replace the current return above with this):
// <div className="container mx-auto py-12 md:py-16 px-4 md:px-0">
//   <div className="max-w-3xl">
//     <h1 className="text-3xl md:text-4xl font-black uppercase">{t("Contact us", "تواصل معنا")}</h1>
//     <p className="mt-3 text-slate-700 text-sm md:text-base">
//       {t(
//         "Tell us about your learner and preferred schedule. We'll get back within 24 hours.",
//         "أخبرنا عن المتعلم والوقت المناسب لك، وسنعاود التواصل خلال 24 ساعة."
//       )}
//     </p>
//   </div>
//
//   <div className={`mt-8 md:mt-10 grid gap-6 md:gap-8 ${isMobile ? "grid-cols-1" : "md:grid-cols-2"}`}>
//     <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 p-5 md:p-6 bg-white shadow-sm space-y-4">
//       <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "md:grid-cols-2"}`}>
//         <div>
//           <label className="text-sm font-medium">{t("Name", "الاسم")}</label>
//           <input 
//             value={name} 
//             onChange={(e) => setName(e.target.value)} 
//             className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-cyan text-sm md:text-base" 
//             placeholder={t("Your name", "اسمك")} 
//           />
//         </div>
//         <div>
//           <label className="text-sm font-medium">{t("Email", "البريد الإلكتروني")}</label>
//           <input 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             type="email" 
//             className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-cyan text-sm md:text-base" 
//             placeholder="you@example.com" 
//           />
//         </div>
//       </div>
//       <div>
//         <label className="text-sm font-medium">{t("Message", "الرسالة")}</label>
//         <textarea 
//           value={message} 
//           onChange={(e) => setMessage(e.target.value)} 
//           className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 h-32 md:h-40 resize-none focus:outline-none focus:ring-2 focus:ring-brand-cyan text-sm md:text-base" 
//           placeholder={t("Tell us about your learner...", "أخبرنا عن المتعلم...")} 
//         />
//       </div>
//       <Button 
//         disabled={loading} 
//         className="w-full rounded-full bg-black text-white hover:bg-black/90 px-6 py-2 md:py-3 h-auto transition-colors font-semibold"
//       >
//         {loading ? t("Sending...", "جارٍ الإرسال...") : t("Send", "إرسال")}
//       </Button>
//     </form>
//
//     <div className="space-y-3 md:space-y-4">
//       {contacts.email && (
//         <a 
//           href={`mailto:${contacts.email}`} 
//           className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors"
//         >
//           <Mail className="flex-shrink-0 text-brand-cyan" size={24} /> 
//           <span className="text-sm md:text-base font-medium break-all">{contacts.email}</span>
//         </a>
//       )}
//       {waLink && (
//         <a 
//           href={waLink} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors"
//         >
//           <MessageCircle className="flex-shrink-0 text-brand-cyan" size={24} /> 
//           <span className="text-sm md:text-base font-medium">{t("Chat on WhatsApp", "تواصل عبر واتساب")}</span>
//         </a>
//       )}
//       {socials.instagram && (
//         <a 
//           href={socials.instagram} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors"
//         >
//           <Instagram className="flex-shrink-0 text-brand-cyan" size={24} /> 
//           <span className="text-sm md:text-base font-medium">Instagram</span>
//         </a>
//       )}
//       {socials.linkedin && (
//         <a 
//           href={socials.linkedin} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors"
//         >
//           <Linkedin className="flex-shrink-0 text-brand-cyan" size={24} /> 
//           <span className="text-sm md:text-base font-medium">LinkedIn</span>
//         </a>
//       )}
//     </div>
//   </div>
// </div>
*/
