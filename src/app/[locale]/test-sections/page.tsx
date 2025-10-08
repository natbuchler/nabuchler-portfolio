'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ClientOnly from '@/components/ClientOnly';

export default function TestSections() {
  const [activeOption, setActiveOption] = useState(1);

  const sections = [
    { id: 'hero', title: 'Hero Section', color: '#e3dcd6' },
    { id: 'cases', title: 'Case Studies', color: '#d0bfb0' },
    { id: 'lead', title: 'How I Lead', color: '#ad8a6c' },
    { id: 'about', title: 'About Me', color: '#421d13' },
    { id: 'experience', title: 'Experience', color: '#c95127' },
  ];

  return (
    <ClientOnly>
    <div className="min-h-screen bg-[#e3dcd6]">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#ad8a6c]/20 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-playfair text-2xl text-[#421d13] mb-4">
            Teste de Setorização - Escolha uma opção
          </h1>
          <div className="flex gap-4 flex-wrap">
            {[1, 2, 3, 4].map((option) => (
              <button
                key={option}
                onClick={() => setActiveOption(option)}
                className={`px-6 py-3 rounded-lg font-raleway font-medium transition-all duration-200 ${
                  activeOption === option
                    ? 'bg-[#421d13] text-white'
                    : 'bg-[#d0bfb0] text-[#421d13] hover:bg-[#ad8a6c] hover:text-white'
                }`}
              >
                Opção {option}
              </button>
            ))}
          </div>
          <p className="mt-3 font-roboto-flex text-sm text-[#6b6763]">
            {activeOption === 1 && '✨ Bordas Sutis com Gradiente'}
            {activeOption === 2 && '🌬️ Espaçamento Respirável + Sombras Suaves'}
            {activeOption === 3 && '🎬 Animações de Entrada Distintas (Recomendada)'}
            {activeOption === 4 && '🎨 Background com Textura Sutil'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="pt-32">
        {/* OPÇÃO 1: Bordas Sutis com Gradiente */}
        {activeOption === 1 && (
          <div>
            {sections.map((section, index) => (
              <section
                key={section.id}
                className={`py-20 ${
                  index > 0 ? 'border-t border-[#ad8a6c]/10' : ''
                }`}
              >
                <div className="container mx-auto px-4 md:px-8">
                  <div className="max-w-6xl mx-auto">
                    <h2 className="font-playfair text-4xl md:text-5xl text-[#421d13] mb-4">
                      {section.title}
                    </h2>
                    <div className="h-64 rounded-3xl bg-[#d0bfb0] flex items-center justify-center">
                      <p className="font-roboto-flex text-[#421d13]">
                        Conteúdo da seção aqui
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}

        {/* OPÇÃO 2: Espaçamento Respirável + Sombras Suaves */}
        {activeOption === 2 && (
          <div>
            {sections.map((section, index) => (
              <section
                key={section.id}
                className={`py-24 ${
                  index > 0 ? 'shadow-[inset_0_8px_16px_-8px_rgba(66,29,19,0.03)]' : ''
                }`}
              >
                <div className="container mx-auto px-4 md:px-8">
                  <div className="max-w-6xl mx-auto">
                    <h2 className="font-playfair text-4xl md:text-5xl text-[#421d13] mb-4">
                      {section.title}
                    </h2>
                    <div className="h-64 rounded-3xl bg-[#d0bfb0] flex items-center justify-center">
                      <p className="font-roboto-flex text-[#421d13]">
                        Conteúdo da seção aqui
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}

        {/* OPÇÃO 3: Animações de Entrada Distintas */}
        {activeOption === 3 && (
          <div>
            {sections.map((section, index) => {
              // Diferentes animações para cada seção
              const animations = [
                { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
                { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } },
                { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
                { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
                { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
              ];

              return (
                <motion.section
                  key={section.id}
                  className="py-20"
                  initial={animations[index].initial}
                  whileInView={animations[index].animate}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-6xl mx-auto">
                      <h2 className="font-playfair text-4xl md:text-5xl text-[#421d13] mb-4">
                        {section.title}
                      </h2>
                      <div className="h-64 rounded-3xl bg-[#d0bfb0] flex items-center justify-center">
                        <p className="font-roboto-flex text-[#421d13]">
                          Conteúdo da seção aqui
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.section>
              );
            })}
          </div>
        )}

        {/* OPÇÃO 4: Background com Textura Sutil */}
        {activeOption === 4 && (
          <div>
            {sections.map((section, index) => (
              <section
                key={section.id}
                className={`py-20 ${
                  index % 2 === 1
                    ? 'bg-gradient-to-b from-transparent via-[#d9ccc1]/5 to-transparent'
                    : ''
                }`}
              >
                <div className="container mx-auto px-4 md:px-8">
                  <div className="max-w-6xl mx-auto">
                    <h2 className="font-playfair text-4xl md:text-5xl text-[#421d13] mb-4">
                      {section.title}
                    </h2>
                    <div className="h-64 rounded-3xl bg-[#d0bfb0] flex items-center justify-center">
                      <p className="font-roboto-flex text-[#421d13]">
                        Conteúdo da seção aqui
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
    </ClientOnly>
  );
}
