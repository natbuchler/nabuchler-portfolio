/**
 * Typography Component
 *
 * Provides consistent typography components following the design system.
 * All typography uses design tokens for fonts, sizes, and colors.
 *
 * @component
 * @example
 * ```tsx
 * <TitleSubTitle title="Section Title" subtitle="Optional subtitle" />
 * ```
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { colors, typography } from '@/lib/design-tokens';

export interface TitleSubTitleProps {
  /** Main title text */
  title: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Custom CSS classes */
  className?: string;
}

/**
 * Section header component with title, decorative underline, and optional subtitle
 */
export function TitleSubTitle({ title, subtitle, className = "" }: TitleSubTitleProps) {
  return (
    <motion.div
      className={`flex flex-col gap-2 items-center text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="font-playfair font-bold text-[48px] text-[#421d13] leading-[72px]">
        {title}
      </h2>
      <div className="bg-[#ad8a6c] h-[4px] rounded-[2px] w-[100px]" />
      {subtitle && (
        <p className="font-roboto-flex font-light text-[24px] text-[#6b6763] leading-[1.5] tracking-[0.48px]">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export interface TitleCaseProps {
  /** Main title text */
  title: string;
  /** Custom CSS classes */
  className?: string;
}

/**
 * Case study title component - left-aligned title with decorative underline
 * Source: Figma node 3358:1078
 */
export function TitleCase({ title, className = "" }: TitleCaseProps) {
  return (
    <motion.div
      className={`flex flex-col gap-2 items-start ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="font-playfair font-bold text-[48px] text-[#421d13] leading-[72px]">
        {title}
      </h2>
      <div className="bg-[#ad8a6c] h-[4px] rounded-[2px] w-[100px]" />
    </motion.div>
  );
}
