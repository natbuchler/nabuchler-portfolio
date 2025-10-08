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

  // Fetch Medium articles on mount and filter by locale
  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      const fetchedArticles = await fetchMediumArticles();

      // Filter articles by language based on locale
      const filteredArticles = fetchedArticles.filter(article => {
        if (locale === 'pt') {
          return article.language === 'BR';
        } else {
          return article.language === 'ENG';
        }
      });

      setArticles(filteredArticles);
      setIsLoading(false);
      setCurrentIndex(0); // Reset to first article when locale changes
    };

    loadArticles();
  }, [locale]);

  // Sync currentIndex with scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || articles.length === 0) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const firstCard = container.children[0] as HTMLElement;

      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const computedStyle = window.getComputedStyle(container);
        const gap = parseInt(computedStyle.gap) || 32;

        const index = Math.round(scrollLeft / (cardWidth + gap));
        const clampedIndex = Math.max(0, Math.min(index, articles.length - 1));

        if (clampedIndex !== currentIndex) {
          setCurrentIndex(clampedIndex);
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex, articles.length]);

  const maxIndex = articles.length - 3; // Last valid pagination index

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    scrollToCard(newIndex);
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current && articles.length > 0) {
      const container = scrollContainerRef.current;
      const targetCard = container.children[index] as HTMLElement;

      if (targetCard) {
        targetCard.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });
      }
    }
  };

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
      className="py-20 md:py-24 overflow-hidden border-t border-[#ad8a6c]/10 shadow-[inset_0_8px_16px_-8px_rgba(66,29,19,0.03)]"
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

          {/* Carousel Container with navigation */}
          <div className="relative mt-12 flex items-center gap-6 px-4 md:px-0">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="hidden md:flex w-10 h-10 items-center justify-center text-[#421d13] hover:text-[#ad8a6c] disabled:text-[#5F5F60] transition-colors duration-200 flex-shrink-0 cursor-pointer"
              aria-label="Previous articles"
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

                {articles.map((article, index) => (
                  <div
                    key={article.id}
                    className="snap-center flex-shrink-0 w-[calc(100vw-7rem)] md:w-[287px]"
                  >
                    <ArticleCard
                      title={article.title}
                      date={article.pubDate}
                      image={article.thumbnail}
                      url={article.link}
                      language={article.language}
                      buttonText={t.articles.showArticle}
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="flex gap-3 items-center justify-center mt-6">
                {articles.slice(0, articles.length - 2).map((article, index) => (
                  <button
                    key={`dot-${article.id}`}
                    onClick={() => {
                      setCurrentIndex(index);
                      scrollToCard(index);
                    }}
                    className="group cursor-pointer"
                    aria-label={`Go to article ${index + 1}`}
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
              aria-label="Next articles"
            >
              <Image src="/Chevron_Right.svg" alt="" width={32} height={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
