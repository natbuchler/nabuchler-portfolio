/**
 * i18n Middleware
 *
 * Handles automatic locale detection and redirection for internationalization.
 * Redirects users to the appropriate locale-prefixed URL based on:
 * 1. Current URL locale prefix
 * 2. Accept-Language header
 * 3. Default locale (pt)
 *
 * Examples:
 * - / → /pt
 * - /about → /pt/about
 * - /en/about → /en/about (no redirect)
 */

import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, isValidLocale } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for:
  // - API routes
  // - Next.js internals (_next)
  // - Static files (images, fonts, etc.)
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a valid locale
  const segments = pathname.split('/').filter(Boolean);
  const potentialLocale = segments[0];

  if (potentialLocale && isValidLocale(potentialLocale)) {
    // URL already has valid locale, continue
    return NextResponse.next();
  }

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  let detectedLocale = defaultLocale;

  if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7")
    const languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].split('-')[0].trim());

    // Find first matching locale
    for (const lang of languages) {
      if (isValidLocale(lang)) {
        detectedLocale = lang;
        break;
      }
    }
  }

  // Redirect to locale-prefixed URL
  const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  // Match all paths except those starting with:
  // - /api
  // - /_next
  // - Files with extensions (images, fonts, etc.)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
