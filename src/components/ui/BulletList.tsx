/**
 * BulletList - Bullet Point List Component
 *
 * Source: Figma pattern "Bullet points" with icon instances
 * Used to display lists with custom icons in case studies
 *
 * @component
 */

'use client';

import React from 'react';
import { OrangePointIcon, BrownCyIcon } from './Icons';

export interface BulletListProps {
  /** List items */
  items: string[];
  /** Icon type to use for bullets */
  iconType?: 'orange-point' | 'brown-cy';
  /** Custom CSS classes */
  className?: string;
}

/**
 * List component with custom icon bullets
 * Follows exact Figma design with consistent spacing and typography
 */
export function BulletList({
  items,
  iconType = 'brown-cy',
  className = ""
}: BulletListProps) {
  const IconComponent = iconType === 'orange-point' ? OrangePointIcon : BrownCyIcon;

  return (
    <ul className={`space-y-3 md:space-y-4 pl-4 md:pl-6 ${className}`}>
      {items.map((item, index) => (
        <li
          key={index}
          className="flex gap-2 font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]"
        >
          <span className="mt-1 md:mt-2 shrink-0">
            <IconComponent />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
