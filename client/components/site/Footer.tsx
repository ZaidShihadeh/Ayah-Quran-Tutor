import { siteConfig } from "@/siteConfig";
import { useLanguage } from "@/context/LanguageContext";
import { Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const { lang } = useLanguage();
  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);
  const { contacts, socials } = siteConfig;
  const waLink = contacts.whatsapp
    ? contacts.whatsapp.startsWith("http")
      ? contacts.whatsapp
      : `https://wa.me/${contacts.whatsapp.replace(/[^\\d]/g, "")}`
    : "";

  return (
    <footer className="mt-24">
      <div className="brand-gradient relative overflow-hidden">
        <div className="pointer-events-none absolute -top-10 -left-10 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-float-slower" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-float-slow" />
        <div className="container mx-auto py-16 text-white">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-2xl font-extrabold uppercase">
                Ayah Qur’an Tutor
              </h3>
              <p className="mt-3 text-white/90 max-w-sm">
                {t(
                  "Online Qur’an tutoring for children and women. Gentle, structured, and joyful lessons to build a lasting love for the Qur’an.",
                  "تعليم القرآن الكريم عبر الإنترنت للأطفال والنساء بأسلوب لطيف ومنهجي وممتع.",
                )}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold uppercase">
                {t("Contact", "تواصل")}
              </h4>
              <ul className="mt-3 space-y-2 text-white/90">
                <li>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {t("Book a free trial", "احجز تجربة مجانية")}
                  </a>
                </li>
                {contacts.email && (
                  <li>
                    <a
                      href={`mailto:${contacts.email}`}
                      className="hover:text-white flex items-center gap-2"
                    >
                      <Mail size={16} /> {contacts.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold uppercase">
                {t("Follow", "تابعنا")}
              </h4>
              <ul className="mt-3 space-y-2 text-white/90">
                {socials.instagram && (
                  <li>
                    <a
                      href={socials.instagram}
                      target="_blank"
                      className="hover:text-white flex items-center gap-2"
                    >
                      <Instagram size={16} /> Instagram
                    </a>
                  </li>
                )}
                {socials.linkedin && (
                  <li>
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      className="hover:text-white flex items-center gap-2"
                    >
                      <Linkedin size={16} /> LinkedIn
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-white/20 pt-6 text-sm text-white/80 flex items-center justify-between">
            <p className="font-ar">
              {t(
                `© ${new Date().getFullYear()} Ayah Qur’an Tutor. All rights reserved.`,
                `© ${new Date().getFullYear()} جميع الحقوق محفوظة`,
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
