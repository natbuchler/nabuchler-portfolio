# Sistema de Cache do Figma

Este documento descreve o sistema de cache implementado para reduzir as chamadas à API do Figma.

## Visão Geral

O sistema de cache armazena em memória os resultados das chamadas à API do Figma, reduzindo latência e custos. O cache é automático e transparente - você não precisa fazer nada especial para usá-lo.

## Características

- **Cache automático**: Todas as chamadas à API do Figma são automaticamente cacheadas
- **TTL configurável**: Cada tipo de dado tem um tempo de vida (TTL) otimizado:
  - Metadados de nós: 10 minutos
  - Screenshots/Imagens: 60 minutos (raramente mudam)
  - Arquivo completo: 30 minutos
  - Variáveis de design: 20 minutos
- **Limpeza automática**: Entradas expiradas são removidas automaticamente a cada 5 minutos
- **Invalidação manual**: Possibilidade de invalidar cache quando necessário

## Uso Básico

### Usando a API do Figma (com cache automático)

```typescript
import { getFigmaAPI } from '@/lib/figma-api';

// Criar instância da API (o cache é automático)
const figmaAPI = getFigmaAPI();

// Primeira chamada: busca da API do Figma
const metadata = await figmaAPI.getNodeMetadata('3211:1217');
console.log('✅ Dados obtidos da API');

// Segunda chamada (dentro de 10 minutos): retorna do cache
const cachedMetadata = await figmaAPI.getNodeMetadata('3211:1217');
console.log('✅ Dados obtidos do cache (instantâneo!)');
```

### Invalidando o Cache

Quando você sabe que os dados do Figma foram atualizados:

```typescript
import { getFigmaAPI } from '@/lib/figma-api';

const figmaAPI = getFigmaAPI();

// Invalidar cache de um nó específico
figmaAPI.invalidateCache('3211:1217');

// Invalidar todo o cache do Figma
figmaAPI.invalidateCache();

// Próxima chamada buscará dados frescos
const freshData = await figmaAPI.getNodeMetadata('3211:1217');
```

### Verificando Estatísticas do Cache

```typescript
import { getFigmaAPI } from '@/lib/figma-api';

const figmaAPI = getFigmaAPI();
const stats = figmaAPI.getCacheStats();

console.log(`Total de itens: ${stats.total}`);
console.log(`Itens válidos: ${stats.valid}`);
console.log(`Itens expirados: ${stats.expired}`);
console.log(`TTL padrão: ${stats.defaultTTLMinutes} minutos`);
```

## Uso Avançado

### Usando o Cache Diretamente

Se você quiser usar o sistema de cache para outros propósitos:

```typescript
import { getFigmaCache, generateCacheKey } from '@/lib/figma-cache';

const cache = getFigmaCache();

// Armazenar um valor
cache.set('minha-chave', { dados: 'exemplo' }, 5); // 5 minutos

// Recuperar um valor
const dados = cache.get('minha-chave');

// Usar com uma função assíncrona
const resultado = await cache.wrap(
  'chave-unica',
  async () => {
    // Esta função só será executada se não houver cache
    const resposta = await fetch('https://api.exemplo.com/dados');
    return resposta.json();
  },
  15 // Cache por 15 minutos
);
```

### Gerando Chaves de Cache

O sistema usa chaves consistentes para garantir que requisições idênticas usem o mesmo cache:

```typescript
import { generateCacheKey } from '@/lib/figma-cache';

// Gerar chave para metadados
const key1 = generateCacheKey('metadata', 'fileKey:nodeId');

// Gerar chave com parâmetros
const key2 = generateCacheKey('screenshot', 'fileKey:nodeId', {
  scale: 2,
  format: 'png'
});

// Chaves são consistentes: mesmos parâmetros = mesma chave
```

## Benefícios

1. **Performance melhorada**: Chamadas cacheadas são instantâneas
2. **Redução de custos**: Menos chamadas à API do Figma
3. **Melhor experiência**: Menos latência para o usuário
4. **Rate limiting**: Ajuda a evitar limites de taxa da API

## Monitoramento

O sistema de cache registra logs úteis no console:

```
📦 Cache: Armazenado "figma:metadata:fileKey:3211:1217" (expira em 10min)
📦 Cache: Hit para "figma:metadata:fileKey:3211:1217" (idade: 45s)
📦 Cache: Miss para "figma:code:fileKey:3211:1217"
📦 Cache: Limpeza automática removeu 5 itens expirados
```

## Configuração

O cache usa valores padrão otimizados, mas você pode ajustar:

```typescript
import { FigmaCache } from '@/lib/figma-cache';

// Criar cache com TTL personalizado (em minutos)
const customCache = new FigmaCache(30); // 30 minutos padrão
```

## API Reference

### FigmaCache

- `set<T>(key: string, data: T, ttlMinutes?: number): void` - Armazena dados
- `get<T>(key: string): T | null` - Recupera dados
- `delete(key: string): boolean` - Remove entrada específica
- `deletePattern(pattern: string): number` - Remove por padrão
- `clear(): void` - Limpa todo o cache
- `getStats()` - Retorna estatísticas
- `wrap<T>(key, fn, ttlMinutes?)` - Executa função com cache automático

### FigmaAPIService

- `invalidateCache(nodeId?: string)` - Invalida cache
- `getCacheStats()` - Retorna estatísticas do cache

## Notas

- O cache é armazenado em memória e é perdido quando o servidor reinicia
- Para cache persistente, considere usar Redis ou similar
- Em ambiente de produção com múltiplos servidores, considere cache distribuído

