/**
 * Language Switcher Component
 *
 * Allows users to toggle between Portuguese and English.
 * Preserves the current path when switching languages.
 *
 * Usage:
 * ```tsx
 * <LanguageSwitcher currentLocale="pt" />
 * ```
 */

'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { Locale, replaceLocaleInPathname } from '@/lib/i18n';

export interface LanguageSwitcherProps {
  /** Current active locale */
  currentLocale: Locale;
  /** Custom CSS classes */
  className?: string;
}

export function LanguageSwitcher({ currentLocale, className = '' }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    const newPath = replaceLocaleInPathname(pathname, newLocale);
    router.push(newPath);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => switchLocale('pt')}
        className={`flex items-center gap-1 px-2 py-1 rounded transition-all duration-200 cursor-pointer ${
          currentLocale === 'pt'
            ? 'bg-[#ad8a6c]/20 text-[#421d13] font-semibold'
            : 'text-[#6b6763] hover:text-[#421d13] opacity-60 hover:opacity-100'
        }`}
        aria-label="Switch to Portuguese"
        title="Português"
      >
        <Image src="/Br.svg" alt="PT" width={20} height={20} />
        <span className="text-sm font-raleway">PT</span>
      </button>

      <div className="w-px h-4 bg-[#ad8a6c]/30"></div>

      <button
        onClick={() => switchLocale('en')}
        className={`flex items-center gap-1 px-2 py-1 rounded transition-all duration-200 cursor-pointer ${
          currentLocale === 'en'
            ? 'bg-[#ad8a6c]/20 text-[#421d13] font-semibold'
            : 'text-[#6b6763] hover:text-[#421d13] opacity-60 hover:opacity-100'
        }`}
        aria-label="Switch to English"
        title="English"
      >
        <Image src="/Eng.svg" alt="EN" width={20} height={20} />
        <span className="text-sm font-raleway">EN</span>
      </button>
    </div>
  );
}
