import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "en" | "ar";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    return saved === "ar" || saved === "en" ? saved : "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => ({ lang, setLang, toggle: () => setLang(lang === "en" ? "ar" : "en") }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
