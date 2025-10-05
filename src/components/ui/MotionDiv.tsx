/**
 * MotionDiv - Conditional Motion Wrapper
 *
 * Wraps Framer Motion animations to disable them on mobile (< 768px)
 * Prevents jittering and "sambar" effects on mobile browsers
 *
 * Usage:
 *   <MotionDiv
 *     initial={{ opacity: 0, y: 20 }}
 *     whileInView={{ opacity: 1, y: 0 }}
 *     transition={{ duration: 0.6 }}
 *   >
 *     Content here
 *   </MotionDiv>
 *
 * @component
 */

'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface MotionDivProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Motion wrapper that disables animations on mobile
 * Desktop: Full animations
 * Mobile: Plain div with no animations
 */
export function MotionDiv({ children, className = '', ...motionProps }: MotionDivProps) {
  return (
    <>
      {/* Mobile: NO ANIMATION */}
      <div className={`block md:hidden ${className}`}>
        {children}
      </div>

      {/* Desktop: WITH ANIMATION */}
      <motion.div
        className={`hidden md:block ${className}`}
        {...motionProps}
      >
        {children}
      </motion.div>
    </>
  );
}
