/**
 * Article Card Component
 *
 * Card component for displaying Medium articles in the Latest Articles section.
 * Source: Figma node 3341:285 (card-medium)
 *
 * @component
 */

'use client';

import React from 'react';
import Image from 'next/image';

export interface ArticleCardProps {
  /** Article title */
  title: string;
  /** Publication date */
  date: string;
  /** Article image URL */
  image: string;
  /** Medium article URL */
  url: string;
  /** Language - determines which flag icon to show */
  language?: 'BR' | 'ENG';
  /** Additional CSS classes */
  className?: string;
  /** Button text (translatable) */
  buttonText?: string;
}

/**
 * Article card with exact Figma specifications
 * Width: 287px, Image: 125px, Content padding: 24px, Gap: 16px
 */
export default function ArticleCard({
  title,
  date,
  image,
  url,
  language = 'BR',
  className = '',
  buttonText = 'Show article'
}: ArticleCardProps) {
  return (
    <div
      className={`bg-[rgba(255,255,255,0.35)] backdrop-blur-sm rounded-2xl overflow-hidden flex flex-col w-full max-w-[287px] h-full min-h-[320px] shrink-0 transition-shadow duration-300 hover:shadow-lg hover:shadow-[#421d13]/5 cursor-pointer ${className}`}
      data-node-id="3341:285"
    >
      {/* Article Image - 287x125px */}
      <div className="relative w-full h-[125px] shrink-0 overflow-hidden bg-[#d0bfb0]" data-node-id="3341:280">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="287px"
          quality={85}
        />
      </div>

      {/* Article Info - 24px padding on all sides */}
      <div
        className="p-6 flex flex-col gap-4 w-full flex-1 justify-between"
        data-node-id="3341:274"
      >
        {/* Text Content */}
        <div className="flex flex-col gap-[8px]" data-node-id="3341:275">
          <div className="flex flex-col gap-2" data-node-id="3341:282">
            {/* Title - H4: 24px semibold (reduced from 28px) */}
            <h4
              className="font-playfair font-semibold text-[24px] leading-[1.3] text-[#421d13] tracking-[0.48px]"
              data-node-id="3341:277"
            >
              {title}
            </h4>

            {/* Date - Roboto Flex Light 16px with reduced opacity */}
            <p
              className="font-roboto-flex font-light text-[16px] leading-[1.5] text-[#421d13] opacity-70"
              data-node-id="3341:283"
            >
              {date}
            </p>
          </div>
        </div>

        {/* CTA Button - 48px height, no left padding */}
        <button
          onClick={() => window.open(url, '_blank')}
          className="flex items-center h-[48px] pl-0 pr-0 py-[16px] rounded-[8px] transition-all duration-200 hover:opacity-70"
          data-node-id="3341:279"
          aria-label={`Read article: ${title}`}
        >
          <div className="flex gap-[4px] h-[27px] items-center">
            <span className="font-roboto font-medium text-[18px] leading-[1.5] text-[#421d13]">
              {buttonText}
            </span>
            <Image
              src="/Chevron_min_r.svg"
              alt=""
              width={16}
              height={16}
              className="shrink-0 self-center"
            />
          </div>
        </button>
      </div>
    </div>
  );
}
