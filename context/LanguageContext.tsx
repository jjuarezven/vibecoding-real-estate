"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

import en from "@/locales/en.json";
import es from "@/locales/es.json";
import fr from "@/locales/fr.json";
import favoritesTranslations from "@/locales/favorites.json";

export type Locale = "en" | "es" | "fr";

export interface LanguageInfo {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: Record<Locale, LanguageInfo> = {
  en: { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  es: { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸'" },
  fr: { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷'" },
};

export const DEFAULT_LOCALE: Locale = "es";
export const COOKIE_NAME = "NEXT_LOCALE";

const translations: Record<Locale, any> = { en, es, fr };

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  languages: typeof SUPPORTED_LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const savedLocale = Cookies.get(COOKIE_NAME) as Locale | undefined;
    if (savedLocale && SUPPORTED_LANGUAGES[savedLocale]) {
      setLocaleState(savedLocale);
    } else {
      const browserLang = typeof navigator !== "undefined" ? navigator.language.slice(0, 2) : "";
      if (browserLang && (browserLang === "en" || browserLang === "es" || browserLang === "fr")) {
        setLocaleState(browserLang);
        Cookies.set(COOKIE_NAME, browserLang, { expires: 365, path: "/" });
      } else {
        Cookies.set(COOKIE_NAME, DEFAULT_LOCALE, { expires: 365, path: "/" });
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    if (SUPPORTED_LANGUAGES[newLocale]) {
      setLocaleState(newLocale);
      Cookies.set(COOKIE_NAME, newLocale, { expires: 365, path: "/" });
    }
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const keys = key.split(".");
      const getNested = (obj: any): any => keys.reduce(
        (acc, currentKey) => (acc && acc[currentKey] !== undefined ? acc[currentKey] : undefined),
        obj,
      );

      let text = getNested(translations[locale]) ?? getNested(translations.es) ?? getNested(translations.en);
      if (typeof text !== "string") {
        const localized = getNested((favoritesTranslations as Record<Locale, unknown>)[locale]);
        const fallbackEs = getNested((favoritesTranslations as Record<Locale, unknown>).es);
        const fallbackEn = getNested((favoritesTranslations as Record<Locale, unknown>).en);
        text = localized ?? fallbackEs ?? fallbackEn;
      }
      if (typeof text !== "string") return key;

      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          text = text.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramValue));
        });
      }
      return text;
    },
    [locale],
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  return context;
}

export function useTranslation() {
  return useLanguage();
}
