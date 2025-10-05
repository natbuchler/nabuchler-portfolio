/**
 * How I Lead Section
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TitleSubTitle } from '@/components/ui/Typography';
import { CardInsight } from '@/components/ui/Card';

export default function HowILead() {
  return (
    <section id="leadership" className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="space-y-12 max-w-6xl mx-auto">
          <TitleSubTitle
            title="How I lead"
            subtitle="My approach to building design teams that deliver."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardInsight
              icon="medal"
              title="Cross-functional influence"
              description="Building bridges between design, engineering, product and business teams to create aligned, high-impact solutions."
            />
            <CardInsight
              icon="strategy"
              title="Balanced strategy"
              description="Combining user-centered design thinking with business objectives to deliver solutions that are both meaningful and measurable"
            />
            <CardInsight
              icon="lamp"
              title="Inclusive leadership"
              description="Fostering diverse, inclusive environments where every voice is heard and every perspective adds value to the creative process."
            />
            <CardInsight
              icon="puzzle"
              title="Problem framing"
              description="Approaching complex challenges with systematic thinking, clear problem definition, and data-driven decision making."
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
              &ldquo;Great design leadership isn&apos;t about having all the answers, it&apos;s about asking the right questions, creating the right environment, and empowering teams to discover solutions together.&rdquo;
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
