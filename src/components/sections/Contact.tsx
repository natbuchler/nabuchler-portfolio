/**
 * Contact Section
 *
 * Modern contact section with clear affordances and value proposition
 * UX improvements: labels, tooltips, visual hierarchy, modern feedback
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TitleSubTitle } from '@/components/ui/Typography';
import { Locale, getTranslations } from '@/lib/i18n';

interface ContactProps {
  locale: Locale;
}

export default function Contact({ locale }: ContactProps) {
  const t = getTranslations(locale);
  const [emailCopied, setEmailCopied] = useState(false);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('nabuchler@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = 'nabuchler@gmail.com';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 3000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const platforms = [
    {
      name: 'Linkedin',
      label: t.contact.platforms.linkedin.label,
      url: 'https://www.linkedin.com/in/nbuchler/',
      ariaLabel: t.contact.platforms.linkedin.ariaLabel
    },
    {
      name: 'Medium',
      label: t.contact.platforms.medium.label,
      url: 'https://medium.com/@nabuchler',
      ariaLabel: t.contact.platforms.medium.ariaLabel
    },
    {
      name: 'Email',
      label: t.contact.platforms.email.label,
      tooltip: t.contact.platforms.email.tooltip,
      ariaLabel: t.contact.platforms.email.ariaLabel
    },
    {
      name: 'CV',
      label: t.contact.platforms.cv.label,
      url: locale === 'pt'
        ? 'https://drive.google.com/file/d/1z0i9SkhLjH1SYk1k_LwFVJDwfzwdPw9b/view?usp=sharing'
        : 'https://drive.google.com/file/d/1pgFkxrCPIAbWeVNLXP76RQqghEkD0VxU/view?usp=sharing',
      ariaLabel: t.contact.platforms.cv.ariaLabel
    }
  ];

  return (
    <section id="contact" className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="space-y-8 max-w-4xl mx-auto text-center">
          <TitleSubTitle title={t.contact.title} />

          {/* Value Proposition */}
          <motion.p
            className="font-roboto-flex font-light text-lg md:text-2xl text-[#6b6763] max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t.contact.subtitle}
          </motion.p>

          {/* Contact Icons with Labels */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                className="flex flex-col items-center gap-3 group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredPlatform(platform.name)}
                onMouseLeave={() => setHoveredPlatform(null)}
              >
                {/* Tooltip for Email */}
                {platform.tooltip && hoveredPlatform === platform.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-12 bg-[#421d13] text-white px-3 py-1.5 rounded-lg text-sm font-roboto-flex whitespace-nowrap"
                  >
                    {platform.tooltip}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#421d13]" />
                  </motion.div>
                )}

                <button
                  className="cursor-pointer transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ad8a6c] focus-visible:ring-offset-2 rounded-lg p-2"
                  style={{
                    filter: hoveredPlatform === platform.name ? 'brightness(1.2)' : 'none'
                  }}
                  onClick={() => platform.name === 'Email' ? copyEmailToClipboard() : window.open(platform.url, '_blank')}
                  aria-label={platform.ariaLabel}
                >
                  {platform.name === 'Linkedin' ? (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c95127" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ) : platform.name === 'Medium' ? (
                    <svg width="48" height="48" viewBox="-1 -1 26 26" fill="none" stroke="#c95127" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13.5 12c0 3.728-3.03 6.75-6.768 6.75A6.758 6.758 0 0 1 0 12c0-3.729 3.03-6.75 6.732-6.75A6.758 6.758 0 0 1 13.5 12M20.925 12c0 3.51-1.515 6.354-3.384 6.354S14.157 15.51 14.157 12c0-3.51 1.515-6.354 3.384-6.354S20.925 8.49 20.925 12M24 12c0 3.144-.533 5.693-1.191 5.693-.658 0-1.19-2.549-1.19-5.693 0-3.144.532-5.693 1.19-5.693S24 8.856 24 12" />
                    </svg>
                  ) : platform.name === 'Email' ? (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c95127" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7L13.03 12.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  ) : platform.name === 'CV' ? (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c95127" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                    </svg>
                  ) : null}
                </button>

                {/* Label */}
                <span className="font-roboto-flex text-sm md:text-base text-[#421d13] font-medium transition-colors group-hover:text-[#c95127]">
                  {platform.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modern Toast Notification */}
      {emailCopied && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white border border-[#ad8a6c]/20 text-[#421d13] px-6 py-4 rounded-2xl shadow-xl z-50 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-[#c95127]/10 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-[#c95127]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-roboto-flex font-semibold text-sm">{t.contact.emailCopied.title}</p>
              <p className="font-roboto-flex text-xs text-[#6b6763] mt-0.5">{t.contact.emailCopied.email}</p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
