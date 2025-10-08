/**
 * Portfolio Client Component
 *
 * Client-side interactive portfolio with state management.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ClientOnly from '@/components/ClientOnly';
import Icon from '@/components/ui/Icon';
import Button from '@/components/Button';
import { Locale, getTranslations } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

// Section components
import Hero from '@/components/sections/Hero';
import CaseStudies from '@/components/sections/CaseStudies';
import HowILead from '@/components/sections/HowILead';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Recommendations from '@/components/sections/Recommendations';
import LatestArticles from '@/components/sections/LatestArticles';
import Contact from '@/components/sections/Contact';

interface PortfolioClientProps {
  locale: Locale;
}

export default function PortfolioClient({ locale }: PortfolioClientProps) {
  const t = getTranslations(locale);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('');

  // São Paulo time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const saoPauloTime = now.toLocaleTimeString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit'
      });
      setCurrentTime(saoPauloTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Set active section immediately
      setActiveSection(hash);

      // Wait for page to fully load before scrolling
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.offsetTop - headerHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });

      setMobileMenuOpen(false);
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { name: t.nav.about, id: 'about' },
    { name: t.nav.cases, id: 'cases' },
    { name: t.nav.leadership, id: 'leadership' },
    { name: t.nav.experience, id: 'experience' }
  ];

  return (
    <ClientOnly>
      <div className="bg-[#e3dcd6] min-h-screen pt-[72px]">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(173,138,108,0.2)] backdrop-blur-sm border-b border-[#ad8a6c]/20">
          <div className="mx-auto px-4 md:px-8 py-3 max-w-[1280px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={scrollToTop}
                  className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                  title="Voltar ao topo"
                  aria-label="Scroll to top"
                >
                  <Icon tipo="rosto" size="32" />
                </button>
                <div className="w-px h-6 bg-[#ad8a6c]"></div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 ml-6">
                  {navigationItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className={`font-raleway font-medium text-[18px] leading-[28px] transition-all duration-200 relative cursor-pointer ${
                        activeSection === item.id
                          ? 'text-[#ad8a6c] font-semibold'
                          : 'text-[#421d13] hover:text-[#ad8a6c]'
                      }`}
                    >
                      {item.name}
                      {activeSection === item.id && (
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ad8a6c] rounded-full" />
                      )}
                    </button>
                  ))}
                  {/* Contact Button - Separate from navigation items */}
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => scrollToSection('contact')}
                  >
                    {t.nav.contact}
                  </Button>
                </nav>
              </div>

              {/* Right side: Location/Time + Mobile Menu Button */}
              <div className="flex items-center gap-3">
                {/* Location and Time */}
                <div className="flex items-center gap-2 text-[#ad8a6c]">
                  <span className="font-raleway text-xs md:text-base">{t.location.city}</span>
                  <div className="w-4 h-4 md:w-6 md:h-6 relative opacity-30">
                    <Image
                      src="/cy.svg"
                      alt="Location"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-raleway text-xs md:text-base">{currentTime}</span>
                </div>

                {/* Language Switcher */}
                <div className="hidden md:block">
                  <LanguageSwitcher currentLocale={locale} />
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 cursor-pointer"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <div className="w-6 h-6 flex flex-col justify-center items-center">
                    <span className={`bg-[#421d13] block h-0.5 w-6 rounded-sm ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                    <span className={`bg-[#421d13] block h-0.5 w-6 rounded-sm ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`bg-[#421d13] block h-0.5 w-6 rounded-sm ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                  </div>
                </button>
              </div>
            </div>

            {/* Mobile Navigation - NO ANIMATION */}
            {mobileMenuOpen && (
              <nav className="md:hidden mt-4 pb-4">
                <div className="flex flex-col space-y-3">
                  {navigationItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className={`font-raleway font-medium text-left relative cursor-pointer ${
                        activeSection === item.id
                          ? 'text-[#ad8a6c] font-semibold'
                          : 'text-[#421d13] hover:text-[#ad8a6c]'
                      }`}
                    >
                      {item.name}
                      {activeSection === item.id && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#ad8a6c] rounded-full" />
                      )}
                    </button>
                  ))}

                  {/* Language Switcher - Mobile */}
                  <div className="pt-3 border-t border-[#ad8a6c]/20">
                    <LanguageSwitcher currentLocale={locale} />
                  </div>
                </div>
              </nav>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <Hero onScrollToSection={scrollToSection} locale={locale} />

        {/* Highlights Section */}
        <section className="py-8 md:py-12 -mt-8 md:-mt-12 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="highlights-marquee">
              <div className="highlights-track">
                {Array.from({ length: 6 }).map((_, setIndex) => (
                  <React.Fragment key={setIndex}>
                    <div className="highlight-item">
                      <span className="highlight-text">{t.highlights.growth}</span>
                      <div className="highlight-icon">
                        <Image src="/gif.gif" alt="Animation" fill className="object-contain" unoptimized />
                      </div>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-text">{t.highlights.satisfaction}</span>
                      <div className="highlight-icon">
                        <Image src="/gif.gif" alt="Animation" fill className="object-contain" unoptimized />
                      </div>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-text">{t.highlights.promotion}</span>
                      <div className="highlight-icon">
                        <Image src="/gif.gif" alt="Animation" fill className="object-contain" unoptimized />
                      </div>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-text">{t.highlights.countries}</span>
                      <div className="highlight-icon">
                        <Image src="/gif.gif" alt="Animation" fill className="object-contain" unoptimized />
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Case Studies Section */}
        <CaseStudies locale={locale} />

        {/* How I Lead Section */}
        <HowILead locale={locale} />

        {/* About Me Section */}
        <About locale={locale} />

        {/* Experience Section */}
        <Experience locale={locale} />

        {/* Recommendations Section */}
        <Recommendations locale={locale} />

        {/* Latest Articles Section */}
        <LatestArticles locale={locale} />

        {/* Contact Section */}
        <Contact locale={locale} />

        {/* Footer */}
        <footer className="py-12 bg-[rgba(173,138,108,0.08)] border-t border-[#ad8a6c]/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center space-y-6">
              <div className="font-roboto-flex font-light text-lg md:text-xl text-[#6b6763] space-y-4">
                <div className="flex flex-col items-center gap-4">
                  <p className="text-center leading-relaxed">
                    {t.footer.crafted}{' '}
                    <span className="inline-flex items-center gap-1">
                      Cursor
                      <Image
                        src="/Cursor Logo SVG.svg"
                        alt="Cursor"
                        width={16}
                        height={16}
                        className="opacity-60 hover:opacity-100 transition-opacity"
                      />
                    </span>
                    ,{' '}
                    <span className="inline-flex items-center gap-1">
                      Claude
                      <Image
                        src="/Logo Claude AI.svg"
                        alt="Claude AI"
                        width={16}
                        height={16}
                        className="opacity-60 hover:opacity-100 transition-opacity"
                      />
                    </span>
                    {' '}&{' '}
                    <span className="inline-flex items-center gap-1">
                      Figma
                      <Image
                        src="/Figma Logo SVG.svg"
                        alt="Figma"
                        width={16}
                        height={16}
                        className="opacity-60 hover:opacity-100 transition-opacity"
                      />
                    </span>
                    , {t.footer.powered}
                  </p>
                </div>
                <p>{t.footer.rights}</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ClientOnly>
  );
}
