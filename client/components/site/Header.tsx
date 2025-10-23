import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/siteConfig";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollSpy } from "@/hooks/use-intersection-observer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { Menu, X, Instagram, Linkedin, ShoppingCart, User, LogOut } from "lucide-react";

export default function Header() {
  const { lang, toggle } = useLanguage();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(["hero", "offerings"]);
  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("Home", "الرئيسية"), hash: "hero" },
    { label: t("Offerings", "العروض"), hash: "offerings" },
    { label: t("Lessons", "الدروس"), href: "/lessons" },
    { label: t("Team", "الفريق"), href: "/team" },
    { label: t("Contact", "تواصل"), href: "/contact" },
    { label: t("About", "من نحن"), href: "/about" },
    { label: t("FAQ", "الأسئلة"), href: "/faq" },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleHashNavigation = (hash: string) => {
    closeMobileMenu();
    navigate(`/#${hash}`);
    const element = document.querySelector(`#${hash}`);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled
        ? "backdrop-blur-md supports-[backdrop-filter]:bg-white/70 bg-white/90 shadow-lg"
        : "backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-white/40"
    }`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        <Link to="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0" onClick={closeMobileMenu}>
          {lang === "ar" ? (
            <span className="font-ar text-lg md:text-2xl font-extrabold tracking-tight">
              آية لتعليم القرآن
            </span>
          ) : (
            <span className="text-lg md:text-2xl font-extrabold tracking-tight">
              Ayah Qur'an Tutor
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {navLinks.map((link) => {
            const isActive = activeSection === link.hash;
            return link.href ? (
              <Link key={link.href} to={link.href} className="hover:text-brand-deep transition-colors">
                {link.label}
              </Link>
            ) : (
              <button
                key={link.hash}
                onClick={() => handleHashNavigation(link.hash!)}
                className={`transition-colors cursor-pointer relative ${
                  isActive ? "text-brand-deep font-extrabold" : "hover:text-brand-deep"
                }`}
              >
                {link.label}
                {isActive && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-cyan rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={siteConfig.socials?.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 hover:text-brand-purple"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.linkedin.com/company/ayah-quran-tutor"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 hover:text-brand-purple cursor-pointer"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <Link
            to="/cart"
            className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 hover:text-brand-purple"
            aria-label="Shopping cart"
            onClick={closeMobileMenu}
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-brand-cyan text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 hover:text-brand-purple"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          ) : (
            <Link
              to="/login"
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 hover:text-brand-purple"
              aria-label="Login"
              onClick={closeMobileMenu}
            >
              <User size={18} />
            </Link>
          )}
          <button
            onClick={toggle}
            className="text-xs font-bold tracking-wider px-3 py-1 rounded-full border border-slate-300 hover:border-slate-400 transition-colors"
          >
            {lang === "en" ? "العربية" : "EN"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            className="text-xs font-bold tracking-wider px-2 py-1 rounded-full border border-slate-300 hover:border-slate-400 transition-colors"
          >
            {lang === "en" ? "AR" : "EN"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden border-t border-white/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              link.href ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeMobileMenu}
                  className="py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors font-semibold text-sm"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.hash}
                  onClick={() => handleHashNavigation(link.hash!)}
                  className="py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors font-semibold text-sm text-left"
                >
                  {link.label}
                </button>
              )
            ))}
            <div className="pt-3 flex gap-2 border-t border-slate-200">
              <a
                href={siteConfig.socials?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700 hover:text-brand-purple"
              >
                <Instagram size={16} />
                <span className="text-xs font-semibold">Instagram</span>
              </a>
              <a
                href={siteConfig.socials?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700 hover:text-brand-purple"
              >
                <Linkedin size={16} />
                <span className="text-xs font-semibold">LinkedIn</span>
              </a>
            </div>
            <div className="pt-2 flex gap-2">
              <Link
                to="/cart"
                onClick={closeMobileMenu}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700 hover:text-brand-purple relative"
              >
                <ShoppingCart size={16} />
                <span className="text-xs font-semibold">{t("Cart", "السلة")}</span>
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-cyan text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                    {totalItems}
                  </span>
                )}
              </Link>
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700 hover:text-brand-purple"
                >
                  <LogOut size={16} />
                  <span className="text-xs font-semibold">{t("Logout", "خروج")}</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-slate-700 hover:text-brand-purple"
                >
                  <User size={16} />
                  <span className="text-xs font-semibold">{t("Login", "دخول")}</span>
                </Link>
              )}
            </div>
            <Link to="/signup" onClick={closeMobileMenu} className="pt-2">
              <Button className="w-full rounded-full bg-brand-cyan text-white hover:bg-brand-cyan/90 px-4 py-3 h-auto uppercase tracking-wide font-extrabold transition-colors">
                {t("Sign Up", "سجل الآن")}
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
