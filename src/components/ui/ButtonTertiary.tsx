/**
 * ButtonTertiary - Tertiary Button Component
 *
 * Source: Figma button tertiary design
 * Variants: default (text only) and "right" (with chevron icon)
 *
 * @component
 */

'use client';

import React from 'react';
import Image from 'next/image';

export interface ButtonTertiaryProps {
  /** Button text */
  children: React.ReactNode;
  /** Variant - default or right (with chevron) */
  variant?: 'default' | 'right' | 'left';
  /** Optional click handler */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** Custom CSS classes */
  className?: string;
}

/**
 * Tertiary button following Figma design
 * inline-flex, h-48px, padding 16px, gap 4px (when with icon)
 */
export function ButtonTertiary({
  children,
  variant = 'default',
  onClick,
  className = ''
}: ButtonTertiaryProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex h-[48px] items-center justify-center gap-[4px] px-[16px] rounded-[8px] border-0 bg-transparent hover:opacity-80 focus:outline-none focus-visible:outline-none transition-opacity ${className}`}
    >
      {variant === 'left' && (
        <Image
          src="/Chevron_min_l.svg"
          alt=""
          width={16}
          height={16}
          className="shrink-0"
        />
      )}
      <span className="font-roboto font-medium text-[18px] leading-[1.5] text-[#421d13]">
        {children}
      </span>
      {variant === 'right' && (
        <Image
          src="/Chevron_min_r.svg"
          alt=""
          width={16}
          height={16}
          className="shrink-0"
        />
      )}
    </button>
  );
}
