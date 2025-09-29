import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nodeId, clientLanguages, clientFrameworks, forceCode } = body;

    // Simulação da chamada MCP real para gerar código
    const mockCode = {
      html: `<div className="hero-section">
  <div className="content">
    <h1 className="title">Hey, I'm Natasha Buchler,</h1>
    <p className="description">
      a Strategic Designer & Executive Leader with 7+ years leading design teams 
      across B2B platforms, fintech, and global marketplaces.
    </p>
    <div className="buttons">
      <button className="primary-button">View case studies</button>
      <button className="secondary-button">About my leadership</button>
    </div>
  </div>
  <div className="photo">
    <img src="/photo.png" alt="Natasha Buchler" />
  </div>
</div>`,
      
      css: `.hero-section {
  display: flex;
  width: 1440px;
  height: 628px;
  background-color: #e3dcd6;
  position: relative;
}

.content {
  position: absolute;
  left: 120px;
  top: 110px;
  width: 628px;
  z-index: 10;
}

.title {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 3.75rem;
  line-height: 1.2;
  color: #421d13;
  margin-bottom: 2rem;
}

.description {
  font-family: 'Roboto Flex', sans-serif;
  font-weight: 300;
  font-size: 1.5rem;
  line-height: 1.6;
  color: #6b6763;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  gap: 1rem;
}

.primary-button {
  background-color: #421d13;
  color: #e3dcd6;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-button {
  border: 1px solid #421d13;
  color: #421d13;
  background: transparent;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.photo {
  position: absolute;
  right: 0;
  top: 0;
  width: 692px;
  height: 628px;
}`,

      react: `import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  photoSrc?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function HeroSection({
  title = "Hey, I'm Natasha Buchler,",
  description = "a Strategic Designer & Executive Leader with 7+ years leading design teams across B2B platforms, fintech, and global marketplaces.",
  primaryButtonText = "View case studies",
  secondaryButtonText = "About my leadership",
  photoSrc = "/photo.png",
  onPrimaryClick,
  onSecondaryClick
}: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="content">
        <h1 className="title">{title}</h1>
        <p className="description">{description}</p>
        <div className="buttons">
          <button 
            className="primary-button"
            onClick={onPrimaryClick}
          >
            {primaryButtonText}
          </button>
          <button 
            className="secondary-button"
            onClick={onSecondaryClick}
          >
            {secondaryButtonText}
          </button>
        </div>
      </div>
      <div className="photo">
        <Image
          src={photoSrc}
          alt="Profile"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}`,
      
      nodeId: nodeId || 'current-selection',
      framework: clientFrameworks,
      language: clientLanguages,
      timestamp: new Date().toISOString(),
      source: 'figma-mcp-code-generation'
    };

    return NextResponse.json(mockCode);

  } catch (error) {
    console.error('Erro na API MCP code:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar código do Figma' },
      { status: 500 }
    );
  }
}
