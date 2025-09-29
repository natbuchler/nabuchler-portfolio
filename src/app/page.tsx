'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ClientOnly from '@/components/ClientOnly';
import Timeline, { TimelineItem } from '@/components/Timeline';
import FigmaComponent from '@/components/figma-component';
import FigmaMCPComponent from '@/components/FigmaMCPComponent';
import FigmaMCPDemo from '@/components/FigmaMCPDemo';
import InsightCard from '@/components/InsightCard';
import Button, { ButtonGroup } from '@/components/Button';

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
const imgLinkedin = "/Linkedin.svg";
const imgMedium = "/Medium.svg";
const imgEmail = "/Email.svg";
const imgCV = "/CV.svg";
const imgPuzzle = "/puzzle.svg";
const imgLamp = "/lamp.svg";
const imgMedal = "/medal.svg";
const imgStrategy = "/strategy.svg";

interface IconProps {
  tipo?: "cy" | "ponto" | "rosto" | "Medium" | "Email" | "CV" | "Linkedin" | "puzzle" | "lamp" | "medal" | "strategy";
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
    Linkedin: imgLinkedin,
    Medium: imgMedium,
    Email: imgEmail,
    CV: imgCV,
    puzzle: imgPuzzle,
    lamp: imgLamp,
    medal: imgMedal,
    strategy: imgStrategy,
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

  // Social icons com SVG inline
  if (tipo === "Linkedin") {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M44.142 0H3.858C1.728 0 0 1.728 0 3.858V44.142C0 46.272 1.728 48 3.858 48H44.142C46.272 48 48 46.272 48 44.142V3.858C48 1.728 46.272 0 44.142 0ZM44.142 44.16C17.274 44.154 3.84 44.148 3.84 44.142C3.846 17.274 3.852 3.84 3.858 3.84C30.726 3.846 44.16 3.852 44.16 3.858C44.154 30.726 44.148 44.16 44.142 44.16ZM7.116 17.994H14.238V40.902H7.116V17.994ZM10.68 14.862C12.954 14.862 14.808 13.014 14.808 10.734C14.808 10.1919 14.7012 9.65511 14.4938 9.15428C14.2863 8.65345 13.9823 8.19838 13.5989 7.81506C13.2156 7.43174 12.7605 7.12768 12.2597 6.92022C11.7589 6.71277 11.2221 6.606 10.68 6.606C10.1379 6.606 9.60112 6.71277 9.10028 6.92022C8.59945 7.12768 8.14438 7.43174 7.76106 7.81506C7.37774 8.19838 7.07368 8.65345 6.86623 9.15428C6.65877 9.65511 6.552 10.1919 6.552 10.734C6.546 13.014 8.394 14.862 10.68 14.862ZM25.818 29.568C25.818 26.58 26.388 23.688 30.09 23.688C33.738 23.688 33.792 27.102 33.792 29.76V40.902H40.908V28.338C40.908 22.17 39.576 17.424 32.37 17.424C28.908 17.424 26.586 19.326 25.632 21.126H25.536V17.994H18.702V40.902H25.818V29.568Z" fill="#c95127"/>
        </svg>
      </div>
    );
  }

  if (tipo === "Medium") {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.42133 2.66667H39.5787C42.7573 2.66667 45.3333 5.24267 45.3333 8.42133V17.6347C43.7116 18.0579 42.2714 18.9966 41.2293 20.3093C39.9707 21.872 39.208 23.9813 39.0213 26.352C38.9822 26.8249 38.9671 27.2978 38.976 27.7707C39.0853 32.472 41.3227 36.3467 45.3333 37.2373V39.5787C45.3319 41.1045 44.7252 42.5674 43.6463 43.6463C42.5674 44.7252 41.1045 45.3319 39.5787 45.3333H8.42133C6.89553 45.3319 5.43263 44.7252 4.35373 43.6463C3.27483 42.5674 2.66808 41.1045 2.66667 39.5787V8.42133C2.66667 5.24267 5.24267 2.66667 8.42133 2.66667ZM48 8.42133C47.9986 6.18829 47.1109 4.04711 45.5319 2.46811C43.9529 0.889112 41.8117 0.00141287 39.5787 0H8.42133C6.18829 0.00141287 4.04711 0.889112 2.46811 2.46811C0.889112 4.04711 0.00141287 6.18829 0 8.42133V39.5787C0.00141287 41.8117 0.889112 43.9529 2.46811 45.5319C4.04711 47.1109 6.18829 47.9986 8.42133 48H39.5787C41.8117 47.9986 43.9529 47.1109 45.5319 45.5319C47.1109 43.9529 47.9986 41.8117 48 39.5787V8.42133ZM45.3333 19.4613V24.7493H43.6907C43.7947 22.4373 44.3653 20.536 45.3333 19.4613ZM45.3333 25.7653V31.2667C44.1573 29.8987 43.4693 27.9333 43.592 25.7653H45.3333ZM39.192 11.4667L39.232 11.4587V11.1653H31.4987L24.3253 28.0347L17.1467 11.1653H8.816V11.4587L8.85333 11.4667C10.264 11.7867 10.9813 12.2613 10.9813 13.9733V34.0267C10.9813 35.7387 10.2613 36.2133 8.848 36.5333L8.81333 36.5387V36.832H14.4667V36.5387L14.4267 36.5333C13.016 36.2133 12.2987 35.7387 12.2987 34.0267V15.136L21.52 36.8347H22.0427L31.5333 14.5307V34.52C31.4107 35.8747 30.7013 36.2933 29.424 36.5813L29.3867 36.5893V36.88H39.232V36.5867L39.192 36.5813C37.912 36.2933 37.1867 35.8747 37.0667 34.52L37.0587 13.9733H37.0667C37.0667 12.2613 37.784 11.7867 39.192 11.4667Z" fill="#c95127"/>
        </svg>
      </div>
    );
  }

  if (tipo === "Email") {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        <svg width="48" height="48" viewBox="0 0 105.37 134" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.33,17.63C14.12,10.52,22.16,1.44,26.59.34c2.5-.62,9.77-.2,12.79-.17,17.82.16,36.63.89,54.35,2.12,4.45.31,5.58-.06,5.81,4.66.59,12.2-.03,25.08.26,37.41.49,20.68,1.63,41.35,3.31,61.95l2.27,21.8-.03.32c-.78,1.03-.64,1.62-2.07,1.95-4.48,1.05-10.98.09-15.67.97-13.14,2.44-45.43.53-74.5,2.64-3.78.27-4.86-4.45-5.15-5.49-.48-1.68-9.27-50.79-7.78-62.04,2.08-15.74,9.76-45.26,11.17-48.83ZM94.31,7.56l-61.42-2.22c3.44,4,7.66,7.47,12.26,10.08,1.79,1.02,5.62,2.09,6.34,3.91,1.1,2.78-2.56,3.42-4.24,4.41-16.84,9.89-31.91,27.91-41.52,44.72,1.34,20.28,5.55,40.22,6.9,60.5l87.18-3.34c-4.06-39.2-5.36-78.63-5.5-118.07ZM43.39,19.94c-6.5-3.25-12.03-8.26-16.55-13.9-5.49,4.3-8.76,11.07-11.23,17.48-3.88,10.11-6.12,20.99-7.99,31.64l7.44-9.38c8.36-9.73,17.62-18.74,28.32-25.84Z" fill="#c95127"/>
        </svg>
      </div>
    );
  }

  if (tipo === "CV") {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        <svg width="48" height="48" viewBox="0 0 105.37 134" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.33,17.63C14.12,10.52,22.16,1.44,26.59.34c2.5-.62,9.77-.2,12.79-.17,17.82.16,36.63.89,54.35,2.12,4.45.31,5.58-.06,5.81,4.66.59,12.2-.03,25.08.26,37.41.49,20.68,1.63,41.35,3.31,61.95l2.27,21.8-.03.32c-.78,1.03-.64,1.62-2.07,1.95-4.48,1.05-10.98.09-15.67.97-13.14,2.44-45.43.53-74.5,2.64-3.78.27-4.86-4.45-5.15-5.49-.48-1.68-9.27-50.79-7.78-62.04,2.08-15.74,9.76-45.26,11.17-48.83ZM94.31,7.56l-61.42-2.22c3.44,4,7.66,7.47,12.26,10.08,1.79,1.02,5.62,2.09,6.34,3.91,1.1,2.78-2.56,3.42-4.24,4.41-16.84,9.89-31.91,27.91-41.52,44.72,1.34,20.28,5.55,40.22,6.9,60.5l87.18-3.34c-4.06-39.2-5.36-78.63-5.5-118.07ZM43.39,19.94c-6.5-3.25-12.03-8.26-16.55-13.9-5.49,4.3-8.76,11.07-11.23,17.48-3.88,10.11-6.12,20.99-7.99,31.64l7.44-9.38c8.36-9.73,17.62-18.74,28.32-25.84Z" fill="#c95127"/>
        </svg>
      </div>
    );
  }

  // Fallback para outros ícones
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
          <Button
            variant="secondary"
            className="w-fit mt-10"
          >
            Dive Deeper
          </Button>
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

function CardInsight({ title, description, icon = "cy" }: { title: string; description: string; icon?: string }) {
  return (
    <motion.div
      className="bg-[rgba(255,255,255,0.35)] backdrop-blur-sm rounded-2xl p-6 flex-1 min-w-[250px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="space-y-4">
        <Icon tipo={icon as any} size="48" />
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
  achievements
}: {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}) {
  return (
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
  );
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showFigmaPanel, setShowFigmaPanel] = useState(false);
  const [showMCPPanel, setShowMCPPanel] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [emailCopied, setEmailCopied] = useState(false);

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

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Account for sticky header
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });

      setMobileMenuOpen(false);
      setActiveSection(sectionId);
    }
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('nabuchler@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 3000); // Hide notification after 3 seconds
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
                  className={`font-raleway font-medium transition-all duration-200 relative ${
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
                    className={`font-raleway font-medium transition-all duration-200 text-left relative ${
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
              </div>
            </motion.nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-[700px]">
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

              <ButtonGroup>
                <Button
                  variant="primary"
                  onClick={() => scrollToSection('cases')}
                  className="hover:transform hover:-translate-y-0.5 shadow-md"
                >
                  View case studies
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => scrollToSection('leadership')}
                  className="hover:transform hover:-translate-y-0.5"
                >
                  About my leadership
                </Button>
              </ButtonGroup>
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
                icon="medal"
                title="Cross-functional influence"
                description="Building bridges between design, engineering, product and business teams to create aligned, high-impact solutions."
              />
              <CardInsight
                icon="strategy"
                title="Balanced strategy"
                description="Combining user-centered design thinking with business objectives to deliver solutions that are both meaningful and measurable"
              />
              <CardInsight
                icon="lamp"
                title="Inclusive leadership"
                description="Fostering diverse, inclusive environments where every voice is heard and every perspective adds value to the creative process."
              />
              <CardInsight
                icon="puzzle"
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
                
                <ButtonGroup>
                  <Button
                    variant="primary"
                    className="hover:transform hover:-translate-y-0.5 shadow-md"
                    onClick={() => window.open('https://drive.google.com/file/d/1pgFkxrCPIAbWeVNLXP76RQqghEkD0VxU/view?usp=sharing', '_blank')}
                  >
                    Download CV
                  </Button>
                  <Button
                    variant="secondary"
                    className="hover:transform hover:-translate-y-0.5"
                    onClick={() => window.open('https://medium.com/@nabuchler', '_blank')}
                  >
                    Read my articles
                  </Button>
                </ButtonGroup>
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
            
            <Timeline lineImage={imgLineTimeline}>
              <TimelineItem icon="ponto" iconColor="#421d13" index={0}>
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
                />
              </TimelineItem>

              <TimelineItem icon="cy" iconColor="#c95127" index={1}>
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
                />
              </TimelineItem>

              <TimelineItem icon="ponto" iconColor="#421d13" index={2}>
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
                />
              </TimelineItem>

              <TimelineItem icon="cy" iconColor="#c95127" index={3}>
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
                />
              </TimelineItem>
            </Timeline>
            
            <div className="flex justify-center">
              <ButtonGroup>
                <Button
                  variant="primary"
                  className="hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#421d13] focus:ring-opacity-50"
                  onClick={() => window.open('https://drive.google.com/file/d/1pgFkxrCPIAbWeVNLXP76RQqghEkD0VxU/view?usp=sharing', '_blank')}
                >
                  Download CV
                </Button>
                <Button
                  variant="secondary"
                  className="hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#421d13] focus:ring-opacity-50"
                  onClick={() => window.open('https://medium.com/@nabuchler', '_blank')}
                >
                  Read my articles
                </Button>
              </ButtonGroup>
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
              {[
                { name: 'Linkedin', url: 'https://www.linkedin.com/in/nbuchler/' },
                { name: 'Medium', url: 'https://medium.com/@nabuchler' },
                { name: 'Email' },
                { name: 'CV', url: 'https://drive.google.com/file/d/1pgFkxrCPIAbWeVNLXP76RQqghEkD0VxU/view?usp=sharing' }
              ].map((platform) => (
                <div
                  key={platform.name}
                  className="cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    color: '#c95127',
                    fill: '#c95127',
                    filter: 'none'
                  }}
                  onClick={() => platform.name === 'Email' ? copyEmailToClipboard() : window.open(platform.url, '_blank')}
                >
                  <Icon
                    tipo={platform.name as any}
                    size="48"
                    className="force-orange-color"
                  />
                </div>
              ))}
            </motion.div>

            {/* Email Copied Notification */}
            {emailCopied && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[#421d13] text-[#e3dcd6] px-6 py-3 rounded-lg shadow-lg z-50"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#ad8a6c]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-roboto-flex font-medium">
                    Email copied! (nabuchler@gmail.com)
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Figma MCP Component Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-[#e3dcd6] to-[#d0bfb0]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-8">
            <TitleSubTitle title="Figma MCP Integration" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg"
            >
              <FigmaMCPComponent />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Figma MCP Demo Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-8">
            <TitleSubTitle title="Figma MCP Demo" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg"
            >
              <FigmaMCPDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insight Card from Figma Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-8">
            <TitleSubTitle title="Insight Card do Figma" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <InsightCard nodeId="insight-card" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Button Examples Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-8">
            <TitleSubTitle title="Button States Examples" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="space-y-8">
                {/* Primary Buttons */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#421d13]">Primary Buttons - All States</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <Button variant="primary">Default</Button>
                      <span className="text-xs text-[#6b6763]">Default State</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        variant="primary"
                        style={{
                          backgroundColor: '#ad8a6c',
                          color: '#421d13',
                          boxShadow: '0 4px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        Hover
                      </Button>
                      <span className="text-xs text-[#6b6763]">Hover State</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        variant="primary"
                        style={{
                          backgroundColor: '#ad8a6c33',
                          color: '#421d13',
                          boxShadow: 'inset 0 4px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        Focus
                      </Button>
                      <span className="text-xs text-[#6b6763]">Focus State</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Button variant="primary" disabled>Disabled</Button>
                      <span className="text-xs text-[#6b6763]">Disabled State</span>
                    </div>
                  </div>
                </div>

                {/* Secondary Buttons */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#421d13]">Secondary Buttons - All States</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <Button variant="secondary">Default</Button>
                      <span className="text-xs text-[#6b6763]">Default State</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        variant="secondary"
                        style={{
                          backgroundColor: 'transparent',
                          color: '#ad8a6c',
                          border: '2px solid #ad8a6c',
                          boxShadow: '0px 4px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        Hover
                      </Button>
                      <span className="text-xs text-[#6b6763]">Hover State</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        variant="secondary"
                        style={{
                          backgroundColor: 'transparent',
                          color: '#ad8a6c33',
                          border: '2px solid #ad8a6c33'
                        }}
                      >
                        Focus
                      </Button>
                      <span className="text-xs text-[#6b6763]">Focus State</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Button variant="secondary" disabled>Disabled</Button>
                      <span className="text-xs text-[#6b6763]">Disabled State</span>
                    </div>
                  </div>
                </div>

                {/* Usage Examples */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#421d13]">Usage Examples</h3>
                  <div className="space-y-3">
                    <ButtonGroup>
                      <Button variant="primary">Save Changes</Button>
                      <Button variant="secondary">Cancel</Button>
                    </ButtonGroup>

                    <ButtonGroup>
                      <Button
                        variant="primary"
                        onClick={() => window.open('https://drive.google.com/file/d/1pgFkxrCPIAbWeVNLXP76RQqghEkD0VxU/view?usp=sharing', '_blank')}
                      >
                        Download CV
                      </Button>
                      <Button variant="secondary">View Portfolio</Button>
                    </ButtonGroup>

                    <ButtonGroup>
                      <Button variant="primary" disabled>Processing...</Button>
                      <Button variant="secondary" disabled>Unavailable</Button>
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Figma Panel */}
      {showFigmaPanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">Figma Integration (API)</h3>
              <button
                onClick={() => setShowFigmaPanel(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <FigmaComponent />
            </div>
          </div>
        </div>
      )}

      {/* MCP Panel */}
      {showMCPPanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">Figma MCP Integration</h3>
              <button
                onClick={() => setShowMCPPanel(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <FigmaMCPComponent />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-[#ad8a6c]/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center space-y-6">
            <div className="font-roboto-flex font-light text-lg md:text-xl text-[#6b6763] space-y-4">
              <p>Built on Cursor, with Next.js, Tailwind CSS & Framer Motion</p>
              <p>© 2025 Natasha Buchler. All rights reserved.</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowFigmaPanel(true)}
                  className="text-xs text-[#ad8a6c] hover:text-[#421d13] transition-colors"
                >
                  Figma API
                </button>
                <button
                  onClick={() => setShowMCPPanel(true)}
                  className="text-xs text-[#c95127] hover:text-[#421d13] transition-colors font-semibold"
                >
                  Figma MCP ✨
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </ClientOnly>
  );
}