# Status da Implementação i18n

**Branch**: `feature/i18n-implementation`
**Status**: ⚠️ **EM PROGRESSO - NÃO FAZER MERGE**

## ✅ O que está pronto (Commit 60db94a)

1. **Arquivos de tradução**
   - `src/locales/pt.json` - Traduções em português
   - `src/locales/en.json` - Traduções em inglês

2. **Helper i18n**
   - `src/lib/i18n.ts` - Funções type-safe para traduções
   - Funções: `getTranslations()`, `t()`, `isValidLocale()`, etc.

3. **Middleware**
   - `middleware.ts` - Redirect automático baseado em locale

4. **LanguageSwitcher**
   - `src/components/LanguageSwitcher.tsx` - Seletor de idioma com bandeiras

5. **Estrutura de rotas movida**
   - `src/app/page.tsx` → `src/app/[locale]/page.tsx`
   - `src/app/layout.tsx` → `src/app/[locale]/layout.tsx`
   - `src/app/cases/` → `src/app/[locale]/cases/`

## ⚠️ O que PRECISA ser feito

### 1. Atualizar `layout.tsx` para receber parâmetro locale

```tsx
// src/app/[locale]/layout.tsx
export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  // ...
}
```

### 2. Atualizar `page.tsx` para usar traduções

```tsx
// src/app/[locale]/page.tsx
import { getTranslations, Locale } from '@/lib/i18n';

export default function Portfolio({ params }: { params: { locale: Locale } }) {
  const t = getTranslations(params.locale);

  // Usar t.nav.about, t.hero.greeting, etc.
}
```

### 3. Adicionar LanguageSwitcher ao Header

```tsx
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

// No header, próximo ao relógio:
<LanguageSwitcher currentLocale={params.locale} />
```

### 4. Atualizar navegação interna

Todos os links internos precisam incluir o locale:

```tsx
// ANTES:
<Link href="/cases/3tpm">

// DEPOIS:
<Link href={`/${params.locale}/cases/3tpm`}>
```

### 5. Atualizar Hero component

```tsx
// src/components/sections/Hero.tsx
interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  locale: Locale; // ADICIONAR
}

export default function Hero({ onScrollToSection, locale }: HeroProps) {
  const t = getTranslations(locale);

  return (
    // ...
    <h1>{t.hero.greeting}</h1>
    <p>{t.hero.description}</p>
    <Button>{t.hero.cta.cases}</Button>
    // ...
  );
}
```

### 6. Completar traduções nos JSON

Adicionar TODAS as strings do site aos arquivos `pt.json` e `en.json`:
- nav
- hero
- highlights
- cases
- leadership
- about
- experience
- articles
- contact
- footer

### 7. Gerar static params para build

```tsx
// src/app/[locale]/layout.tsx ou page.tsx
export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'pt' }
  ];
}
```

## 🧪 Como Testar

1. Checkout do branch:
   ```bash
   git checkout feature/i18n-implementation
   ```

2. Instalar dependências (se necessário):
   ```bash
   npm install
   ```

3. Iniciar dev server:
   ```bash
   npm run dev
   ```

4. Testar URLs:
   - `http://localhost:3000` → deve redirecionar para `/pt`
   - `http://localhost:3000/pt` → versão português
   - `http://localhost:3000/en` → versão inglês
   - Clicar no seletor de idioma deve trocar e manter a mesma página

## 📦 Quando Estiver Pronto para Merge

1. Completar todas as tarefas pendentes acima
2. Testar TODAS as páginas em ambos os idiomas
3. Verificar links internos funcionando
4. Build de produção sem erros:
   ```bash
   npm run build
   ```
5. Criar PR para main
6. Adicionar variável `NEXT_PUBLIC_DEFAULT_LOCALE=pt` no Vercel (se necessário)

## 🚨 IMPORTANTE

- **NÃO fazer merge para main** até tudo estar funcionando
- **NÃO fazer deploy** deste branch
- O site atual na main continua funcionando normalmente
