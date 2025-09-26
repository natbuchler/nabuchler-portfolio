'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ClientOnly from '@/components/ClientOnly';

// Asset constants
const imgPexelsEllyFairytale = "/pexels-elly-fairytale-3823207-1.jpg";
const imgGif = "/gif.gif";
const imgPhoto = "/photo.png";
const imgPhoto2 = "/Photo2.png";
const imgRosto = "/rosto.svg";
const imgPonto = "/ponto.svg";
const imgCy = "/cy.svg";
const imgQuote = "/quote.svg";
const imgLineTimeline = "/Line-timeline.svg";

interface IconProps {
  tipo?: "cy" | "ponto" | "rosto" | "Medium" | "Email" | "CV" | "Linkedin";
  size?: "32" | "64" | "48" | "124";
  className?: string;
}

function Icon({ tipo = "rosto", size = "48", className = "" }: IconProps) {
  const sizeClasses = {
    "32": "w-8 h-8",
    "48": "w-12 h-12",
    "64": "w-16 h-16",
    "124": "w-[124px] h-[124px]"
  };
  
  const iconSources = {
    rosto: imgRosto,
    ponto: imgPonto,
    cy: imgCy,
  };
  
  if (tipo in iconSources) {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        <Image
          src={iconSources[tipo as keyof typeof iconSources]}
          alt={tipo}
          fill
          className="object-contain"
        />
      </div>
    );
  }

  // Social icons placeholder
  return (
    <div className={`relative ${sizeClasses[size]} ${className} bg-[#ad8a6c] rounded-lg flex items-center justify-center`}>
      <span className="text-[#421d13] font-medium text-sm">{tipo}</span>
    </div>
  );
}

function TitleSubTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div 
      className="flex flex-col gap-4 items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="font-playfair font-bold text-3xl md:text-5xl text-[#421d13] leading-tight">
        {title}
      </h2>
      <div className="bg-[#ad8a6c] h-1 rounded-full w-24" />
      {subtitle && (
        <p className="font-roboto-flex font-light text-lg md:text-2xl text-[#6b6763] max-w-4xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function CardCase({ side = "Right", title, description, image }: {
  side?: "Left" | "Right";
  title: string;
  description: string;
  image: string;
}) {
  const isLeft = side === "Left";
  
  return (
    <motion.div 
      className={`flex flex-col md:flex-row ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} bg-[#d9ccc1] rounded-3xl overflow-hidden shadow-lg max-w-4xl w-full`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex-1 p-6 md:p-8 bg-[rgba(173,138,108,0.2)] flex flex-col justify-center">
        <div className="flex flex-col">
          <h3 className="font-playfair font-bold text-2xl md:text-4xl text-[#421d13] leading-tight">
            {title}
          </h3>
          <p className="font-roboto-flex text-base md:text-lg text-[#6b6763] leading-relaxed mt-2">
            {description}
          </p>
          <button className="border border-[#421d13] text-[#421d13] px-6 py-2 rounded-lg font-roboto font-medium hover:bg-[#421d13] hover:text-[#e3dcd6] transition-all duration-300 w-fit mt-10">
            Dive Deeper
          </button>
        </div>
      </div>
      <div className="flex-1 relative min-h-[250px] md:min-h-[364px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    </motion.div>
  );
}

function CardInsight({ title, description }: { title: string; description: string }) {
  return (
    <motion.div 
      className="bg-[rgba(255,255,255,0.35)] backdrop-blur-sm rounded-2xl p-6 flex-1 min-w-[250px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="space-y-4">
        <Icon tipo="cy" size="48" />
        <h3 className="font-playfair font-semibold text-xl md:text-2xl text-[#421d13] leading-tight">
          {title}
        </h3>
        <p className="font-roboto-flex text-base md:text-lg text-[#6b6763] leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function CardExperience({
  role,
  company,
  period,
  description,
  achievements,
  iconType = "ponto",
  iconIndex = 0
}: {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  iconType?: "cy" | "ponto";
  iconIndex?: number;
}) {
  // Alternar cores: marrom para índices pares, laranja para ímpares
  const iconColor = iconIndex % 2 === 0 ? "#421d13" : "#c95127";
  return (
    <motion.div 
      className="flex gap-6 md:gap-14 items-start w-full max-w-6xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="shrink-0 mt-2 relative z-10 w-12 h-12" style={{ color: iconColor }}>
        {iconType === "cy" ? (
          <svg width="48" height="48" viewBox="0 0 107.54 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.86,76.9c-4.6,0-9.21.13-13.81-.05-2.43-.1-4.92-.45-7.22-1.2-5.23-1.7-6.47-6.6-2.44-10.31,2.96-2.73,6.39-5.02,9.81-7.18,4.87-3.07,9.98-5.74,14.87-8.78,3.49-2.17,3.53-3.74.39-6.54-4.94-4.4-10.02-8.64-14.93-13.08-2.59-2.34-5-4.89-7.4-7.44-2.52-2.67-3.69-7.59-2.41-9.6,1.37-2.17,6.89-3.84,10.13-3.08,6.42,1.51,11.51,5.14,15.76,10.02,2.98,3.42,5.77,7.01,8.72,10.44.51.59,1.44.81,2.18,1.21.32-.78.94-1.57.91-2.33-.17-3.96-.52-7.92-.77-11.88-.15-2.45-.38-4.91-.32-7.36.05-2.4-.18-5.16,2.87-6.14,4.04-1.3,6.84-1.41,9.23,1.67,4.05,5.23,8.22,10.36,12.34,15.54.64.8,1.29,1.59,2.2,2.71.94-1.15,1.75-2.13,2.55-3.12,2.84-3.54,5.9-6.93,8.46-10.66,3.75-5.44,9.32-7.71,15.21-9.74,3.41,11.2-3.09,20.08-6.71,29.65,7.39,1.4,15.17-1.72,22.04,2.92-.91,2.71-2.31,4.63-4.71,5.94-8.78,4.81-17.5,9.73-26.24,14.61-.89.5-1.73,1.08-2.99,1.88,3.22,2.01,6.18,3.77,9.05,5.66,4.33,2.86,8.83,5.54,12.82,8.83,2.7,2.24,4.82,5.27,6.87,8.18,1.7,2.41.57,4.67-2.41,4.77-1.64.06-3.43-.75-4.96-1.53-7.91-4.01-15.75-8.14-23.62-12.22-.14-.07-.36.01-.73.03-.8,8.13-1.57,16.29-2.43,24.43-.91,8.64-1.87,17.27-2.88,25.9-.08.66-.53,1.51-1.07,1.84-1.83,1.1-3.78,2-5.89,3.07-3.43-12.43-6.76-24.5-10.23-37.12-1.95,3.12-3.67,5.89-5.4,8.65-1.15,1.84-2.44,3.62-3.42,5.54-2.88,5.65-7.71,6.82-14.28,5.64-1.01-.18-2-.59-2.94-1.01-6.18-2.78-7.63-7.45-4.31-13.37,2.49-4.44,4.85-8.95,7.24-13.44.39-.74.66-1.54.85-2Z" fill="currentColor"/>
          </svg>
        ) : (
          <svg width="48" height="48" viewBox="0 0 124.15 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.26,77.53l14.14-13.26L0,56.95l14.64-10.61-9.84-9.22,17.66-4.05c.97-4.42-4.98-6.76-3.77-11.1,2.36.64,6.98,2.62,9.27,1.57,3.08-1.41,2.91-10.52,4.1-13.58.32-.83.71-1.31,1.4-1.87l13.88,10.34c3.32-5.22,1.93-12.4,5.81-17.42,2.22,2.77,6.51,6.99,10.34,6.82s7.27-4.58,8.85-7.84l4.67,18.69c4.74-1.49,7.83-5.55,11.64-8.43.48-.36,3.4-2.55,3.76-2.17l2.28,17.68,13.63-5.56-6.06,16.16c1.89-.05,4.08.5,5.92.52,2.36.02,9.44-1.3,10.38,1.74,1.1,3.56-3.58,7.56-2.86,10.69.64,2.77,7.89,4.24,8.45,7.64-2.72,3.58-8.14,2.87-10.99,6.34l9.5,13.1c-1.02,1.54-2.83,2.06-4.6,2.15-2.28.12-5.89-1.07-7.08,1.76-1.87,4.44,3.21,11.31,4.17,15.66l-14.39-3.03c-.3,1.59-.61,2.75-.5,4.42.3,4.51,4.66,14.25-3.68,13.78-3.66-.21-9.32-3.62-12.83-1.49-2.39,1.45-.43,5.33-.67,7.67-.06.58-.62,2.21-1.17,2.38-.92.28-12.37-10.92-12.97-10.34l-6.57,14.65-5.43-18.69-12.48,14.54c-.91,1-1.82-.7-2.63-1.21-.6-2.5-.29-10.01-3.59-10.53-3.92-.62-10.77,3.46-13.43,2.32-.76-.33-1.2-1.45-1.3-2.23-.14-1.08-.23-2.86-.29-4.01-.2-4.4,1.6-10.21-4.89-9.45-2.49.29-4.08,2.27-6.17-.69-.1-.55,1.56-2.68,1.99-3.24,3.31-4.27,7.7-8.24,10.98-12.51.2-.25.49-.32.38-.76H1.26Z" fill="currentColor"/>
          </svg>
        )}
      </div>
      <div className="bg-[rgba(255,255,255,0.35)] backdrop-blur-sm rounded-3xl p-6 md:p-8 flex-1">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <div className="flex-1">
              <h3 className="font-playfair font-semibold text-2xl md:text-3xl text-[#421d13] leading-tight">
                {role}
              </h3>
              <p className="font-roboto-flex text-lg md:text-xl text-[#ad8a6c] mt-1">
                {company}
              </p>
            </div>
            <p className="font-roboto-flex font-light text-lg md:text-2xl text-[#421d13] md:text-right">
              {period}
            </p>
          </div>
          
          <p className="font-roboto-flex text-lg md:text-xl text-[#6b6763] leading-relaxed">
            {description}
          </p>
          
          <div className="font-roboto-flex font-light text-lg md:text-xl text-[#6b6763]">
            <p className="mb-2">Key Achievements</p>
            <ul className="list-disc space-y-1 ml-6">
              {achievements.map((achievement, index) => (
                <li key={index}>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navigationItems = [
    { name: 'About', id: 'about' },
    { name: 'Cases', id: 'cases' },
    { name: 'Leadership', id: 'leadership' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <ClientOnly>
      <div className="bg-[#e3dcd6] min-h-screen">
      {/* Photo positioned behind header */}
      <motion.div
        className="absolute top-0 right-0 w-[772px] h-[700px] z-0"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Image
          src={imgPhoto}
          alt="Natasha Buchler"
          width={772}
          height={700}
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[rgba(173,138,108,0.2)] backdrop-blur-sm border-b border-[#ad8a6c]/20">
        <div className="container mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon tipo="rosto" size="32" />
              <div className="w-px h-6 bg-[#ad8a6c]"></div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6 ml-6">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="font-raleway font-medium text-[#421d13] hover:text-[#ad8a6c] transition-colors"
                >
                  {item.name}
                </button>
              ))}
              </nav>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-[#421d13] block h-0.5 w-6 rounded-sm transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-[#421d13] block h-0.5 w-6 rounded-sm transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-[#421d13] block h-0.5 w-6 rounded-sm transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
              </div>
            </button>
            
            {/* Location and Time - Desktop Only */}
            <div className="hidden md:flex items-center gap-2 text-[#ad8a6c]">
              <span className="font-raleway text-sm md:text-base">São Paulo</span>
              <div className="w-6 h-6 relative opacity-30">
                <Image
                  src={imgCy}
                  alt="Location"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-raleway text-sm md:text-base">{currentTime}</span>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className="font-raleway font-medium text-[#421d13] hover:text-[#ad8a6c] transition-colors text-left"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[700px]">
        {/* Content container */}
        <div className="relative z-10 w-full">
          <motion.div
            className="absolute left-16 md:left-24 top-[110px] max-w-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl text-[#421d13] leading-[1.2]">
                Hey, I'm Natasha Buchler,
              </h1>

              <p className="font-roboto-flex font-light text-lg md:text-2xl text-[#6b6763] leading-relaxed">
                a Strategic Designer & Executive Leader with 7+ years leading design teams across B2B platforms, fintech, and global marketplaces. Building high-performing teams and scaling design frameworks that drive measurable business impact across 32 countries.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('cases')}
                  className="bg-[#421d13] text-[#e3dcd6] px-6 py-3 rounded-lg font-roboto font-medium hover:bg-[#421d13]/90 hover:transform hover:-translate-y-0.5 transition-all duration-300 shadow-md"
                >
                  View case studies
                </button>
                <button
                  onClick={() => scrollToSection('leadership')}
                  className="border border-[#421d13] text-[#421d13] px-6 py-3 rounded-lg font-roboto font-medium hover:bg-[#421d13] hover:text-[#e3dcd6] hover:transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  About my leadership
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
              {/* Repeat the content multiple times for seamless loop */}
              {Array.from({ length: 6 }).map((_, setIndex) => (
                <React.Fragment key={setIndex}>
                  <div className="highlight-item">
                    <span className="highlight-text">150% growth in experimentation</span>
                    <div className="highlight-icon">
                      <Image src={imgGif} alt="Animation" fill className="object-contain" unoptimized />
                    </div>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-text">100% manager satisfaction</span>
                    <div className="highlight-icon">
                      <Image src={imgGif} alt="Animation" fill className="object-contain" unoptimized />
                    </div>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-text">#1 promotion rate</span>
                    <div className="highlight-icon">
                      <Image src={imgGif} alt="Animation" fill className="object-contain" unoptimized />
                    </div>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-text">32 countries</span>
                    <div className="highlight-icon">
                      <Image src={imgGif} alt="Animation" fill className="object-contain" unoptimized />
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Case Studies Section */}
      <section id="cases" className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-12">
            <TitleSubTitle title="Case studies" />
            
            <div className="space-y-8 flex flex-col items-center">
              <CardCase
                side="Right"
                title="3TPM - Global Product Architecture"
                description="Led the design and implementation of a comprehensive product architecture framework across 32 countries, resulting in 150% growth in experimentation."
                image={imgPexelsEllyFairytale}
              />
              <CardCase
                side="Left"
                title="3TPM - Global Product Architecture"
                description="Led the design and implementation of a comprehensive product architecture framework across 32 countries, resulting in 150% growth in experimentation."
                image={imgPexelsEllyFairytale}
              />
              <CardCase
                side="Right"
                title="3TPM - Global Product Architecture"
                description="Led the design and implementation of a comprehensive product architecture framework across 32 countries, resulting in 150% growth in experimentation."
                image={imgPexelsEllyFairytale}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How I Lead Section */}
      <section id="leadership" className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-12 max-w-6xl mx-auto">
            <TitleSubTitle 
              title="How I lead" 
              subtitle="My approach to building design teams that deliver."
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <CardInsight
                title="Cross-functional influence"
                description="Building bridges between design, engineering, product and business teams to create aligned, high-impact solutions."
              />
              <CardInsight
                title="Balanced strategy"
                description="Combining user-centered design thinking with business objectives to deliver solutions that are both meaningful and measurable"
              />
              <CardInsight
                title="Inclusive leadership"
                description="Fostering diverse, inclusive environments where every voice is heard and every perspective adds value to the creative process."
              />
              <CardInsight
                title="Problem framing"
                description="Approaching complex challenges with systematic thinking, clear problem definition, and data-driven decision making."
              />
            </div>
            
            <motion.div
              className="text-center max-w-4xl mx-auto relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-6 left-[90%] md:top-1 md:left-[95%] w-[158px] h-[115px]">
                <Image
                  src={imgQuote}
                  alt="Quote"
                  fill
                  className="object-contain opacity-10"
                />
              </div>
              <blockquote className="font-playfair font-bold text-xl md:text-3xl text-[#6b6763] leading-relaxed">
                "Great design leadership isn't about having all the answers, it's about asking the right questions, creating the right environment, and empowering teams to discover solutions together."
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-12 max-w-6xl mx-auto">
            <TitleSubTitle title="About me" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full mx-auto">
                  <Image
                    src={imgPhoto2}
                    alt="About Natasha"
                    width={1332}
                    height={1334}
                    className="object-contain w-full h-auto"
                  />
                  {/* Tags */}
                  <div className="absolute top-14 left-4 bg-[#c95127] px-4 py-2 rounded-full">
                    <span className="font-roboto font-medium text-sm text-[#e3dcd6] uppercase tracking-wide">
                      global leader
                    </span>
                  </div>
                  <div className="absolute bottom-14 right-14 bg-[#d0bfb0] px-4 py-2 rounded-full">
                    <span className="font-roboto font-medium text-sm text-[#421d13] uppercase tracking-wide">
                      +15 years
                    </span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6 font-roboto-flex font-light text-lg md:text-xl text-[#6b6763] leading-relaxed">
                  <p>
                    With 15+ years in design and 7+ in leadership, I've scaled design impact across 32 countries, building distributed teams that deliver measurable business outcomes. I specialize in creating inclusive, high-performing design organizations that bridge user needs with business objectives.
                  </p>
                  <p>
                    My approach combines strategic thinking with hands-on leadership, developing frameworks and processes that enable teams to work effectively across cultures and time zones. This includes career frameworks, quality assurance processes, and experimentation methodologies that scale globally.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#421d13] text-[#e3dcd6] px-6 py-3 rounded-lg font-roboto font-medium hover:bg-[#421d13]/90 hover:transform hover:-translate-y-0.5 transition-all duration-300 shadow-md">
                    Download CV
                  </button>
                  <button className="border border-[#421d13] text-[#421d13] px-6 py-3 rounded-lg font-roboto font-medium hover:bg-[#421d13] hover:text-[#e3dcd6] hover:transform hover:-translate-y-0.5 transition-all duration-300">
                    Read my articles
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-12 max-w-6xl mx-auto">
            <TitleSubTitle 
              title="Experience" 
              subtitle="A journey of building design organizations, scaling impact, and leading teams across global markets."
            />
            
            <div className="space-y-12 flex flex-col items-start relative max-w-6xl mx-auto">
              {/* Linha timeline vertical de fundo cobrindo toda a altura */}
              <div className="absolute left-[22px] top-0 w-1 h-full -z-10">
                <Image
                  src={imgLineTimeline}
                  alt="Timeline"
                  width={4}
                  height={1354}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardExperience
                role="Service Design Consultant"
                company="Stealth AI Startup"
                period="June 2015 - Present"
                description="Defined UX vision and product narrative for AI solutions in a regulated sector, balancing innovation, governance, and user clarity."
                achievements={[
                  "Built scalable service design systems",
                  "Facilitated stakeholder alignment",
                  "Ensured product consistency and replicability"
                ]}
                iconType="ponto"
                iconIndex={0}
              />
              
              <CardExperience
                role="Global Product Design Manager"
                company="AB InBev"
                period="May 2022 - Sep 2025"
                description="Own the strategic UX for BEES, a global B2B commerce platform operating in 30+ countries."
                achievements={[
                  "Lead core product journey teams",
                  "Manage distributed design team",
                  "Co-created global design career framework"
                ]}
                iconType="cy"
                iconIndex={1}
              />
              
              <CardExperience
                role="Design Coordinator"
                company="Vindi"
                period="Aug 2020 – June 2021"
                description="Managed DesignOps, Product Designers, and UX Research for fintech platform."
                achievements={[
                  "Created design career path",
                  "Expanded team delivery capacity",
                  "Promoted metric-driven design"
                ]}
                iconType="ponto"
                iconIndex={2}
              />
              
              <CardExperience
                role="Payment Strategy & UX Lead"
                company="Zup Innovation"
                period="Mar 2019 – Jul 2020"
                description="Led UX strategy for telecom and finance products, directing redesigns and unified visions."
                achievements={[
                  "Redesigned Safra Bank app",
                  "Defined Claro & Nextel payment solution",
                  "Conducted discovery and research workshops"
                ]}
                iconType="cy"
                iconIndex={3}
              />
              
              <CardExperience
                role="UX Lead"
                company="NTT Data"
                period="Oct 2018 – Mar 2019"
                description="Led UX/UI teams on financial services products, delivering comprehensive design solutions."
                achievements={[
                  "Delivered personas and wireframes",
                  "Created prototypes and flows",
                  "Facilitated stakeholder workshops"
                ]}
                iconType="ponto"
                iconIndex={4}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#421d13] text-[#e3dcd6] px-6 py-3 rounded-lg font-roboto font-medium hover:bg-[#421d13]/90 hover:transform hover:-translate-y-0.5 transition-all duration-300 shadow-md">
                Download CV
              </button>
              <button className="border border-[#421d13] text-[#421d13] px-6 py-3 rounded-lg font-roboto font-medium hover:bg-[#421d13] hover:text-[#e3dcd6] hover:transform hover:-translate-y-0.5 transition-all duration-300">
                Read my articles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-12 max-w-4xl mx-auto text-center">
            <TitleSubTitle title="Get in touch" />
            
            <motion.div 
              className="flex justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {['Linkedin', 'Medium', 'Email', 'CV'].map((platform) => (
                <Icon 
                  key={platform} 
                  tipo={platform as any} 
                  size="48" 
                  className="cursor-pointer hover:scale-110 transition-transform" 
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#ad8a6c]/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center space-y-6">
            <div className="w-full h-px bg-[#ad8a6c]/20" />
            <div className="font-roboto-flex font-light text-lg md:text-xl text-[#6b6763] space-y-4">
              <p>Built on Cursor, with Next.js, Tailwind CSS & Framer Motion</p>
              <p>© 2025 Natasha Buchler. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </ClientOnly>
  );
}