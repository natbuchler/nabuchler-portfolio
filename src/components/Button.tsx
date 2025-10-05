'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { colors, getTypographyStyle } from '@/lib/design-tokens';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  const baseClasses = `
    px-6 py-3 rounded-lg font-medium transition-all duration-200
    font-roboto text-lg font-medium leading-6
    focus:outline-none focus-visible:outline-none
  `;

  const primaryStyle = {
    backgroundColor: disabled ? '#adadb5' : colors.brown,
    color: disabled ? '#c7c7c9' : colors.background,
    border: 'none',
    boxShadow: disabled ? 'none' : undefined,
  };

  const secondaryStyle = {
    backgroundColor: 'transparent',
    color: disabled ? '#c7c7c9' : colors.brown,
    border: `2px solid ${disabled ? '#adadb5' : colors.brown}`,
  };

  const tertiaryStyle = {
    backgroundColor: 'transparent',
    color: disabled ? '#c7c7c9' : colors.brown,
    border: 'none',
  };

  const buttonStyle = variant === 'primary' ? primaryStyle : variant === 'secondary' ? secondaryStyle : tertiaryStyle;

  const variantClasses = {
    primary: `
      hover:shadow-lg
      disabled:cursor-not-allowed
    `,
    secondary: `
      hover:opacity-80
      disabled:cursor-not-allowed disabled:opacity-50
    `,
    tertiary: `
      hover:opacity-80
      disabled:cursor-not-allowed disabled:opacity-50
    `,
  }[variant] || '';

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`.trim();

  return (
    <button
      className={combinedClasses}
      disabled={disabled}
      style={buttonStyle}
      onMouseEnter={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.backgroundColor = colors.beige;
          e.currentTarget.style.color = colors.brown;
          e.currentTarget.style.boxShadow = '0 4px 4px rgba(0,0,0,0.2)';
        } else if (!disabled && variant === 'secondary') {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = colors.beige;
          e.currentTarget.style.borderColor = colors.beige;
          e.currentTarget.style.boxShadow = '0px 4px 4px rgba(0,0,0,0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.backgroundColor = colors.brown;
          e.currentTarget.style.color = colors.background;
          e.currentTarget.style.boxShadow = '';
        } else if (!disabled && variant === 'secondary') {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = colors.brown;
          e.currentTarget.style.borderColor = colors.brown;
          e.currentTarget.style.boxShadow = '';
        }
      }}
      onFocus={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.backgroundColor = colors.card;
          e.currentTarget.style.color = colors.brown;
          e.currentTarget.style.boxShadow = 'inset 0 4px 4px rgba(0,0,0,0.2)';
        } else if (!disabled && variant === 'secondary') {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = colors.card;
          e.currentTarget.style.borderColor = colors.card;
        }
      }}
      onBlur={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.backgroundColor = colors.brown;
          e.currentTarget.style.color = colors.background;
          e.currentTarget.style.boxShadow = '';
        } else if (!disabled && variant === 'secondary') {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = colors.brown;
          e.currentTarget.style.borderColor = colors.brown;
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}

// Componente para grupo de botões EXATAMENTE como no Figma
interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
}

export function ButtonGroup({ children, className = '' }: ButtonGroupProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center lg:justify-start relative w-full ${className}`}>
      {children}
    </div>
  );
}

// Exemplo de uso com os estados usando design tokens do Figma
export function ButtonShowcase() {
  return (
    <div className="space-y-8 p-8 bg-[#e3dcd6]">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#421d13]">Primary Button States (Design Tokens)</h3>
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <Button variant="primary">Default</Button>
            <span className="text-xs text-[#6b6763]">bg: brown, text: background</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="primary"
              className="!bg-[#ad8a6c] !text-[#421d13] shadow-[0_4px_4px_rgba(0,0,0,0.2)]]"
            >
              Hover
            </Button>
            <span className="text-xs text-[#6b6763]">bg: beige, text: brown</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="primary"
              className="!bg-[#ad8a6c33] !text-[#421d13] shadow-[inset_0_4px_4px_rgba(0,0,0,0.2)]"
            >
              Focused
            </Button>
            <span className="text-xs text-[#6b6763]">bg: card, text: brown</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button variant="primary" disabled>Disabled</Button>
            <span className="text-xs text-[#6b6763]">#575760, #717172</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#421d13]">Secondary Button States (Design Tokens)</h3>
        <div className="flex gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <Button variant="secondary">Default</Button>
            <span className="text-xs text-[#6b6763]">bg: transparent, text: brown</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="secondary"
              className="!bg-[#ad8a6c] !text-[#ad8a6c] !border-[#ad8a6c]"
            >
              Hover
            </Button>
            <span className="text-xs text-[#6b6763]">bg & text: beige</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button
              variant="secondary"
              className="!bg-[#ad8a6c33] !text-[#ad8a6c33] !border-[#ad8a6c33]"
            >
              Focused
            </Button>
            <span className="text-xs text-[#6b6763]">bg & text: card</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button variant="secondary" disabled>Disabled</Button>
            <span className="text-xs text-[#6b6763]">same as default</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#421d13]">Button Group (Figma Layout)</h3>
        <ButtonGroup>
          <Button variant="primary">View case studies</Button>
          <Button variant="secondary">About my leadership</Button>
        </ButtonGroup>
      </div>

      <div className="mt-8 p-4 bg-white rounded-lg">
        <h4 className="font-semibold text-[#421d13] mb-2">Design Tokens Used:</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="font-mono bg-brown text-background px-2 py-1 rounded">brown</span> {colors.brown}</div>
          <div><span className="font-mono bg-beige text-brown px-2 py-1 rounded">beige</span> {colors.beige}</div>
          <div><span className="font-mono bg-background text-brown px-2 py-1 rounded">background</span> {colors.background}</div>
          <div><span className="font-mono bg-card text-brown px-2 py-1 rounded">card</span> {colors.card}</div>
        </div>
      </div>
    </div>
  );
}