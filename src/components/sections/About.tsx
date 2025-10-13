/**
 * About Section
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TitleSubTitle } from '@/components/ui/Typography';
import Button, { ButtonGroup } from '@/components/Button';
import { Locale, getTranslations } from '@/lib/i18n';

interface AboutProps {
  locale: Locale;
}

export default function About({ locale }: AboutProps) {
  const t = getTranslations(locale);

  return (
    <section id="about" className="py-20 md:py-24 border-t border-[#ad8a6c]/10 shadow-[inset_0_8px_16px_-8px_rgba(66,29,19,0.03)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="space-y-12 max-w-6xl mx-auto">
          <TitleSubTitle title={t.about.title} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full mx-auto">
                <Image
                  src="/Photo2.png"
                  alt="About Natasha"
                  width={1332}
                  height={1334}
                  className="object-contain w-full h-auto"
                />
                {/* Tags */}
                <div className="absolute top-14 left-4 bg-[#c95127] px-4 py-2 rounded-full">
                  <span className="font-roboto font-medium text-sm text-[#e3dcd6] uppercase tracking-wide">
                    {t.about.tags.globalLeader}
                  </span>
                </div>
                <div className="absolute bottom-14 right-14 bg-[#d0bfb0] px-4 py-2 rounded-full">
                  <span className="font-roboto font-medium text-sm text-[#421d13] uppercase tracking-wide">
                    {t.about.tags.experience}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 font-roboto-flex font-light text-lg md:text-xl text-[#6b6763] leading-relaxed">
                <p>{t.about.paragraph1}</p>
                <p>{t.about.paragraph2}</p>
                {t.about.paragraph3 && <p>{t.about.paragraph3}</p>}
              </div>

              <ButtonGroup>
                <Button
                  variant="primary"
                  className="hover:transform hover:-translate-y-0.5 shadow-md"
                  onClick={() => window.open(
                    locale === 'pt'
                      ? 'https://drive.google.com/file/d/1z0i9SkhLjH1SYk1k_LwFVJDwfzwdPw9b/view?usp=sharing'
                      : 'https://drive.google.com/file/d/1pgFkxrCPIAbWeVNLXP76RQqghEkD0VxU/view?usp=sharing',
                    '_blank'
                  )}
                >
                  {t.about.cta.cv}
                </Button>
                <Button
                  variant="secondary"
                  className="hover:transform hover:-translate-y-0.5"
                  onClick={() => window.open('https://medium.com/@nabuchler', '_blank')}
                >
                  {t.about.cta.articles}
                </Button>
              </ButtonGroup>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
