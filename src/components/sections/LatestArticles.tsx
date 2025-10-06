/**
 * Latest Articles Section
 *
 * Horizontal infinite carousel displaying Medium articles with navigation.
 * Source: Figma node 3371:1132
 *
 * @component
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TitleSubTitle } from '@/components/ui/Typography';
import ArticleCard from '@/components/ui/ArticleCard';
import { fetchMediumArticles, type MediumArticle } from '@/lib/medium-service';
import { Locale, getTranslations } from '@/lib/i18n';

interface LatestArticlesProps {
  locale: Locale;
}

export default function LatestArticles({ locale }: LatestArticlesProps) {
  const t = getTranslations(locale);
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Medium articles on mount
  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      const fetchedArticles = await fetchMediumArticles();
      setArticles(fetchedArticles);
      setIsLoading(false);
    };

    loadArticles();
  }, []);

  const cardsVisible = 3; // Show 3 cards at a time on desktop
  const cardWidth = 287; // Width from Figma
  const gap = 44; // Gap from Figma

  // Create infinite array by repeating articles
  const infiniteArticles = articles.length > 0
    ? [...articles, ...articles, ...articles] // Triple the array for smooth infinite scroll
    : [];

  const handlePrevious = () => {
    if (scrollContainerRef.current) {
      const newIndex = currentIndex - 1;

      // If going before first set, jump to equivalent position in last set
      if (newIndex < 0) {
        const equivalentIndex = articles.length - 1;
        setCurrentIndex(equivalentIndex);
        scrollToIndex(equivalentIndex + articles.length * 2, false); // Jump instantly to last set
        setTimeout(() => scrollToIndex(equivalentIndex + articles.length * 2, true), 50);
      } else {
        setCurrentIndex(newIndex);
        scrollToIndex(newIndex + articles.length, true);
      }
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const newIndex = currentIndex + 1;

      // If going past last item, loop to beginning
      if (newIndex >= articles.length) {
        setCurrentIndex(0);
        scrollToIndex(articles.length, false); // Jump instantly to middle set
        setTimeout(() => scrollToIndex(articles.length, true), 50);
      } else {
        setCurrentIndex(newIndex);
        scrollToIndex(newIndex + articles.length, true);
      }
    }
  };

  const scrollToIndex = (index: number, smooth: boolean = true) => {
    if (scrollContainerRef.current) {
      // Calculate card width dynamically based on first card
      const firstCard = scrollContainerRef.current.querySelector('div[class*="snap-center"]');

      // Get actual rendered width including gap
      const cardElement = firstCard as HTMLElement;
      const cardWidth = cardElement ? cardElement.offsetWidth : 287;
      const computedGap = 32; // gap-8 = 32px
      const cardTotalWidth = cardWidth + computedGap;

      const scrollAmount = index * cardTotalWidth;

      if (smooth) {
        // Smooth scroll with better easing
        scrollContainerRef.current.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      } else {
        // Instant scroll for loop transitions
        scrollContainerRef.current.scrollLeft = scrollAmount;
      }
    }
  };

  // Set initial position to middle set on load
  useEffect(() => {
    if (infiniteArticles.length > 0 && scrollContainerRef.current) {
      scrollToIndex(articles.length, false);
    }
  }, [infiniteArticles.length]);

  // Track scroll position to update currentIndex
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || articles.length === 0) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;

      // Calculate card width dynamically based on first card
      const firstCard = scrollContainer.querySelector('div[class*="snap-center"]');
      const cardElement = firstCard as HTMLElement;
      const cardWidth = cardElement ? cardElement.offsetWidth : 287;
      const computedGap = 32; // gap-8 = 32px
      const cardTotalWidth = cardWidth + computedGap;

      const scrolledIndex = Math.round(scrollLeft / cardTotalWidth);

      // Map the infinite array index back to the original article index
      const actualIndex = scrolledIndex % articles.length;

      if (actualIndex !== currentIndex) {
        setCurrentIndex(actualIndex);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [articles.length, currentIndex]);

  if (isLoading) {
    return (
      <section
        id="articles"
        className="py-12 md:py-20 overflow-hidden"
        data-node-id="3371:1132"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <TitleSubTitle title={t.articles.title} />
            <div className="flex items-center justify-center h-[400px]">
              <p className="text-[#6b6763]">{t.articles.loading}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null; // Don't show section if no articles
  }

  return (
    <section
      id="articles"
      className="py-12 md:py-20 overflow-hidden"
      data-node-id="3371:1132"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <TitleSubTitle title={t.articles.title} />
          </motion.div>

          {/* Carousel Container - Modern minimal approach */}
          <div className="relative mt-12 group">
            {/* Navigation Buttons - Minimal, clean design */}
            <button
              onClick={handlePrevious}
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-50 w-8 h-8 items-center justify-center text-[#421d13] opacity-40 hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous articles"
              data-node-id="3371:1274"
            >
              <Image
                src="/Chevron_Left.svg"
                alt=""
                width={32}
                height={32}
              />
            </button>

            <button
              onClick={handleNext}
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-50 w-8 h-8 items-center justify-center text-[#421d13] opacity-40 hover:opacity-100 transition-opacity duration-200"
              aria-label="Next articles"
              data-node-id="3371:1312"
            >
              <Image
                src="/Chevron_Right.svg"
                alt=""
                width={32}
                height={32}
              />
            </button>

            {/* Cards Container - Modern scrollable design */}
            <div
              ref={scrollContainerRef}
              className="flex gap-8 md:gap-11 overflow-x-auto md:overflow-hidden scroll-smooth snap-x snap-mandatory pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              data-node-id="3371:1016"
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {infiniteArticles.map((article, index) => (
                <div
                  key={`${article.id}-${index}`}
                  className="snap-center flex-shrink-0 w-[calc(100vw-7rem)] md:w-auto first:ml-0"
                >
                  <ArticleCard
                    title={article.title}
                    date={article.pubDate}
                    image={article.thumbnail}
                    url={article.link}
                    language={article.language}
                    className="w-full md:w-[287px]"
                  />
                </div>
              ))}
            </div>

            {/* Modern Progress Indicator */}
            <div className="flex gap-2 items-center justify-center mt-8" data-node-id="3371:1196">
              {articles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    scrollToIndex(index + articles.length, true);
                  }}
                  className="group"
                  aria-label={`Go to article ${index + 1}`}
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? 'w-8 bg-[#421d13]'
                        : 'w-1.5 bg-[#421d13]/30 group-hover:bg-[#421d13]/50'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
