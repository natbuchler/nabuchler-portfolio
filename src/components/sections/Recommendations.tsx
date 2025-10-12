/**
 * Recommendations Section
 *
 * Displays LinkedIn recommendations in an elegant carousel format
 * Design principles: credibility, readability, emotional connection
 */

'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TitleSubTitle } from '@/components/ui/Typography';
import recommendationsEN from '@/data/recommendations-en.json';
import recommendationsPT from '@/data/recommendations-pt.json';
import recommendationsES from '@/data/recommendations-es.json';

interface Recommendation {
  id: string;
  name: string;
  title: string;
  company: string;
  relationship: string;
  text: string;
  date: string;
  profileUrl: string;
  avatar: string;
}

interface RecommendationsProps {
  locale?: 'en' | 'pt' | 'es';
}

export default function Recommendations({ locale = 'en' }: RecommendationsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const recommendationsMap = {
    en: recommendationsEN,
    pt: recommendationsPT,
    es: recommendationsES
  };

  const recommendations: Recommendation[] = recommendationsMap[locale] || recommendationsEN;

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? recommendations.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === recommendations.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    scrollToCard(newIndex);
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current && recommendations.length > 0) {
      const container = scrollContainerRef.current;
      const targetCard = container.children[index] as HTMLElement;

      if (targetCard) {
        targetCard.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const truncateText = (text: string, maxLength: number = 280) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const localeMap = { pt: 'pt-BR', es: 'es-ES', en: 'en-US' };
    return date.toLocaleDateString(localeMap[locale] || 'en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <section id="recommendations" className="py-20 md:py-24 overflow-hidden border-t border-[#ad8a6c]/10 shadow-[inset_0_8px_16px_-8px_rgba(66,29,19,0.03)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <TitleSubTitle
              title={locale === 'pt' ? 'Recomendações' : locale === 'es' ? 'Recomendaciones' : 'Recommendations'}
              subtitle={locale === 'pt' ? 'O que as pessoas dizem sobre trabalhar comigo' : locale === 'es' ? 'Lo que la gente dice sobre trabajar conmigo' : 'What people say about working with me'}
            />
          </motion.div>

          {/* Carousel Container with navigation */}
          <div className="relative mt-12 flex items-center gap-6 px-4 md:px-0">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="hidden md:flex w-10 h-10 items-center justify-center text-[#421d13] hover:text-[#ad8a6c] disabled:text-[#5F5F60] transition-colors duration-200 flex-shrink-0 cursor-pointer"
              aria-label="Previous recommendation"
            >
              <Image src="/Chevron_Left.svg" alt="" width={32} height={32} />
            </button>

            {/* Scrollable Cards Container */}
            <div className="flex-1 overflow-hidden">
              <div
                ref={scrollContainerRef}
                className="flex gap-8 md:gap-11 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>

                {recommendations.map((rec, index) => {
                  const isExpanded = expandedCards.has(rec.id);
                  const needsTruncation = rec.text.length > 280;

                  return (
                    <motion.div
                      key={rec.id}
                      className="snap-center flex-shrink-0 w-[calc(100vw-7rem)] md:w-[600px]"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="rounded-3xl h-full flex flex-col shadow-lg border border-[#ad8a6c]/10 hover:shadow-xl hover:shadow-[#421d13]/5 transition-shadow duration-300 overflow-hidden">
                        {/* Top Section - Quote and Text - D9CCC1 */}
                        <div className="bg-[#D9CCC1] p-8 md:p-10 flex-1 flex flex-col">
                          {/* Quote Icon */}
                          <div className="mb-6">
                            <Image
                              src="/quote.svg"
                              alt=""
                              width={48}
                              height={48}
                              className="opacity-20"
                            />
                          </div>

                          {/* Recommendation Text */}
                          <div className="flex-1">
                            <p className="font-roboto-flex font-light text-base md:text-[18px] leading-[1.7] text-[#421d13] italic">
                              "{isExpanded || !needsTruncation ? rec.text : truncateText(rec.text)}"
                            </p>
                            {needsTruncation && (
                              <button
                                onClick={() => toggleExpand(rec.id)}
                                className="mt-3 text-[#ad8a6c] hover:text-[#421d13] font-roboto-flex font-medium text-sm transition-colors duration-200 cursor-pointer"
                              >
                                {isExpanded
                                  ? locale === 'pt' ? 'Ver menos' : locale === 'es' ? 'Ver menos' : 'Read less'
                                  : locale === 'pt' ? 'Ver mais' : locale === 'es' ? 'Ver más' : 'Read more'}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Bottom Section - Author Info - D0BFB0 */}
                        <div className="bg-[#D0BFB0] p-8 md:p-10 pt-6">
                          <div className="flex items-center gap-4">
                          {/* Avatar or Initials */}
                          <a
                            href={rec.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 hover:opacity-80 transition-opacity"
                          >
                            {rec.avatar ? (
                              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden">
                                <Image
                                  src={rec.avatar}
                                  alt={rec.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#ad8a6c] flex items-center justify-center">
                                <span className="font-playfair font-semibold text-white text-lg md:text-xl">
                                  {getInitials(rec.name)}
                                </span>
                              </div>
                            )}
                          </a>

                          {/* Author Details */}
                          <div className="flex-1 min-w-0">
                            <a
                              href={rec.profileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block hover:text-[#ad8a6c] transition-colors"
                            >
                              <h4 className="font-playfair font-semibold text-lg md:text-xl text-[#421d13] truncate">
                                {rec.name}
                              </h4>
                            </a>
                            <p className="font-roboto-flex text-sm md:text-base text-[#6b6763] truncate">
                              {rec.title}
                            </p>
                            <p className="font-roboto-flex text-xs md:text-sm text-[#6b6763]/70 truncate">
                              {rec.company}
                            </p>
                          </div>

                          {/* LinkedIn Icon */}
                          <a
                            href={rec.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 text-[#ad8a6c] hover:text-[#421d13] transition-colors"
                            aria-label={`View ${rec.name} on LinkedIn`}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                              <rect x="2" y="9" width="4" height="12" />
                              <circle cx="4" cy="4" r="2" />
                            </svg>
                          </a>
                        </div>

                          {/* Date & Relationship */}
                          <div className="mt-3 flex items-center gap-2 text-xs text-[#6b6763]/60">
                            <span>{formatDate(rec.date)}</span>
                            <span>•</span>
                            <span className="truncate">{rec.relationship}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Pagination Dots */}
              <div className="flex gap-3 items-center justify-center mt-6">
                {recommendations.map((rec, index) => (
                  <button
                    key={`dot-${rec.id}`}
                    onClick={() => {
                      setCurrentIndex(index);
                      scrollToCard(index);
                    }}
                    className="group cursor-pointer"
                    aria-label={`Go to recommendation ${index + 1}`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                        currentIndex === index
                          ? 'bg-[#421d13]'
                          : 'bg-[#5F5F60] group-hover:bg-[#ad8a6c]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="hidden md:flex w-10 h-10 items-center justify-center text-[#421d13] hover:text-[#ad8a6c] disabled:text-[#5F5F60] transition-colors duration-200 flex-shrink-0 cursor-pointer"
              aria-label="Next recommendation"
            >
              <Image src="/Chevron_Right.svg" alt="" width={32} height={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
