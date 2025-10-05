/**
 * CardNumbers - Metrics Card Component
 *
 * Source: Figma component "card-numbers"
 * Used to display key metrics and statistics in case studies
 *
 * @component
 */

'use client';

import React from 'react';

export interface CardNumbersProps {
  /** The metric number/value (e.g., "+24", "64k+") */
  number: string;
  /** Label describing the metric */
  label: string;
}

/**
 * Metric card with large number and descriptive label
 * Follows exact Figma design with white transparent background
 */
export function CardNumbers({ number, label }: CardNumbersProps) {
  return (
    <div className="bg-[rgba(255,255,255,0.35)] backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center w-full md:w-[208px] min-w-[150px]">
      <div className="font-playfair font-bold text-4xl md:text-[64px] leading-[1.2] text-[#421d13] mb-2 md:mb-4">
        {number}
      </div>
      <div className="font-roboto-flex text-sm md:text-[18px] leading-[1.5] text-[#6b6763] tracking-[0.36px]">
        {label}
      </div>
    </div>
  );
}
