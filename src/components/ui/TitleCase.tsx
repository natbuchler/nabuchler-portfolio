/**
 * TitleCase - Case Study Title Component
 *
 * Source: Figma component "Title - Case"
 * Used in case study sections for consistent heading style
 *
 * @component
 */

'use client';

import React from 'react';

export interface TitleCaseProps {
  /** Title text */
  title: string;
  /** Custom CSS classes */
  className?: string;
}

/**
 * Case study section title with decorative underline
 * Follows exact Figma design with Playfair Display font and beige accent
 */
export function TitleCase({ title, className = "" }: TitleCaseProps) {
  return (
    <div className={`mb-10 ${className}`}>
      <h2 className="font-playfair font-bold text-[48px] leading-[72px] text-[#421d13] mb-2">
        {title}
      </h2>
      <div className="w-[100px] h-1 bg-[#ad8a6c] rounded-sm"></div>
    </div>
  );
}
