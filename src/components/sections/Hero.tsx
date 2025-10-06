/**
 * Hero Section Component
 *
 * Main landing section with:
 * - Animated photo backdrop (desktop only, xl+ breakpoint)
 * - Hero headline and description
 * - Call-to-action buttons
 * - Responsive layout with mobile-first approach
 *
 * @component
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Icon from '@/components/ui/Icon';
import Button, { ButtonGroup } from '@/components/Button';
import { Locale, getTranslations } from '@/lib/i18n';

interface HeroProps {
  /** Callback to scroll to a specific section */
  onScrollToSection: (sectionId: string) => void;
  /** Current locale */
  locale: Locale;
}

export default function Hero({ onScrollToSection, locale }: HeroProps) {
  const t = getTranslations(locale);

  return (
    <section id="hero" className="relative md:h-[700px] md:-mt-[80px] md:pt-[80px] overflow-x-hidden">
      {/* Photo backdrop - Desktop only (xl+ = 1280px+) - starts from top of section (including negative margin) */}
      <motion.div
        className="hidden xl:block absolute top-0 right-0 w-[772px] h-[700px] z-0"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Image
          src="/photo.png"
          alt="Natasha Buchler"
          width={772}
          height={700}
          className="object-cover object-top"
          priority
        />
      </motion.div>

      {/* Content container */}
      <div className="relative z-10 w-full overflow-x-hidden">
        {/* Mobile Layout - Image above text - NO ANIMATIONS */}
        <div className="block md:hidden">
          {/* Mobile Photo - NO ANIMATION */}
          <div className="w-full flex justify-center pt-8 pb-6">
            <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden">
              <Image
                src="/Foto-Natasha.png"
                alt="Natasha Buchler"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Mobile Content - NO ANIMATION */}
          <div className="px-8 pb-8">
            <div className="space-y-6">
              <h1 className="font-playfair font-bold text-3xl text-[#421d13] leading-[1.2] text-center">
                {t.hero.greeting}
              </h1>

              <p className="font-roboto-flex font-light text-base text-[#6b6763] leading-relaxed text-center">
                {t.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  onClick={() => onScrollToSection('cases')}
                >
                  {t.hero.cta.cases}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => onScrollToSection('leadership')}
                >
                  {t.hero.cta.leadership}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Text with image behind - WITH ANIMATIONS */}
        <div className="hidden md:block">
          <div className="mx-auto px-4 md:px-8 pt-[110px] max-w-[1280px]">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-8">
                <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl text-[#421d13] leading-[1.2]">
                  {t.hero.greeting}
                </h1>

                <p className="font-roboto-flex font-light text-lg md:text-2xl text-[#6b6763] leading-relaxed">
                  {t.hero.description}
                </p>

                <ButtonGroup>
                  <Button
                    variant="primary"
                    onClick={() => onScrollToSection('cases')}
                    className="hover:transform hover:-translate-y-0.5 shadow-md"
                  >
                    {t.hero.cta.cases}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => onScrollToSection('leadership')}
                    className="hover:transform hover:-translate-y-0.5"
                  >
                    {t.hero.cta.leadership}
                  </Button>
                </ButtonGroup>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
