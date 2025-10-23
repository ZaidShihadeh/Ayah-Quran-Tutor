import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import React from "react";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);
  const [isProcessing, setIsProcessing] = React.useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            {t("Your cart is empty", "سلتك فارغة")}
          </h1>
          <p className="text-slate-600 mb-8 max-w-prose">
            {t(
              "Add some lessons to get started with your learning journey.",
              "أضف بعض الدروس للبدء برحلة التعلم الخاصة بك."
            )}
          </p>
          <Button
            onClick={() => navigate("/")}
            className="rounded-full bg-brand-cyan text-white hover:bg-brand-cyan/90 px-8 py-3 h-auto uppercase tracking-wider font-extrabold"
          >
            {t("Browse Lessons", "استعرض الدروس")}
          </Button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      clearCart();
      
      const userEmail = localStorage.getItem("userEmail") || "user@example.com";
      const orderId = `ORD-${Date.now()}`;
      
      localStorage.setItem("lastOrder", JSON.stringify({
        orderId,
        email: userEmail,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice,
        timestamp: new Date().toISOString(),
      }));
      
      toast({
        title: t("Payment Successful!", "نجح الدفع!"),
        description: t("Your payment has been processed. Redirecting to confirmation...", "تم معالجة دفعتك. إعادة التوجيه إلى تأكيد..."),
      });
      
      setTimeout(() => {
        navigate("/success");
      }, 1500);
    } catch (error) {
      toast({
        title: t("Payment Error", "خطأ في الدفع"),
        description: t("An error occurred during payment. Please try again.", "حدث خطأ أثناء الدفع. يرجى المحاولة مرة أخرى."),
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-0 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-brand-cyan hover:text-brand-cyan/80 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">{t("Back", "رجوع")}</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-black text-shadow">
            {t("Checkout", "الدفع")}
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8">
              <h2 className="text-2xl font-black mb-6">{t("Order Summary", "ملخص الطلب")}</h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base md:text-lg text-shadow">{item.name}</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                        disabled={isProcessing}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                        disabled={isProcessing}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-right flex-shrink-0 w-20">
                      <p className="font-bold text-lg text-brand-purple">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors flex-shrink-0"
                      disabled={isProcessing}
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 md:p-8 sticky top-24">
              <h2 className="text-xl font-black mb-6">{t("Order Total", "إجمالي الطلب")}</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{t("Subtotal", "المجموع الجزئي")}</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{t("Tax", "الضريبة")}</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{t("Shipping", "الشحن")}</span>
                  <span className="font-semibold">{t("Free", "مجاني")}</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mb-8">
                <span className="text-lg font-black">{t("Total", "الإجمالي")}</span>
                <span className="text-4xl font-black text-brand-purple">${totalPrice.toFixed(2)}</span>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full rounded-full bg-brand-cyan text-white hover:bg-brand-cyan/90 disabled:bg-slate-400 px-6 py-4 h-auto transition-all duration-300 hover:scale-105 hover:shadow-lg uppercase tracking-wider font-extrabold"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    {t("Processing", "جاري المعالجة")}
                  </span>
                ) : (
                  t("Complete Payment", "إكمال الدفع")
                )}
              </Button>

              <p className="text-xs text-slate-500 text-center mt-4">
                {t("Your payment information is secure", "معلومات دفعك آمنة")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
