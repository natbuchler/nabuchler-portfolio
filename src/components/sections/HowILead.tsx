/**
 * How I Lead Section
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TitleSubTitle } from '@/components/ui/Typography';
import { CardInsight } from '@/components/ui/Card';
import { Locale, getTranslations } from '@/lib/i18n';

interface HowILeadProps {
  locale: Locale;
}

export default function HowILead({ locale }: HowILeadProps) {
  const t = getTranslations(locale);

  return (
    <section id="leadership" className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="space-y-12 max-w-6xl mx-auto">
          <TitleSubTitle
            title={t.howILead.title}
            subtitle={t.howILead.subtitle}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardInsight
              icon="medal"
              title={t.howILead.insights.crossFunctional.title}
              description={t.howILead.insights.crossFunctional.description}
            />
            <CardInsight
              icon="strategy"
              title={t.howILead.insights.balanced.title}
              description={t.howILead.insights.balanced.description}
            />
            <CardInsight
              icon="lamp"
              title={t.howILead.insights.inclusive.title}
              description={t.howILead.insights.inclusive.description}
            />
            <CardInsight
              icon="puzzle"
              title={t.howILead.insights.problemFraming.title}
              description={t.howILead.insights.problemFraming.description}
            />
          </div>

          <motion.div
            className="text-center max-w-4xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-6 left-[90%] md:top-1 md:left-[95%] w-[158px] h-[115px]">
              <Image
                src="/quote.svg"
                alt="Quote"
                fill
                className="object-contain opacity-10"
              />
            </div>
            <blockquote className="font-playfair font-bold text-xl md:text-3xl text-[#6b6763] leading-relaxed">
              &ldquo;{t.howILead.quote}&rdquo;
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
