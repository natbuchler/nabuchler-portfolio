/**
 * 3TPM - Global Product Architecture Case Study
 *
 * Server Component wrapper that handles locale params
 */

import React from 'react';
import { Locale } from '@/lib/i18n';
import Case3TPMClient from './Case3TPMClient';

export default async function Case3TPM({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return <Case3TPMClient locale={locale} />;
}
