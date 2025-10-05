/**
 * Experience Section
 */

'use client';

import React from 'react';
import { TitleSubTitle } from '@/components/ui/Typography';
import { CardExperience } from '@/components/ui/Card';
import Timeline, { TimelineItem } from '@/components/ui/Timeline';
import Button, { ButtonGroup } from '@/components/Button';

export default function Experience() {
  return (
    <section id="experience" className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="space-y-12 max-w-6xl mx-auto">
          <TitleSubTitle
            title="Experience"
            subtitle="A journey of building design organizations, scaling impact, and leading teams across global markets."
          />

          <Timeline lineImage="/Line-timeline.svg">
            <TimelineItem icon="ponto" iconColor="#421d13" index={0}>
              <CardExperience
                role="Service Design Consultant"
                company="Stealth AI Startup"
                period="June 2025 - Present"
                description="Defined UX vision and product narrative for AI solutions in a regulated sector, balancing innovation, governance, and user clarity."
                achievements={[
                  "Built scalable service design systems",
                  "Facilitated stakeholder alignment",
                  "Ensured product consistency and replicability"
                ]}
              />
            </TimelineItem>

            <TimelineItem icon="cy" iconColor="#c95127" index={1}>
              <CardExperience
                role="Global Product Design Manager"
                company="AB InBev"
                period="May 2022 - Sep 2025"
                description="Own the strategic UX for BEES, a global B2B commerce platform operating in 30+ countries."
                achievements={[
                  "Lead core product journey teams",
                  "Manage distributed design team",
                  "Co-created global design career framework"
                ]}
              />
            </TimelineItem>

            <TimelineItem icon="ponto" iconColor="#421d13" index={2}>
              <CardExperience
                role="Design Coordinator"
                company="Vindi"
                period="Aug 2020 – June 2021"
                description="Managed DesignOps, Product Designers, and UX Research for fintech platform."
                achievements={[
                  "Created design career path",
                  "Expanded team delivery capacity",
                  "Promoted metric-driven design"
                ]}
              />
            </TimelineItem>

            <TimelineItem icon="cy" iconColor="#c95127" index={3}>
              <CardExperience
                role="Payment Strategy & UX Lead"
                company="Zup Innovation"
                period="Mar 2019 – Jul 2020"
                description="Led UX strategy for telecom and finance products, directing redesigns and unified visions."
                achievements={[
                  "Redesigned Safra Bank app",
                  "Defined Claro & Nextel payment solution",
                  "Conducted discovery and research workshops"
                ]}
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
                Download CV
              </Button>
              <Button
                variant="secondary"
                className="hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#421d13] focus:ring-opacity-50"
                onClick={() => window.open('https://medium.com/@nabuchler', '_blank')}
              >
                Read my articles
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
