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
      className={`flex flex-col gap-4 items-center text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="font-playfair font-bold text-3xl md:text-5xl text-[#421d13] leading-tight">
        {title}
      </h2>
      <div className="bg-[#ad8a6c] h-1 rounded-full w-24" />
      {subtitle && (
        <p className="font-roboto-flex font-light text-lg md:text-2xl text-[#6b6763] max-w-4xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
