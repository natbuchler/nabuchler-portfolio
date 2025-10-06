/**
 * Experience Section
 */

'use client';

import React from 'react';
import { TitleSubTitle } from '@/components/ui/Typography';
import { CardExperience } from '@/components/ui/Card';
import Timeline, { TimelineItem } from '@/components/ui/Timeline';
import Button, { ButtonGroup } from '@/components/Button';
import { Locale, getTranslations } from '@/lib/i18n';

interface ExperienceProps {
  locale: Locale;
}

export default function Experience({ locale }: ExperienceProps) {
  const t = getTranslations(locale);

  return (
    <section id="experience" className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="space-y-12 max-w-6xl mx-auto">
          <TitleSubTitle
            title={t.experience.title}
            subtitle={t.experience.subtitle}
          />

          <Timeline lineImage="/Line-timeline.svg">
            <TimelineItem icon="ponto" iconColor="#421d13" index={0}>
              <CardExperience
                role={t.experience.jobs.stealth.role}
                company={t.experience.jobs.stealth.company}
                period={t.experience.jobs.stealth.period}
                description={t.experience.jobs.stealth.description}
                achievements={t.experience.jobs.stealth.achievements}
              />
            </TimelineItem>

            <TimelineItem icon="cy" iconColor="#c95127" index={1}>
              <CardExperience
                role={t.experience.jobs.abinbev.role}
                company={t.experience.jobs.abinbev.company}
                period={t.experience.jobs.abinbev.period}
                description={t.experience.jobs.abinbev.description}
                achievements={t.experience.jobs.abinbev.achievements}
              />
            </TimelineItem>

            <TimelineItem icon="ponto" iconColor="#421d13" index={2}>
              <CardExperience
                role={t.experience.jobs.vindi.role}
                company={t.experience.jobs.vindi.company}
                period={t.experience.jobs.vindi.period}
                description={t.experience.jobs.vindi.description}
                achievements={t.experience.jobs.vindi.achievements}
              />
            </TimelineItem>

            <TimelineItem icon="cy" iconColor="#c95127" index={3}>
              <CardExperience
                role={t.experience.jobs.zup.role}
                company={t.experience.jobs.zup.company}
                period={t.experience.jobs.zup.period}
                description={t.experience.jobs.zup.description}
                achievements={t.experience.jobs.zup.achievements}
              />
            </TimelineItem>
          </Timeline>

          <div className="flex justify-center">
            <ButtonGroup>
              <Button
                variant="primary"
                className="hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#421d13] focus:ring-opacity-50"
                onClick={() => window.open('https://drive.google.com/file/d/1pgFkxrCPIAbWeVNLXP76RQqghEkD0VxU/view?usp=sharing', '_blank')}
              >
                {t.experience.cta.cv}
              </Button>
              <Button
                variant="secondary"
                className="hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#421d13] focus:ring-opacity-50"
                onClick={() => window.open('https://medium.com/@nabuchler', '_blank')}
              >
                {t.experience.cta.articles}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
