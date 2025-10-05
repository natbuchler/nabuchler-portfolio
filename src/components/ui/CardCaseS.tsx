/**
 * CardCaseS - Small Case Card Component
 *
 * Source: Figma node 3367:1516
 * Width: 551px, Height: 170px
 *
 * @component
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { ButtonTertiary } from './ButtonTertiary';

export interface CardCaseSProps {
  /** Case study title */
  title: string;
  /** Thumbnail image source */
  image: string;
  /** Card variant - controls layout direction */
  variant?: 'next' | 'previous';
  /** Optional click handler */
  onClick?: () => void;
  /** Disabled state - when true, card is not clickable */
  disabled?: boolean;
}

/**
 * Small case card for navigation between case studies
 * Exact Figma MCP structure - uses H4 typography and inline-flex button
 */
export function CardCaseS({ title, image, variant = 'next', onClick, disabled = false }: CardCaseSProps) {
  const isNext = variant === 'next';

  if (isNext) {
    // Left variant - Text on left, Image on right (for "Next case")
    return (
      <div
        className={`bg-[#d0bfb0] box-border flex gap-[24px] items-center overflow-clip p-[24px] rounded-[24px] ${image ? 'w-[551px]' : 'w-[352px]'} h-[170px] transition-opacity ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-90'}`}
        onClick={disabled ? undefined : onClick}
      >
        {/* Text+button */}
        <div className={`flex flex-col gap-[8px] items-end shrink-0 ${image ? 'w-[304px]' : 'w-full'}`}>
          <ButtonTertiary variant="right" className={!image ? 'pr-0' : ''}>Next case</ButtonTertiary>

          {/* Title - H4 */}
          <h4 className={`font-playfair font-semibold leading-[normal] text-[28px] text-[#421d13] text-right tracking-[0.56px] ${image ? 'w-[314px]' : 'w-full'}`}>
            {title}
          </h4>
        </div>
        {/* Image */}
        {image && (
          <div className="h-[171px] relative rounded-[24px] shrink-0 w-[199px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    // Right variant - Image on left, Text on right (for "Previous case")
    return (
      <div
        className={`bg-[#d0bfb0] box-border flex gap-[24px] items-center overflow-clip p-[24px] rounded-[24px] ${image ? 'w-[551px]' : 'w-[352px]'} h-[170px] transition-opacity ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-90'}`}
        onClick={disabled ? undefined : onClick}
      >
        {/* Image */}
        {image && (
          <div className="h-[171px] relative rounded-[24px] shrink-0 w-[199px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        )}
        {/* Text+button */}
        <div className={`flex flex-col gap-[8px] items-start shrink-0 ${image ? 'w-[304px]' : 'w-full'}`}>
          <ButtonTertiary variant="left">Previous case</ButtonTertiary>

          {/* Title - H4 */}
          <h4 className={`font-playfair font-semibold leading-[normal] text-[28px] text-[#421d13] tracking-[0.56px] ${image ? 'w-[314px]' : 'w-full'}`}>
            {title}
          </h4>
        </div>
      </div>
    );
  }
}
