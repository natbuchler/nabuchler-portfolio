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
  /** Button text (translatable) */
  buttonText?: string;
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
  onClick,
  buttonText = "Dive Deeper"
}: CardCaseProps) {
  const isRight = side === "Right";
  const bgColor = bgVariant === "light" ? "bg-[#d9ccc1]" : "bg-white";
  const contentBg = bgVariant === "light" ? "bg-[rgba(173,138,108,0.2)]" : "bg-[#d0bfb0]";

  return (
    <motion.div
      className={`flex flex-col md:flex-row ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'} ${bgColor} rounded-2xl md:rounded-[24px] overflow-hidden max-w-[997px] w-full h-auto md:h-[364px]`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Content Section */}
      <div className={`w-full md:w-[573px] p-6 md:p-8 ${contentBg} flex flex-col justify-center items-start`}>
        <div className={`flex flex-col gap-6 md:gap-10 justify-center w-full ${isRight ? 'md:items-end' : 'md:items-start'}`}>
          <div className={`flex flex-col gap-3 md:gap-2 items-start w-full ${isRight ? 'md:text-right' : 'text-left'}`}>
            {/* Title - Mobile optimized */}
            <h3 className="font-playfair font-bold text-2xl md:text-[40px] text-[#421d13] leading-[1.3] md:leading-[1.5] w-full">
              {title}
            </h3>
            {/* Description - Mobile optimized */}
            <p className="font-roboto-flex text-base md:text-[18px] text-[#6b6763] leading-[1.6] md:leading-[1.5] tracking-[0.32px] md:tracking-[0.36px] w-full">
              {description}
            </p>
          </div>
          {/* Button - Mobile aligned left, Desktop follows side */}
          <div className={`flex h-[48px] items-center py-4 w-full ${isRight ? 'justify-start md:justify-end md:pl-4' : 'justify-start -ml-4'}`}>
            <ButtonTertiary variant="right" onClick={(e) => { e?.stopPropagation(); onClick?.(); }}>
              {buttonText}
            </ButtonTertiary>
          </div>
        </div>
      </div>

      {/* Image Section - Optimized aspect ratio for mobile */}
      <div className="w-full md:w-[424px] relative h-[180px] sm:h-[220px] md:h-[364px] flex items-center justify-center bg-gradient-to-b from-transparent to-[rgba(173,138,108,0.05)]">
        <div className="relative w-full h-full max-h-[180px] sm:max-h-[220px] md:max-h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain object-center md:object-right"
          />
        </div>
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

/* ============================================================================
 * CardExperienceAccordion - Experience Card with Accordion
 * ========================================================================= */

export interface CardExperienceAccordionProps extends CardExperienceProps {
  /** Whether the accordion is open by default */
  defaultOpen?: boolean;
}

/**
 * Experience card with accordion functionality
 * Shows role, company, period by default
 * Expands to show description and achievements on click
 */
export function CardExperienceAccordion({
  role,
  company,
  period,
  description,
  achievements,
  defaultOpen = false
}: CardExperienceAccordionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="bg-[rgba(255,255,255,0.35)] backdrop-blur-sm rounded-[24px] flex-1 max-w-[807px] overflow-hidden">
      {/* Header - Always visible, clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ad8a6c] focus-visible:ring-inset"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
          <div className="flex-1">
            <h3 className="font-playfair font-semibold text-[28px] md:text-[32px] text-[#421d13] tracking-[0.64px] leading-tight">
              {role}
            </h3>
            <p className="font-roboto-flex text-[18px] md:text-[20px] text-[#ad8a6c] tracking-[0.4px] mt-1">
              {company}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-roboto-flex font-light text-[20px] md:text-[24px] text-[#421d13] tracking-[0.48px] leading-[1.5]">
              {period}
            </p>
            {/* Chevron icon */}
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ad8a6c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex-shrink-0"
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <motion.div
        initial={false}
        animate={{
          maxHeight: isOpen ? 1000 : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{
          maxHeight: {
            duration: 0.4,
            ease: [0.04, 0.62, 0.23, 0.98]
          },
          opacity: {
            duration: isOpen ? 0.25 : 0.4,
            delay: isOpen ? 0.1 : 0,
            ease: isOpen ? 'easeIn' : 'easeOut'
          }
        }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4 border-t border-[#ad8a6c]/20 mt-2">
          <p className="font-roboto-flex font-light text-[18px] md:text-[20px] text-[#6b6763] tracking-[0.4px] leading-[1.5]">
            {description}
          </p>

          <div className="font-roboto-flex font-light text-[18px] md:text-[20px] text-[#6b6763]">
            <ul className="list-disc space-y-2 ml-[30px]">
              {achievements.map((achievement, index) => (
                <li key={index}>
                  <span className="tracking-[0.4px]">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
