/**
 * Portfolio Main Page
 *
 * Natasha Buchler's portfolio showcasing design leadership experience.
 * Refactored using modular components and design system architecture.
 */

import React from 'react';
import { Locale } from '@/lib/i18n';
import PortfolioClient from './PortfolioClient';

export default async function Portfolio({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return <PortfolioClient locale={locale} />;
}
