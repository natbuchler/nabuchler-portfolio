/**
 * QuoteBlock - Quote/Highlight Component
 *
 * Source: Figma component "Quote" and "Frase"
 * Used to display highlighted quotes or important statements in case studies
 *
 * @component
 */

'use client';

import React from 'react';

export interface QuoteBlockProps {
  /** Quote text */
  quote: string;
  /** Optional author or source */
  author?: string;
  /** Text size variant */
  size?: 'default' | 'large';
  /** Custom CSS classes */
  className?: string;
}

/**
 * Quote block component for highlighting important statements
 * Follows exact Figma design with white transparent background and centered text
 */
export function QuoteBlock({
  quote,
  author,
  size = 'default',
  className = ""
}: QuoteBlockProps) {
  const textSize = size === 'large' ? 'text-[28px] leading-[44px]' : 'text-[24px] leading-[1.5]';

  return (
    <div className={`p-6 ${className}`}>
      <p className={`font-playfair font-bold ${textSize} text-[#421d13] text-center max-w-[978px] mx-auto`}>
        {quote}
      </p>
      {author && (
        <p className="font-roboto-flex text-[18px] text-[#6b6763] text-center mt-4">
          — {author}
        </p>
      )}
    </div>
  );
}
