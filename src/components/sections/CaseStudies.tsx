/**
 * Case Studies Section
 *
 * Source: Figma node 3211:1219
 */

'use client';

import React from 'react';
import { TitleSubTitle } from '@/components/ui/Typography';
import { CardCase } from '@/components/ui/Card';
import { Locale, getTranslations } from '@/lib/i18n';

// Images from public folder
const IMG_PHONE = "/Photo arm.png";
const IMG_MEDITATION = "/pexels-elly-fairytale-3823207-1.jpg";

interface CaseStudiesProps {
  locale: Locale;
}

export default function CaseStudies({ locale }: CaseStudiesProps) {
  const t = getTranslations(locale);

  return (
    <section id="cases" className="py-20 md:py-24 border-t border-[#ad8a6c]/10 shadow-[inset_0_8px_16px_-8px_rgba(66,29,19,0.03)]" data-node-id="3211:1219">
      <div className="mx-auto px-4 md:px-8 max-w-[1280px]">
        <div className="space-y-12">
          <TitleSubTitle title={t.caseStudies.title} />

          <div className="space-y-11 flex flex-col items-center">
            <CardCase
              side="Right"
              title={t.caseStudies.case3tpm.title}
              description={t.caseStudies.case3tpm.description}
              image={IMG_PHONE}
              bgVariant="light"
              buttonText={t.caseStudies.diveDeeper}
              onClick={() => window.location.href = `/${locale}/cases/3tpm`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
