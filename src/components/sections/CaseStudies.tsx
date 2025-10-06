/**
 * Case Studies Section
 *
 * Source: Figma node 3211:1219
 */

'use client';

import React from 'react';
import { TitleSubTitle } from '@/components/ui/Typography';
import { CardCase } from '@/components/ui/Card';

// Images from public folder
const IMG_PHONE = "/Photo arm.png";
const IMG_MEDITATION = "/pexels-elly-fairytale-3823207-1.jpg";

export default function CaseStudies() {
  return (
    <section id="cases" className="py-12 md:py-20" data-node-id="3211:1219">
      <div className="mx-auto px-4 md:px-8 max-w-[1280px]">
        <div className="space-y-12">
          <TitleSubTitle title="Case studies" />

          <div className="space-y-11 flex flex-col items-center">
            <CardCase
              side="Right"
              title="3TPM - Global Product Architecture"
              description="Led the design and implementation of a comprehensive product architecture framework across 32 countries, resulting in 150% growth in experimentation."
              image={IMG_PHONE}
              bgVariant="light"
              onClick={() => window.location.href = '/cases/3tpm'}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
