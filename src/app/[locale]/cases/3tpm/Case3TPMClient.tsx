/**
 * 3TPM - Global Product Architecture Case Study - Client Component
 *
 * Source: Figma node 3341:4000
 * Following exact Figma MCP design with reusable components
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { CardCaseS } from '@/components/ui/CardCaseS';
import { CardNumbers } from '@/components/ui/CardNumbers';
import { TitleCase } from '@/components/ui/TitleCase';
import { Tag } from '@/components/ui/Tag';
import { QuoteBlock } from '@/components/ui/QuoteBlock';
import { BulletList } from '@/components/ui/BulletList';
import Contact from '@/components/sections/Contact';
import Button from '@/components/Button';
import { Locale, getTranslations } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface Case3TPMClientProps {
  locale: Locale;
}

export default function Case3TPMClient({ locale }: Case3TPMClientProps) {
  const t = getTranslations(locale);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check if already authenticated (session storage)
  useEffect(() => {
    const auth = sessionStorage.getItem('3tpm-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

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

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const response = await fetch('/api/auth/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, caseId: '3tpm' })
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('3tpm-auth', 'true');
        setError(false);
      } else {
        setError(true);
        setPassword('');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(true);
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  // Password protection screen
  if (!isAuthenticated) {
    return (
      <div className="bg-[#e3dcd6] min-h-screen flex items-center justify-center px-6 py-12">
        <motion.div
          className="w-full md:w-auto mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-[rgba(255,255,255,0.35)] backdrop-blur-sm rounded-3xl p-8 md:p-12 md:min-w-[480px] md:max-w-[480px] shadow-xl border border-[#ad8a6c]/20">
            <div className="text-center mb-10">
              <h1 className="font-playfair font-bold text-3xl md:text-[40px] text-[#421d13] mb-3 leading-tight">
                {t.caseStudies.passwordProtection.title}
              </h1>
              <p className="font-roboto-flex font-light text-base md:text-lg text-[#6b6763]">
                {t.caseStudies.passwordProtection.subtitle}
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="password" className="block font-roboto-flex font-medium text-[#421d13]">
                    {t.caseStudies.passwordProtection.passwordLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-sm font-roboto-flex text-[#ad8a6c] hover:text-[#421d13] transition-colors"
                  >
                    {showPassword ? t.caseStudies.passwordProtection.hidePassword : t.caseStudies.passwordProtection.showPassword}
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className={`w-full px-5 py-4 rounded-xl border-2 ${
                    error ? 'border-red-500' : 'border-[#ad8a6c]/30'
                  } bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#ad8a6c] focus:border-[#ad8a6c] transition-all font-roboto-flex text-[#421d13] text-lg`}
                  placeholder={t.caseStudies.passwordProtection.passwordPlaceholder}
                  autoFocus
                />
                {error && (
                  <p className="mt-3 text-sm text-red-600 font-roboto-flex">
                    {t.caseStudies.passwordProtection.incorrectPassword}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? t.caseStudies.passwordProtection.verifying : t.caseStudies.passwordProtection.enterButton}
                </Button>

                <Link href={`/${locale}`} className="w-full block">
                  <Button variant="secondary" className="w-full">
                    {t.caseStudies.passwordProtection.backButton}
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  const scrollToTop = () => {
    window.location.href = '/';
  };

  const navigationItems = [
    { name: t.case3tpm.navigation.about, id: 'about' },
    { name: t.case3tpm.navigation.cases, id: 'cases' },
    { name: t.case3tpm.navigation.leadership, id: 'leadership' },
    { name: t.case3tpm.navigation.experience, id: 'experience' },
    { name: t.case3tpm.navigation.contact, id: 'contact' }
  ];

  return (
    <div className="bg-[#e3dcd6] min-h-screen pt-[72px]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(173,138,108,0.2)] backdrop-blur-sm border-b border-[#ad8a6c]/20">
        <div className="mx-auto px-4 md:px-8 py-3 max-w-[1280px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={scrollToTop}
                className="hover:scale-110 transition-transform duration-200 cursor-pointer"
                title="Voltar ao início"
                aria-label="Scroll to top"
              >
                <Icon tipo="rosto" size="32" />
              </button>
              <div className="w-px h-6 bg-[#ad8a6c]"></div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6 ml-6">
                {navigationItems.map((item) => {
                  const isActive = item.id === 'cases';
                  return (
                    <Link
                      key={item.name}
                      href={`/#${item.id}`}
                      className={`font-raleway font-medium transition-all duration-200 relative ${
                        isActive
                          ? 'text-[#ad8a6c] font-semibold'
                          : 'text-[#421d13] hover:text-[#ad8a6c]'
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ad8a6c] rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right side: Location/Time + Mobile Menu Button */}
            <div className="flex items-center gap-3">
              {/* Location and Time - VISIBLE ON MOBILE AND DESKTOP */}
              <div className="flex items-center gap-2 text-[#ad8a6c]">
                <span className="font-raleway text-xs md:text-base">São Paulo</span>
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
                className="md:hidden p-2"
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
                {navigationItems.map((item) => {
                  const isActive = item.id === 'cases';
                  return (
                    <Link
                      key={item.name}
                      href={`/#${item.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-raleway font-medium text-left relative ${
                        isActive
                          ? 'text-[#ad8a6c] font-semibold'
                          : 'text-[#421d13] hover:text-[#ad8a6c]'
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#ad8a6c] rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto px-4 md:px-8 py-16 max-w-[1280px]">

        {/* Title Section */}
        <section className="mb-16 md:mb-24">
          <motion.div
            className="flex flex-col md:flex-row gap-8 md:gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex-1 w-full md:max-w-[655px]">
              <h1 className="font-playfair font-bold text-4xl md:text-[64px] leading-[1.2] text-[#421d13] mb-6 md:mb-8">
                {t.case3tpm.hero.title}
              </h1>
              <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
                {t.case3tpm.hero.subtitle}
              </p>
            </div>
            <div className="relative w-full h-[400px] md:w-[558px] md:h-[553.5px] rounded-3xl overflow-hidden shrink-0">
              <Image
                src="/Befor-after.png"
                alt="Before and After comparison"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </section>

        {/* Numbers Section */}
        <section className="mb-16 md:mb-24">
          <motion.div
            className="flex flex-wrap gap-4 md:gap-7 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CardNumbers number={t.case3tpm.numbers[0].number} label={t.case3tpm.numbers[0].label} />
            <CardNumbers number={t.case3tpm.numbers[1].number} label={t.case3tpm.numbers[1].label} />
            <CardNumbers number={t.case3tpm.numbers[2].number} label={t.case3tpm.numbers[2].label} />
            <CardNumbers number={t.case3tpm.numbers[3].number} label={t.case3tpm.numbers[3].label} />
          </motion.div>
        </section>

        {/* Problem Section */}
        <section className="mb-16 md:mb-24">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-full md:max-w-[637px]">
              <TitleCase title={t.case3tpm.problem.title} />
              <div className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] space-y-6">
                <p>
                  {t.case3tpm.problem.paragraphs[0]}
                </p>
                <p>
                  {t.case3tpm.problem.paragraphs[1]}
                </p>
              </div>
            </div>
            <div className="relative w-full h-[400px] md:w-[518px] md:h-[542.5px] rounded-3xl overflow-hidden shrink-0">
              <Image
                src="/Photo arm.png"
                alt="Product architecture challenge"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 bg-[rgba(255,255,255,0.35)] backdrop-blur-sm rounded-3xl p-8 md:p-12">
              <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
                {t.case3tpm.problem.quote}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] space-y-6">
              <p>
                {t.case3tpm.problem.additionalParagraphs[0]}
              </p>
              <p>
                {t.case3tpm.problem.additionalParagraphs[1]}
              </p>
            </div>
          </motion.div>
        </section>

        {/* Strategic Challenge Section */}
        <section className="mb-16 md:mb-24">
          <TitleCase title={t.case3tpm.strategicChallenge.title} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-[400px] md:h-[638px] rounded-3xl overflow-hidden mb-8">
              <Image
                src="/Fluxogram.png"
                alt="Strategic challenge flowchart"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] mb-6">
              {t.case3tpm.strategicChallenge.intro}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <BulletList
              iconType="brown-cy"
              items={t.case3tpm.strategicChallenge.bulletPoints}
              className="mb-8"
            />
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {t.case3tpm.strategicChallenge.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
              {t.case3tpm.strategicChallenge.conclusion}
            </p>
          </motion.div>
        </section>

        {/* Team's Approach Section */}
        <section className="mb-16 md:mb-24">
          <TitleCase title={t.case3tpm.teamsApproach.title} />

          {/* 1. Research before solutions */}
          <motion.div
            className="flex flex-col md:flex-row gap-8 md:gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex-1 w-full md:max-w-[678px] space-y-6">
              <h3 className="font-playfair font-bold text-2xl md:text-[28px] leading-[44px] text-[#c95127]">
                {t.case3tpm.teamsApproach.section1.subtitle}
              </h3>
              <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
                {t.case3tpm.teamsApproach.section1.paragraphs[0]}
              </p>
              <p className="font-roboto font-medium text-sm md:text-[16px] text-[#6b6763] uppercase tracking-[-0.24px]">
                {t.case3tpm.teamsApproach.section1.keyFindingsLabel}
              </p>
              <BulletList
                iconType="orange-point"
                items={t.case3tpm.teamsApproach.section1.findings}
              />
            </div>
            <div className="relative w-full h-[400px] md:w-[507px] md:h-[508.5px] rounded-3xl overflow-hidden shrink-0">
              <Image
                src="/Team.png"
                alt="Team collaboration"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* 2. Facilitating cross-functional alignment */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-playfair font-bold text-2xl md:text-[28px] leading-[44px] text-[#c95127] mb-6">
              {t.case3tpm.teamsApproach.section2.subtitle}
            </h3>
            <div className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] space-y-6 mb-6">
              <p>
                {t.case3tpm.teamsApproach.section2.paragraphs[0]}
              </p>
              <p>{t.case3tpm.teamsApproach.section2.paragraphs[1]}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {t.case3tpm.teamsApproach.section2.hypotheses.map((hypothesis, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.35)] rounded-3xl p-6 text-center">
                  <h4 className="font-roboto font-medium text-lg md:text-[20px] text-[#421d13] uppercase tracking-[-0.3px] mb-4">
                    {hypothesis.title}
                  </h4>
                  <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
                    {hypothesis.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
              {t.case3tpm.teamsApproach.section2.conclusion}
            </p>
          </motion.div>

          {/* 3. Validating with users */}
          <motion.div
            className="flex flex-col md:flex-row gap-8 md:gap-14 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-[400px] md:w-[636.5px] md:h-[643px] rounded-3xl overflow-hidden shrink-0 md:order-1">
              <Image
                src="/simplified-detailed.png"
                alt="Simplified vs Detailed view"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1 w-full md:max-w-[510px] space-y-6 md:order-2">
              <h3 className="font-playfair font-bold text-2xl md:text-[28px] leading-[44px] text-[#c95127]">
                {t.case3tpm.teamsApproach.section3.subtitle}
              </h3>
              <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
                {t.case3tpm.teamsApproach.section3.description}
              </p>
              <p className="font-roboto font-medium text-sm md:text-[16px] text-[#6b6763] uppercase tracking-[-0.24px]">
                {t.case3tpm.teamsApproach.section3.resultsLabel}
              </p>
              <BulletList
                iconType="orange-point"
                items={t.case3tpm.teamsApproach.section3.results}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <QuoteBlock
              quote={t.case3tpm.teamsApproach.section3.userQuote.quote}
              author={t.case3tpm.teamsApproach.section3.userQuote.author}
              size="large"
              className="mb-12"
            />
          </motion.div>

          {/* 4. The "MVP of the MVP" decision */}
          <motion.div
            className="flex flex-col md:flex-row gap-8 md:gap-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex-1 w-full md:max-w-[760px] space-y-6">
              <h3 className="font-playfair font-bold text-2xl md:text-[28px] leading-[44px] text-[#c95127]">
                {t.case3tpm.teamsApproach.section4.subtitle}
              </h3>
              <div className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] space-y-6">
                <p>
                  {t.case3tpm.teamsApproach.section4.paragraphs[0]}
                </p>
                <p>
                  {t.case3tpm.teamsApproach.section4.paragraphs[1]}
                </p>
              </div>
              <p className="font-roboto font-medium text-sm md:text-[16px] text-[#6b6763] uppercase tracking-[-0.24px]">
                {t.case3tpm.teamsApproach.section4.meantLabel}
              </p>
              <BulletList
                iconType="orange-point"
                items={t.case3tpm.teamsApproach.section4.meant}
              />
              <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
                {t.case3tpm.teamsApproach.section4.conclusion}
              </p>
            </div>
            <div className="relative w-full h-[500px] md:w-[326px] md:h-[643px] rounded-3xl overflow-hidden shrink-0">
              <Image
                src="/mvp=mvp.png"
                alt="MVP of MVP"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </section>

        {/* Impact Section */}
        <section className="mb-16 md:mb-24">
          <TitleCase title={t.case3tpm.impact.title} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] mb-6">
              {t.case3tpm.impact.intro}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <BulletList
              iconType="orange-point"
              items={t.case3tpm.impact.bulletPoints}
              className="mb-10"
            />
          </motion.div>

          <div className="flex flex-wrap gap-4 md:gap-7 justify-center mb-10">
            {t.case3tpm.impact.impactCards.map((item, i) => (
              <motion.div
                key={i}
                className="bg-[rgba(255,255,255,0.35)] backdrop-blur-sm rounded-2xl p-6 w-full md:w-[281px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                viewport={{ once: true }}
              >
                <h3 className="font-playfair font-semibold text-2xl md:text-[28px] text-[#421d13] tracking-[0.56px] mb-4">
                  {item.title}
                </h3>
                <p className="font-roboto-flex text-base md:text-[18px] leading-[1.5] text-[#6b6763] tracking-[0.36px]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
              {t.case3tpm.impact.conclusion}
            </p>
          </motion.div>
        </section>

        {/* What I Learned Section */}
        <section className="mb-16 md:mb-24">
          <TitleCase title={t.case3tpm.learned.title} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] space-y-6 mb-6">
              <p>
                {t.case3tpm.learned.intro[0]}
              </p>
              <p>{t.case3tpm.learned.intro[1]}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <BulletList
              iconType="orange-point"
              items={t.case3tpm.learned.challenges}
              className="mb-10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] mb-6">
              {t.case3tpm.learned.growth}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <BulletList
              iconType="brown-cy"
              items={t.case3tpm.learned.achievements}
              className="mb-10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <QuoteBlock
              quote={t.case3tpm.learned.personalQuote.quote}
              author={t.case3tpm.learned.personalQuote.author}
              size="large"
            />
          </motion.div>
        </section>

        {/* Next Case Section */}
        <section className="mb-16 md:mb-24">
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <CardCaseS
              title={t.case3tpm.nextCase.title}
              image=""
              variant="next"
              disabled={true}
            />
          </motion.div>
        </section>

      </main>

      {/* Contact Section */}
      <Contact locale={locale} />

      {/* Footer */}
      <footer className="py-12 border-t border-[#ad8a6c]/20">
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
  );
}
