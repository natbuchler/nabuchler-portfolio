/**
 * 3TPM - Global Product Architecture Case Study
 *
 * Source: Figma node 3341:4000
 * Following exact Figma MCP design with reusable components
 */

'use client';

import React, { useState, useEffect } from 'react';
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

export default function Case3TPM() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const CORRECT_PASSWORD = 'n@Buchler2025';

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

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('3tpm-auth', 'true');
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  // Password protection screen
  if (!isAuthenticated) {
    return (
      <div className="bg-[#e3dcd6] min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-[rgba(255,255,255,0.35)] backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-[#ad8a6c]/20">
            <div className="text-center mb-8">
              <h1 className="font-playfair font-bold text-3xl md:text-4xl text-[#421d13] mb-2">
                Protected Case Study
              </h1>
              <p className="font-roboto-flex font-light text-lg text-[#6b6763]">
                This case study is password protected
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block font-roboto-flex font-medium text-[#421d13]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-sm font-roboto-flex text-[#ad8a6c] hover:text-[#421d13] transition-colors"
                  >
                    {showPassword ? 'Hide' : 'Show'}
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
                  className={`w-full px-4 py-3 rounded-lg border ${
                    error ? 'border-red-500' : 'border-[#ad8a6c]/30'
                  } bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#ad8a6c] transition-all font-roboto-flex text-[#421d13]`}
                  placeholder="Enter password"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 font-roboto-flex">
                    Incorrect password. Please try again.
                  </p>
                )}
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Enter
              </Button>

              <Link href="/" className="w-full block">
                <Button variant="secondary" className="w-full">
                  Back to portfolio
                </Button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const scrollToTop = () => {
    window.location.href = '/';
  };

  const navigationItems = [
    { name: 'About', id: 'about' },
    { name: 'Cases', id: 'cases' },
    { name: 'Leadership', id: 'leadership' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <div className="bg-[#e3dcd6] min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[rgba(173,138,108,0.2)] backdrop-blur-sm border-b border-[#ad8a6c]/20">
        <div className="container mx-auto px-4 md:px-8 py-3">
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

            {/* Location and Time - Desktop Only */}
            <div className="hidden md:flex items-center gap-2 text-[#ad8a6c]">
              <span className="font-raleway text-sm md:text-base">São Paulo</span>
              <div className="w-6 h-6 relative opacity-30">
                <Image
                  src="/cy.svg"
                  alt="Location"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-raleway text-sm md:text-base">{currentTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-8 py-16 max-w-[1200px]">

        {/* Title Section */}
        <section className="mb-16 md:mb-24">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1 w-full md:max-w-[655px]">
              <h1 className="font-playfair font-bold text-4xl md:text-[64px] leading-[1.2] text-[#421d13] mb-6 md:mb-8">
                3TPM - Global Product Architecture
              </h1>
              <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
                Leading cross-functional design strategy to solve product variant complexity across +30 countries, enabling major partnerships and delivering measurable business impact in one quarter.
              </p>
            </div>
            <div className="relative w-full md:w-[558px] h-[300px] md:h-[553.5px] rounded-3xl overflow-hidden shrink-0">
              <Image
                src="/Befor-after.png"
                alt="Before and After comparison"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Numbers Section */}
        <section className="mb-16 md:mb-24">
          <div className="flex flex-wrap gap-4 md:gap-7 justify-center">
            <CardNumbers number="+24" label="Conversion Rate" />
            <CardNumbers number="+21%" label="Ticket Size (BR)" />
            <CardNumbers number="+30" label="Countries" />
            <CardNumbers number="64k+" label="SKUs" />
          </div>
        </section>

        {/* Problem Section */}
        <section className="mb-16 md:mb-24">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div className="w-full md:max-w-[637px]">
              <TitleCase title="The problem" />
              <div className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] space-y-6">
                <p>
                  Picture this: a customer in Argentina searching for &quot;Cerveza Patricia 960ml&quot; sees two products with identical images and names, but different pack sizes. They add the wrong one to cart, complete the purchase, and only realize the mistake when the delivery arrives.
                </p>
                <p>
                  This wasn&apos;t an isolated incident. It was a symptom of a much larger problem.
                </p>
              </div>
            </div>
            <div className="relative w-full md:w-[518px] h-[300px] md:h-[542.5px] rounded-3xl overflow-hidden shrink-0">
              <Image
                src="/Photo arm.png"
                alt="Product architecture challenge"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Highlighted Quote */}
          <QuoteBlock
            quote="BEES catalog exploded from 600 to 64,000+ SKUs in just 3 years. Each of 32 markets managed taxonomy independently, same product, different images, inconsistent data, zero standardization."
            size="large"
            className="mb-8 bg-[rgba(255,255,255,0.35)] backdrop-blur-sm rounded-3xl"
          />

          <div className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] space-y-6">
            <p>
              The chaos wasn&apos;t just frustrating users. It was blocking contracts with Nestlé, L&apos;Oréal, and Gloria. These partners needed a governed, scalable platform; and our current architecture couldn&apos;t deliver it.
            </p>
            <p>
              Search was broken, recommendations were unreliable and every new marketplace integration made things worse.
            </p>
          </div>
        </section>

        {/* Strategic Challenge Section */}
        <section className="mb-16 md:mb-24">
          <TitleCase title="The strategic challenge" />

          <div className="relative w-full h-[300px] md:h-[638px] rounded-3xl overflow-hidden mb-8">
            <Image
              src="/Fluxogram.png"
              alt="Strategic challenge flowchart"
              fill
              className="object-contain"
            />
          </div>

          <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] mb-6">
            When I took over the main shopping journey at BEES, I inherited more than broken taxonomy. I inherited a structural problem that required alignment across:
          </p>

          <BulletList
            iconType="brown-cy"
            items={[
              'Platform teams building new backend architecture (Catalog Admin, 3TPM structure)',
              'External partners like Nestlé and L\'Oréal demanding specific capabilities to go live',
              '32 markets with different needs, languages, and business models',
              'Multiple value streams (pricing, data, inventory) all impacted by the change'
            ]}
            className="mb-8"
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-6 mb-8">
            <Tag label="Cross-functional Leadership" />
            <Tag label="Stakeholder Management" />
            <Tag label="Systems Thinking" />
            <Tag label="Strategic Design" />
          </div>

          <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
            The biggest challenge wasn&apos;t design, it was alignment. Different teams had conflicting priorities. Platform couldn&apos;t prioritize fast enough and commercial pressure was mounting.
          </p>
        </section>

        {/* Team's Approach Section */}
        <section className="mb-16 md:mb-24">
          <TitleCase title="Team's approach" />

          {/* 1. Research before solutions */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-4 mb-12">
            <div className="flex-1 w-full md:max-w-[678px] space-y-6">
              <h3 className="font-playfair font-bold text-2xl md:text-[28px] leading-[44px] text-[#c95127]">
                1. Research before solutions
              </h3>
              <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
                Before defining any solution, I led qualitative field research in Argentina and São Paulo with 15+ POCs across Off Trade, On Trade, and Pharma segments. The goal: understand the real pain, not assume it.
              </p>
              <p className="font-roboto font-medium text-sm md:text-[16px] text-[#6b6763] uppercase tracking-[-0.24px]">
                Key findings:
              </p>
              <BulletList
                iconType="orange-point"
                items={[
                  'Users relied heavily on visual information, making variant differences critical',
                  'Purchase errors weren\'t just annoying; they eroded trust in the catalog',
                  'POCs needed clarity fast, most orders happened in high-pressure, time-constrained moments'
                ]}
              />
            </div>
            <div className="relative w-full md:w-[507px] h-[300px] md:h-[508.5px] rounded-3xl overflow-hidden shrink-0">
              <Image
                src="/Team.png"
                alt="Team collaboration"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* 2. Facilitating cross-functional alignment */}
          <div className="mb-12">
            <h3 className="font-playfair font-bold text-2xl md:text-[28px] leading-[44px] text-[#c95127] mb-6">
              2. Facilitating cross-functional alignment
            </h3>
            <div className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] space-y-6 mb-6">
              <p>
                I facilitated an inception with Product, Engineering, Data Science, and Nestlé representatives. This wasn&apos;t a design review, it was a strategic alignment session.
              </p>
              <p>We emerged with two clear hypotheses:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-[rgba(255,255,255,0.35)] rounded-3xl p-6 text-center">
                <h4 className="font-roboto font-medium text-lg md:text-[20px] text-[#421d13] uppercase tracking-[-0.3px] mb-4">
                  App (BEES Customer)
                </h4>
                <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
                  At the point of sale, clarity drives conversion. If the app doesn&apos;t guide the choice well, the order doesn&apos;t happen.
                </p>
              </div>
              <div className="bg-[rgba(255,255,255,0.35)] rounded-3xl p-6 text-center">
                <h4 className="font-roboto font-medium text-lg md:text-[20px] text-[#421d13] uppercase tracking-[-0.3px] mb-4">
                  Platform (BEES One)
                </h4>
                <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
                  How do you scale a global B2B operation if your catalog still treats every SKU as an isolated unit?
                </p>
              </div>
            </div>

            <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
              This alignment was critical. It ensured design work wasn&apos;t just guessing, it was grounded in real user needs and tailored to our platform&apos;s strategic constraints.
            </p>
          </div>

          {/* 3. Validating with users */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-14 mb-12">
            <div className="relative w-full md:w-[636.5px] h-[300px] md:h-[643px] rounded-3xl overflow-hidden shrink-0 order-2 md:order-1">
              <Image
                src="/simplified-detailed.png"
                alt="Simplified vs Detailed view"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1 w-full md:max-w-[510px] space-y-6 order-1 md:order-2">
              <h3 className="font-playfair font-bold text-2xl md:text-[28px] leading-[44px] text-[#c95127]">
                3. Validating with users
              </h3>
              <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
                I led 12 usability tests in São Paulo (Off Trade, On Trade, Pharma) using high-fidelity Figma prototypes. We tested two extremes: detailed variant presentation vs. simplified.
              </p>
              <p className="font-roboto font-medium text-sm md:text-[16px] text-[#6b6763] uppercase tracking-[-0.24px]">
                Results were clear:
              </p>
              <BulletList
                iconType="orange-point"
                items={[
                  '25% faster purchase completion',
                  '40% higher satisfaction in navigation',
                  '60% found it easier to compare options'
                ]}
              />
            </div>
          </div>

          {/* Quote */}
          <QuoteBlock
            quote="I click less and understand better what I'm buying."
            author="User during testing"
            size="large"
            className="mb-12"
          />

          {/* 4. The "MVP of the MVP" decision */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-14">
            <div className="flex-1 w-full md:max-w-[760px] space-y-6">
              <h3 className="font-playfair font-bold text-2xl md:text-[28px] leading-[44px] text-[#c95127]">
                4. The &quot;MVP of the MVP&quot; decision
              </h3>
              <div className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] space-y-6">
                <p>
                  Here&apos;s where leadership mattered most. Platform teams couldn&apos;t deliver the full 3TPM architecture in time. Commercial pressure was intense. Nestlé and L&apos;Oréal contracts were on hold.
                </p>
                <p>
                  I made the call: ship a simplified version directly in the app, without waiting for complete platform support.
                </p>
              </div>
              <p className="font-roboto font-medium text-sm md:text-[16px] text-[#6b6763] uppercase tracking-[-0.24px]">
                This meant:
              </p>
              <BulletList
                iconType="orange-point"
                items={[
                  'Trade-offs on what was "must-have" vs. "nice-to-have"',
                  'Building the variant selector experience in the front-end first',
                  'Accepting technical debt we\'d need to refactor later'
                ]}
              />
              <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
                It wasn&apos;t the perfect solution. But it was the right solution for that moment.
              </p>
            </div>
            <div className="relative w-full md:w-[326px] h-[300px] md:h-[643px] rounded-3xl overflow-hidden shrink-0">
              <Image
                src="/mvp=mvp.png"
                alt="MVP of MVP"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="mb-16 md:mb-24">
          <TitleCase title="The impact" />

          <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] mb-6">
            Despite shipping an &quot;MVP of the MVP&quot; without full platform support, results were immediate and significant:
          </p>

          <BulletList
            iconType="orange-point"
            items={[
              'Nestlé and L\'Oréal contracts unblocked within 4 weeks',
              'Product hierarchy now scalable across 32 countries',
              '3TPM architecture validated in real-world conditions before full backend rollout'
            ]}
            className="mb-10"
          />

          <div className="flex flex-wrap gap-4 md:gap-7 justify-center mb-10">
            {[
              { title: '+24% Conversion', desc: 'Across 7 pilot markets vs. markets without the feature' },
              { title: 'Contract unblocked', desc: 'Nestlé & L\'Oréal went live 4 weeks after MVP' },
              { title: '+21% Ticket Size', desc: 'In Brazil, where variant clarity drove larger orders' },
              { title: 'R$250k+ Orders', desc: 'Argentina saw order sizes over R$250,000 with improved variant selection' }
            ].map((item, i) => (
              <div key={i} className="bg-[rgba(255,255,255,0.35)] backdrop-blur-sm rounded-2xl p-6 w-full md:w-[281px]">
                <h3 className="font-playfair font-semibold text-2xl md:text-[28px] text-[#421d13] tracking-[0.56px] mb-4">
                  {item.title}
                </h3>
                <p className="font-roboto-flex text-base md:text-[18px] leading-[1.5] text-[#6b6763] tracking-[0.36px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px]">
            Critically, we achieved this in one quarter, working within severe technical and timeline constraints. The variant selector wasn&apos;t just a UX improvement. It was a business unlock.
          </p>
        </section>

        {/* What I Learned Section */}
        <section className="mb-16 md:mb-24">
          <TitleCase title="What I learned" />

          <div className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] space-y-6 mb-6">
            <p>
              This project taught me that great systems aren&apos;t born from perfect screens—they&apos;re built on clear conversations, smart trade-offs, and team trust.
            </p>
            <p>The biggest challenge wasn&apos;t technical. It was human:</p>
          </div>

          <BulletList
            iconType="orange-point"
            items={[
              'Aligning siloed teams with conflicting priorities',
              'Navigating political tensions between platform and product',
              'Making tough calls when perfect wasn\'t possible',
              'Holding space for the user\'s voice when business pressure was intense'
            ]}
            className="mb-10"
          />

          <p className="font-roboto-flex font-light text-lg md:text-[24px] leading-[1.5] text-[#6b6763] tracking-[0.48px] mb-6">
            I grew my influence significantly. I earned trust from engineers, PMs, data teams, and senior leadership by showing I could:
          </p>

          <BulletList
            iconType="brown-cy"
            items={[
              'Facilitate difficult conversations',
              'Prioritize ruthlessly under constraints',
              'Deliver real business impact, not just polished designs',
              'Protect the user experience when it mattered most'
            ]}
            className="mb-10"
          />

          <QuoteBlock
            quote="This is the kind of work I love most: living at the intersection of strategic design, business impact, and cross-functional leadership."
            author="Myself"
            size="large"
          />
        </section>

        {/* Next Case Section */}
        <section className="mb-16 md:mb-24 flex justify-center md:justify-end">
          <CardCaseS
            title="Coming soon"
            image=""
            variant="next"
            disabled={true}
          />
        </section>

      </main>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-12 border-t border-[#ad8a6c]/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center space-y-6">
            <div className="font-roboto-flex font-light text-lg md:text-xl text-[#6b6763] space-y-4">
              <div className="flex flex-col items-center gap-4">
                <p className="text-center leading-relaxed">
                  Crafted hands-on by Natasha — built with{' '}
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
                  , powered by Next.js, Tailwind CSS & Framer Motion.
                </p>
              </div>
              <p>© 2025 Natasha Buchler. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
