import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, MailOpen, Clock } from "lucide-react";
import React from "react";

interface OrderData {
  orderId: string;
  email: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalPrice: number;
  timestamp: string;
}

export default function Success() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);
  const [orderData, setOrderData] = React.useState<OrderData | null>(null);

  React.useEffect(() => {
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      setOrderData(JSON.parse(lastOrder));
    }
  }, []);

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-green-50 to-slate-50 px-4 md:px-0">
      <div className="container mx-auto py-8 md:py-16">
        {/* Success Message */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-2xl animate-pulse" />
              <CheckCircle2 className="relative w-24 h-24 md:w-32 md:h-32 text-green-500 animate-bounce-in" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-shadow mb-4">
            {t("Payment Successful!", "نجح الدفع!")}
          </h1>

          <p className="text-lg md:text-xl text-slate-700 mb-2">
            {t("Thank you for your purchase", "شكراً لك على شرائك")}
          </p>

          <p className="text-slate-600 max-w-prose mx-auto mb-8">
            {t(
              "Your payment has been processed successfully. You now have access to all lesson materials. A confirmation email has been sent to your email address.",
              "تمت معالجة دفعتك بنجاح. لديك الآن إمكانية الوصول إلى جميع مواد الدرس. تم إرسال بريد إلكتروني للتأكيد إلى عنوان بريدك الإلكتروني."
            )}
          </p>
        </div>

        {/* Order Details */}
        {orderData && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-slate-200 p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-black mb-6">{t("Order Details", "تفاصيل الطلب")}</h2>

            <div className="space-y-4 mb-8 pb-8 border-b border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-600">{t("Order ID", "رقم الطلب")}</span>
                <span className="font-mono font-bold text-brand-purple">{orderData.orderId}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">{t("Email", "البريد الإلكتروني")}</span>
                <span className="font-semibold">{orderData.email}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">{t("Date", "التاريخ")}</span>
                <span className="font-semibold">
                  {new Date(orderData.timestamp).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4">{t("Purchased Items", "العناصر المشتراة")}</h3>
              <div className="space-y-3">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-slate-600">
                        {t("Quantity", "الكمية")}: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-brand-purple">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-6 border-t border-slate-200">
              <span className="text-lg font-bold">{t("Total Paid", "المبلغ المدفوع")}</span>
              <span className="text-3xl font-black text-brand-purple">${orderData.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg bg-brand-cyan/10 grid place-items-center flex-shrink-0">
                <MailOpen className="text-brand-cyan" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{t("Check Your Email", "تحقق من بريدك الإلكتروني")}</h3>
                <p className="text-slate-600 text-sm">
                  {t(
                    "A confirmation email with your order details and access instructions has been sent.",
                    "تم إرسال بريد إلكتروني للتأكيد يتضمن تفاصيل طلبك وتعليمات الوصول."
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg bg-brand-cyan/10 grid place-items-center flex-shrink-0">
                <Download className="text-brand-cyan" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{t("Download Materials", "تحميل المواد")}</h3>
                <p className="text-slate-600 text-sm">
                  {t(
                    "All lesson materials are available for download in your account. Check back soon for your materials!",
                    "جميع مواد الدرس متاحة للتحميل في حسابك. عد قريباً للتحقق من مادتك!"
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg bg-brand-cyan/10 grid place-items-center flex-shrink-0">
                <Clock className="text-brand-cyan" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{t("Lifetime Access", "الوصول مدى الحياة")}</h3>
                <p className="text-slate-600 text-sm">
                  {t(
                    "You have permanent access to all purchased lesson materials. Learn at your own pace, anytime.",
                    "لديك وصول دائم إلى جميع مواد الدرس المشتراة. تعلم بناءً على سرعتك الخاصة، في أي وقت."
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg bg-brand-cyan/10 grid place-items-center flex-shrink-0">
                <span className="text-brand-cyan font-bold">?</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{t("Need Help?", "هل تحتاج إلى مساعدة؟")}</h3>
                <p className="text-slate-600 text-sm">
                  {t(
                    "Contact us at support for any questions about your purchase or materials.",
                    "اتصل بنا للحصول على الدعم في حالة وجود أي أسئلة حول شرائك أو مادتك."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/")}
            className="rounded-full bg-brand-cyan text-white hover:bg-brand-cyan/90 px-8 py-3 h-auto uppercase tracking-wider font-extrabold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {t("Back to Home", "العودة إلى الصفحة الرئيسية")}
          </Button>

          <Button
            onClick={() => navigate("/lessons")}
            variant="outline"
            className="rounded-full border-2 border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10 px-8 py-3 h-auto uppercase tracking-wider font-extrabold transition-all duration-300 hover:scale-105"
          >
            {t("Browse More Lessons", "استعرض المزيد من الدروس")}
          </Button>
        </div>
      </div>
    </div>
  );
}
