import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { lang } = useLanguage();
  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);

  return (
    <div className="min-h-screen bg-white mt-20">
      <div className="container mx-auto py-16 md:py-24 px-4 md:px-0">
        <h1 className="text-4xl md:text-5xl font-black uppercase text-shadow-sm mb-12">
          {t("Shopping Cart", "سلة التسوق")}
        </h1>

        {items.length === 0 ? (
          <div className="rounded-3xl border-2 border-slate-200 p-12 text-center">
            <p className="text-slate-600 text-lg mb-6">
              {t("Your cart is empty", "سلتك فارغة")}
            </p>
            <Link to="/">
              <Button className="rounded-full bg-brand-cyan text-white hover:bg-brand-cyan/90 px-8 py-3 h-auto font-extrabold">
                {t("Continue Shopping", "متابعة التسوق")}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 p-6 flex items-center justify-between hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                      <p className="text-slate-600 text-sm mb-4 capitalize">{item.type}</p>
                      <p className="text-brand-cyan font-extrabold text-lg">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 border border-slate-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-slate-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 font-semibold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-slate-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 hover:text-red-700"
                        aria-label="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-3xl bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10 p-8 sticky top-24">
                <h2 className="text-2xl font-black mb-6">{t("Order Summary", "ملخص الطلب")}</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-slate-700">
                    <span>{t("Subtotal", "المجموع الفرعي")}</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>{t("Shipping", "الشحن")}</span>
                    <span className="font-semibold">{t("Free", "مجاني")}</span>
                  </div>
                  <div className="h-px bg-slate-300"></div>
                  <div className="flex justify-between text-lg font-black">
                    <span>{t("Total", "الإجمالي")}</span>
                    <span className="text-brand-cyan">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full rounded-full bg-brand-cyan text-white hover:bg-brand-cyan/90 px-6 py-3 h-auto font-extrabold mb-3 transition-all duration-300 hover:scale-105">
                  {t("Checkout", "الدفع")}
                </Button>
                <button
                  onClick={clearCart}
                  className="w-full px-6 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-semibold"
                >
                  {t("Clear Cart", "مسح السلة")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
