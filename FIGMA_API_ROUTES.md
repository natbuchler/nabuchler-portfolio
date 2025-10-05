# Rotas de API do Figma - Guia Rápido

Este documento descreve as rotas de API criadas para integração com o Figma.

## 📍 Rotas Criadas

### 1. `/api/figma/metadata` - Metadados de Nós
- **GET**: Buscar metadados de um nó específico
- **POST**: Buscar metadados de múltiplos nós

### 2. `/api/figma/screenshot` - Capturas de Tela
- **GET**: Gerar screenshot de um nó
- **POST**: Gerar screenshots de múltiplos nós

### 3. `/api/figma/code` - Geração de Código
- **GET**: Gerar código React/CSS/HTML de um nó
- **POST**: Gerar código de múltiplos nós

### 4. `/api/figma/variables` - Variáveis de Design
- **GET**: Obter cores, tipografia e estilos do design system

### 5. `/api/figma/file` - Informações do Arquivo
- **GET**: Obter informações gerais do arquivo Figma

### 6. `/api/figma/cache` - Gerenciamento de Cache
- **GET**: Estatísticas do cache
- **DELETE**: Invalidar cache (completo ou específico)

## 🔧 Estrutura de Arquivos

```
src/app/api/figma/
├── metadata/
│   └── route.ts       # Metadados de nós
├── screenshot/
│   └── route.ts       # Capturas de tela
├── code/
│   └── route.ts       # Geração de código
├── variables/
│   └── route.ts       # Variáveis de design
├── file/
│   └── route.ts       # Informações do arquivo
├── cache/
│   └── route.ts       # Gerenciamento de cache
└── README.md          # Documentação completa
```

## 🚀 Como Usar

### Exemplo Básico

```typescript
// Buscar metadados
const response = await fetch('/api/figma/metadata?nodeId=123:456');
const data = await response.json();
console.log(data.data);

// Gerar screenshot
const screenshot = await fetch('/api/figma/screenshot?nodeId=123:456&scale=2');
const imageData = await screenshot.json();
console.log(imageData.data.url);

// Obter variáveis de design
const variables = await fetch('/api/figma/variables');
const designSystem = await variables.json();
console.log(designSystem.data.colors);
```

## ⚙️ Configuração Necessária

Adicione as seguintes variáveis de ambiente no arquivo `.env.local`:

```env
FIGMA_ACCESS_TOKEN=seu_token_aqui
FIGMA_FILE_KEY=sua_chave_de_arquivo_aqui
```

## 📊 Características

- ✅ **Cache inteligente**: Reduz chamadas à API do Figma
- ✅ **Tratamento de erros**: Respostas padronizadas
- ✅ **TypeScript**: Tipagem completa
- ✅ **Suporte a múltiplos nós**: Batch processing
- ✅ **Documentação completa**: Exemplos e referências

## 📚 Documentação Completa

Para documentação detalhada, consulte:
- [`src/app/api/figma/README.md`](./src/app/api/figma/README.md) - Documentação completa das rotas

## 🔗 Recursos Relacionados

- `src/lib/figma-api.ts` - Serviço de API do Figma
- `src/lib/figma-config.ts` - Configurações
- `src/lib/figma-cache.ts` - Sistema de cache

## 🎯 Próximos Passos

1. Configure as variáveis de ambiente
2. Teste as rotas localmente
3. Integre com seus componentes React
4. Monitore o uso do cache

---

**Criado em**: 04/10/2025
**Versão**: 1.0.0

