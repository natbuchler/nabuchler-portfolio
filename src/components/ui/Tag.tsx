/**
 * Tag - Skill/Topic Tag Component
 *
 * Source: Figma component "Tag" (Node ID: 3359:1432)
 * Used to display skills, topics, or categories in case studies
 *
 * Design Specifications:
 * - Background: #d0bfb0 (--card-30)
 * - Border Radius: 60px (pill shape)
 * - Padding: 16px horizontal, 8px vertical
 * - Font: Roboto Medium, 16px, uppercase
 * - Letter Spacing: -0.24px
 * - Text Color: #421d13 (brown)
 *
 * @component
 */

'use client';

import React from 'react';

export interface TagProps {
  /** Tag label text */
  label: string;
  /** Custom CSS classes */
  className?: string;
}

/**
 * Tag component for displaying skills or topics
 * Follows exact Figma design specifications
 */
export function Tag({ label, className = "" }: TagProps) {
  return (
    <span className={`inline-flex items-center justify-center bg-[#d0bfb0] px-4 py-2 rounded-[60px] font-roboto font-medium text-[16px] text-[#421d13] tracking-[-0.24px] uppercase ${className}`}>
      {label}
    </span>
  );
}
