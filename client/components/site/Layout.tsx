import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Layout() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-[76px]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
