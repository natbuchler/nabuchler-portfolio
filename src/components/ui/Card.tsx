/**
 * Card Components
 *
 * Collection of card components used throughout the portfolio:
 * - CardCase: Case study cards with alternating layouts
 * - CardInsight: Leadership insight cards with icons
 * - CardExperience: Timeline experience cards
 *
 * All components use design tokens and follow WCAG accessibility guidelines.
 *
 * @component
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Icon, { IconProps } from './Icon';
import { ButtonTertiary } from './ButtonTertiary';
import { colors } from '@/lib/design-tokens';

/* ============================================================================
 * CardCase - Case Study Card Component
 * ========================================================================= */

export interface CardCaseProps {
  /** Layout direction - controls image position */
  side?: "Left" | "Right";
  /** Case study title */
  title: string;
  /** Case study description */
  description: string;
  /** Image source path */
  image: string;
  /** Background color variant */
  bgVariant?: "light" | "medium";
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * Case study card with image and content in alternating layouts
 * Source: Figma node 3281:4955 (Side=Right), 3281:5086 (Side=Left)
 * Total width: 997px, Height: 364px
 * Content: 573px, Image: 424px
 */
export function CardCase({
  side = "Right",
  title,
  description,
  image,
  bgVariant = "light",
  onClick
}: CardCaseProps) {
  const isRight = side === "Right";
  const bgColor = bgVariant === "light" ? "bg-[#d9ccc1]" : "bg-white";
  const contentBg = bgVariant === "light" ? "bg-[rgba(173,138,108,0.2)]" : "bg-[#d0bfb0]";

  return (
    <motion.div
      className={`flex flex-col md:flex-row ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'} ${bgColor} rounded-[24px] overflow-hidden max-w-[997px] w-full h-auto md:h-[364px]`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className={`w-full md:w-[573px] p-8 ${contentBg} flex flex-col justify-center items-start`}>
        <div className={`flex flex-col gap-10 justify-center w-full ${isRight ? 'items-end' : 'items-start'}`}>
          <div className={`flex flex-col gap-2 items-start w-full ${isRight ? 'text-right' : 'text-left'}`}>
            <h3 className="font-playfair font-bold text-[40px] text-[#421d13] leading-[1.5] w-full">
              {title}
            </h3>
            <p className="font-roboto-flex text-[18px] text-[#6b6763] leading-[1.5] tracking-[0.36px] w-full">
              {description}
            </p>
          </div>
          <div className={`flex h-[48px] items-center py-4 ${isRight ? 'justify-end pl-4' : 'justify-start -ml-4'}`}>
            <ButtonTertiary variant="right" onClick={onClick}>
              Dive Deeper
            </ButtonTertiary>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[424px] relative h-[250px] md:h-[364px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain object-right"
        />
      </div>
    </motion.div>
  );
}

/* ============================================================================
 * CardInsight - Leadership Insight Card Component
 * ========================================================================= */

export interface CardInsightProps {
  /** Insight title */
  title: string;
  /** Insight description */
  description: string;
  /** Icon type to display */
  icon?: IconProps['tipo'];
  /** Border color - beige, orange, or brown */
  borderColor?: 'beige' | 'orange' | 'brown';
  /** List items (optional - for case study impact cards) */
  items?: string[];
}

/**
 * Leadership insight card with icon, title, and description
 * Source: Figma node 3281:5793
 * Width: 217px (flexible), Padding: 24px, Gap: 16px
 * Also used for case study impact cards with border variants
 */
export function CardInsight({
  title,
  description,
  icon = "cy",
  borderColor,
  items
}: CardInsightProps) {
  const borderColorClass = borderColor
    ? borderColor === 'beige'
      ? 'border-l-4 border-[#ad8a6c]'
      : borderColor === 'orange'
      ? 'border-l-4 border-[#c95127]'
      : 'border-l-4 border-[#421d13]'
    : '';

  return (
    <motion.div
      className={`bg-[rgba(255,255,255,0.35)] backdrop-blur-sm rounded-[16px] p-6 flex-1 min-w-[217px] ${borderColorClass}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col gap-4">
        {icon && <Icon tipo={icon} size="48" />}
        <h3 className="font-playfair font-semibold text-[28px] text-[#421d13] tracking-[0.56px] leading-tight">
          {title}
        </h3>
        <p className="font-roboto-flex text-[18px] text-[#6b6763] leading-[1.5] tracking-[0.36px]">
          {description}
        </p>
        {items && items.length > 0 && (
          <ul className="space-y-2 mt-4">
            {items.map((item, index) => (
              <li key={index} className="font-roboto-flex text-[18px] text-[#6b6763] leading-[1.5] tracking-[0.36px]">
                • {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

/* ============================================================================
 * CardExperience - Experience Timeline Card Component
 * ========================================================================= */

export interface CardExperienceProps {
  /** Job role/position */
  role: string;
  /** Company name */
  company: string;
  /** Time period */
  period: string;
  /** Role description */
  description: string;
  /** List of key achievements */
  achievements: string[];
}

/**
 * Experience card for timeline display with role, company, and achievements
 * Source: Figma node 3281:6056
 * Width: 807px (flexible), Padding: 24px, Gap: 16px
 */
export function CardExperience({
  role,
  company,
  period,
  description,
  achievements
}: CardExperienceProps) {
  return (
    <div className="bg-[rgba(255,255,255,0.35)] backdrop-blur-sm rounded-[24px] p-6 flex-1 max-w-[807px]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
          <div className="flex-1">
            <h3 className="font-playfair font-semibold text-[32px] text-[#421d13] tracking-[0.64px] leading-tight">
              {role}
            </h3>
            <p className="font-roboto-flex text-[20px] text-[#ad8a6c] tracking-[0.4px] mt-1">
              {company}
            </p>
          </div>
          <p className="font-roboto-flex font-light text-[24px] text-[#421d13] tracking-[0.48px] leading-[1.5] md:text-right">
            {period}
          </p>
        </div>

        <p className="font-roboto-flex font-light text-[20px] text-[#6b6763] tracking-[0.4px] leading-[1.5]">
          {description}
        </p>

        <div className="font-roboto-flex font-light text-[20px] text-[#6b6763]">
          <p className="mb-2 tracking-[0.4px]">Key Achievements</p>
          <ul className="list-disc space-y-1 ml-[30px]">
            {achievements.map((achievement, index) => (
              <li key={index}>
                <span className="tracking-[0.4px]">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
