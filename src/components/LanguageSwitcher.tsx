/**
 * Language Switcher Component (Dropdown Design)
 *
 * Dropdown selector for switching between Portuguese, English, and Spanish.
 * Preserves the current path when switching languages.
 *
 * Usage:
 * ```tsx
 * <LanguageSwitcher currentLocale="pt" />
 * ```
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Locale, replaceLocaleInPathname } from '@/lib/i18n';

export interface LanguageSwitcherProps {
  /** Current active locale */
  currentLocale: Locale;
  /** Custom CSS classes */
  className?: string;
}

const localeConfig = {
  pt: { flag: '/Br.svg', label: 'PT', title: 'Português' },
  en: { flag: '/Eng.svg', label: 'EN', title: 'English' },
  es: { flag: '/Es.svg', label: 'ES', title: 'Español' }
};

export function LanguageSwitcher({ currentLocale, className = '' }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentConfig = localeConfig[currentLocale];

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    const newPath = replaceLocaleInPathname(pathname, newLocale);
    router.push(newPath);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#ad8a6c]/10 hover:bg-[#ad8a6c]/20 transition-all duration-200 cursor-pointer border border-[#ad8a6c]/20"
        aria-label={`Current language: ${currentConfig.title}. Click to change.`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Image src={currentConfig.flag} alt={currentConfig.label} width={20} height={20} />
        <span className="text-sm font-raleway font-medium text-[#421d13]">{currentConfig.label}</span>
        <svg
          className={`w-4 h-4 text-[#421d13] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[140px] bg-white rounded-lg shadow-xl border border-[#ad8a6c]/20 overflow-hidden z-50">
          {Object.entries(localeConfig).map(([locale, config]) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale as Locale)}
              className={`w-full flex items-center gap-2 px-4 py-3 transition-colors duration-200 ${
                locale === currentLocale
                  ? 'bg-[#ad8a6c]/10 text-[#421d13] font-semibold'
                  : 'text-[#6b6763] hover:bg-[#ad8a6c]/5 hover:text-[#421d13]'
              }`}
              aria-label={`Switch to ${config.title}`}
              title={config.title}
            >
              <Image src={config.flag} alt={config.label} width={20} height={20} />
              <span className="text-sm font-raleway flex-1 text-left">{config.label}</span>
              {locale === currentLocale && (
                <svg className="w-4 h-4 text-[#ad8a6c]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
