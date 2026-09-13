"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, Locale, SUPPORTED_LANGUAGES } from "@/context/LanguageContext";
import FlagIcon from "./FlagIcon";

export default function LanguageSelector() {
  const { locale, setLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLang = SUPPORTED_LANGUAGES[locale] || SUPPORTED_LANGUAGES.es;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-nordic-dark/15 bg-white hover:bg-nordic-dark/5 text-nordic-dark text-sm font-medium transition-all shadow-xs hover:border-nordic-dark/30 focus:outline-none focus:ring-2 focus:ring-mosque/30"
        aria-haspopup="true"
        aria-expanded={isOpen}
        title={t("language.select")}
      >
        <FlagIcon country={currentLang.code} className="w-5 h-3.5" />
        <span className="text-xs uppercase font-semibold text-nordic-dark tracking-wider">
          {currentLang.code}
        </span>
        <span
          className={`material-icons text-base text-nordic-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-52 rounded-xl bg-white shadow-xl border border-nordic-dark/10 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
          role="menu"
        >
          <div className="px-3.5 py-1.5 text-[11px] font-bold text-nordic-muted uppercase tracking-wider border-b border-nordic-dark/5 mb-1">
            {t("language.select")}
          </div>

          {(Object.keys(SUPPORTED_LANGUAGES) as Locale[]).map((key) => {
            const lang = SUPPORTED_LANGUAGES[key];
            const isSelected = locale === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setLocale(key);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-left transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-mosque/10 text-mosque font-semibold"
                    : "text-nordic-dark hover:bg-nordic-dark/5"
                }`}
                role="menuitem"
              >
                <span className="flex items-center gap-3">
                  <FlagIcon country={lang.code} className="w-5 h-3.5" />
                  <span className="font-medium">{lang.nativeName}</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-xs uppercase text-nordic-muted font-normal">
                    {lang.code}
                  </span>
                  {isSelected && (
                    <span className="material-icons text-base text-mosque">check</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
