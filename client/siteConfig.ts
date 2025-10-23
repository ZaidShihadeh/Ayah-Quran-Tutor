export interface Lesson {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  duration?: string;
  level?: string;
  materials?: string[];
}

export const lessons: Lesson[] = [
  {
    id: "juz-amma",
    titleEn: "Juz' Amma",
    titleAr: "جزء عمّ",
    descriptionEn: "Complete memorization and understanding of Juz' Amma (the last chapter of the Quran). Learn proper recitation, tajweed, and the meanings of each Surah.",
    descriptionAr: "الحفظ الكامل والفهم العميق لجزء عمّ (الجزء الأخير من القرآن). تعلم التلاوة الصحيحة والتجويد ومعاني كل سورة.",
    price: 60,
    duration: "12 weeks",
    level: "Beginner to Intermediate",
  },
];

export const siteConfig = {
  seo: {
    title: "Ayah Qur’an Tutor — Islamic Online Tutors",
    description:
      "Small-group Qur’an tutoring for children and women. Gentle, structured lessons to build tajwīd, memorization, and love for the Qur’an.",
    favicon:
      "https://cdn.builder.io/api/v1/image/assets%2Fde2d2a0044c74319b934a0376ae98173%2Fb977a262e49d4b6c974a5d7da7bc7863?format=webp&width=256",
  },
  features: {
    showMaterials: false,
  },
  contacts: {
    email: "ayahqurantutor@gmail.com",
    whatsapp: "https://chat.whatsapp.com/C0FI3jlqcaUFTu8nmtF3Bk",
  },
  socials: {
    instagram:
      "https://www.instagram.com/ayah_quran_tutor/?igsh=NG9pYTdsc2cxcXI%3D&utm_source=qr",
    linkedin: "https://www.linkedin.com/company/ayah-quran-tutor",
  },
  assets: {
    logo: "https://cdn.builder.io/api/v1/image/assets%2Fde2d2a0044c74319b934a0376ae98173%2Fb977a262e49d4b6c974a5d7da7bc7863?format=webp&width=800",
  },
  lessons,
} as const;
