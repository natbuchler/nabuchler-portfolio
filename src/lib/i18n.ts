/**
 * Internationalization (i18n) Helper
 *
 * Provides type-safe translation functions for the portfolio.
 * Supports English (en) and Portuguese (pt) locales.
 *
 * Usage:
 * ```tsx
 * import { getTranslations } from '@/lib/i18n';
 *
 * const t = getTranslations('pt');
 * console.log(t.hero.greeting); // "Hey, I'm Natasha Buchler,"
 * ```
 */

import en from '@/locales/en.json';
import pt from '@/locales/pt.json';
import es from '@/locales/es.json';

export type Locale = 'en' | 'pt' | 'es';

export const locales: Locale[] = ['en', 'pt', 'es'];
export const defaultLocale: Locale = 'en';

const translations = { en, pt, es } as const;

/**
 * Get all translations for a specific locale
 */
export function getTranslations(locale: Locale) {
  return translations[locale];
}

/**
 * Get a specific translation value by dot-notation key
 *
 * @example
 * ```tsx
 * t('pt', 'hero.greeting') // "Hey, I'm Natasha Buchler,"
 * t('en', 'nav.about') // "About"
 * ```
 */
export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      console.warn(`Translation key "${key}" not found for locale "${locale}"`);
      return key;
    }
  }

  return value;
}

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get locale from pathname
 * @example /pt/cases/3tpm → 'pt'
 */
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const potentialLocale = segments[0];

  if (potentialLocale && isValidLocale(potentialLocale)) {
    return potentialLocale;
  }

  return defaultLocale;
}

/**
 * Replace locale in pathname
 * @example replaceLocaleInPathname('/pt/cases/3tpm', 'en') → '/en/cases/3tpm'
 */
export function replaceLocaleInPathname(pathname: string, newLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] && isValidLocale(segments[0])) {
    segments[0] = newLocale;
  } else {
    segments.unshift(newLocale);
  }

  return '/' + segments.join('/');
}
