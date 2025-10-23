import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const { lang } = useLanguage();
  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);

  return (
    <div>
      {/* FAQ */}
      <section id="faq" className="container mx-auto py-20 md:py-32 px-4 md:px-0">
        <div className="mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-black uppercase text-shadow-sm">
            {t("Frequently asked questions", "الأسئلة الشائعة")}
          </h1>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base md:text-lg font-semibold hover:text-brand-deep transition-colors">
              {t("What makes AYAH Qur'an Tutor special?", "ما الذي يميز آية لتعليم القرآن الكريم؟")}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base text-slate-700">
              {t(
                "We don't just teach Qur'an, we nurture a love for it. Our lessons are interactive, gentle, and focused on helping children connect the words of Allah to their daily lives.",
                "لا نُعَلّم القرآن الكريم فحسب، بل نُنمّي حبّه في نفوس الأطفال. دروسنا تفاعلية، لطيفة، وتُركّز على مساعدة الأطفال على ربط آيات الله بحياتهم اليومية.",
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base md:text-lg font-semibold hover:text-brand-deep transition-colors">
              {t("What will my child learn?", "ماذا سيتعلم طفلي؟")}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base text-slate-700">
              {t(
                "Students will learn proper Qur'an recitation (tajweed), memorization, and the meanings and stories behind the surahs from Juz' Amma, helping them connect deeply with the Qur'an.",
                "سيتعلم الطلاب التلاوة الصحيحة للقرآن الكريم (التجويد)، والحفظ، ومعاني وقصص سور جزء عمّ، مما يُساعدهم على التواصل العميق مع القرآن الكريم.",
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base md:text-lg font-semibold hover:text-brand-deep transition-colors">
              {t("How are the classes held?", "كيف تُعقد الدروس؟")}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base text-slate-700">
              {t(
                "All classes are conducted online via Zoom, allowing students to learn comfortably from home.",
                "جميع الدروس تُعقد عبر الإنترنت عبر تطبيق زووم، مما يُتيح للطلاب التعلم براحة من المنزل.",
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-base md:text-lg font-semibold hover:text-brand-deep transition-colors">
              {t("Do you offer group or private lessons?", "هل تُقدّمون دروسًا جماعية أم خاصة؟")}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base text-slate-700">
              {t(
                "We currently offer both private (1-on-1) and small-group lessons, allowing students to learn in the environment that suits them best.",
                "نُقدّم حاليًا دروسًا خاصة (فردية) ودروسًا في مجموعات صغيرة، مما يُتيح للطلاب التعلّم في البيئة الأنسب لهم.",
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-base md:text-lg font-semibold hover:text-brand-deep transition-colors">
              {t("How long is each class?", "ما مدة كل حصة؟")}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base text-slate-700">
              {t(
                "Each class lasts for 60 minutes.",
                "مدة كل حصة 60 دقيقة.",
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-base md:text-lg font-semibold hover:text-brand-deep transition-colors">
              {t("How can I register my child?", "كيف يُمكنني تسجيل طفلي؟")}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base text-slate-700">
              {t(
                "You can fill out the registration form on WhatsApp. Once submitted, we'll contact you to schedule your child's free trial class.",
                "يمكنك تعبئة نموذج التسجيل عبر واتساب. بعد إرساله، سنتواصل معك لتحديد موعد الحصة التجريبية المجانية لطفلك.",
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-base md:text-lg font-semibold hover:text-brand-deep transition-colors">
              {t("How can I make the payment?", "كيف يمكنني الدفع؟")}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base text-slate-700">
              {t(
                "Payments will be discussed individually on a case-by-case basis.",
                "سيتم مناقشة الدفعات بشكل فردي لكل حالة على حدة.",
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger className="text-base md:text-lg font-semibold hover:text-brand-deep transition-colors">
              {t("Do you offer a free trial?", "هل تقدمون تجربة مجانية؟")}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base text-slate-700">
              {t(
                "Yes, every new student receives a free trial to meet the teacher and experience our learning style.",
                "نعم، يحصل كل طالب جديد على تجربة مجانية للتعرّف على المعلمة وطريقة التعلم.",
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-9">
            <AccordionTrigger className="text-base md:text-lg font-semibold hover:text-brand-deep transition-colors">
              {t("What ages do you teach?", "ما الأعمار التي نُدرّسها؟")}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base text-slate-700">
              {t(
                "Children ages 6–12 and girls/women 12+.",
                "الأطفال من 6 إلى 12 سنة، والفتيات/النساء 12+.",
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-10">
            <AccordionTrigger className="text-base md:text-lg font-semibold hover:text-brand-deep transition-colors">
              {t("Which time zones do you support?", "ما المناطق الزمنية المتاحة؟")}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base text-slate-700">
              {t(
                "We accommodate multiple time zones with flexible scheduling. Let us know your availability.",
                "نوفّر جداول مرنة لمناطق زمنية متعددة. شاركونا الوقت المناسب لكم.",
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
