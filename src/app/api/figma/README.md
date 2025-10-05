# Figma API Routes

Rotas de API para integração com o Figma, permitindo buscar metadados, screenshots, gerar código e acessar variáveis de design.

## 🚀 Endpoints Disponíveis

### 1. Metadados de Nós

#### `GET /api/figma/metadata`
Obtém metadados de um nó específico do Figma.

**Query Parameters:**
- `nodeId` (obrigatório): ID do nó no Figma

**Exemplo de Requisição:**
```bash
curl "http://localhost:3000/api/figma/metadata?nodeId=123:456"
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "nodeId": "123:456",
    "name": "Hero Section",
    "type": "FRAME",
    "x": 0,
    "y": 0,
    "width": 1440,
    "height": 800,
    "children": [...],
    "fills": [...],
    "source": "figma-rest-api"
  },
  "timestamp": "2025-10-04T..."
}
```

#### `POST /api/figma/metadata`
Busca metadados de múltiplos nós simultaneamente.

**Body:**
```json
{
  "nodeIds": ["123:456", "789:012"]
}
```

**Exemplo de Requisição:**
```bash
curl -X POST "http://localhost:3000/api/figma/metadata" \
  -H "Content-Type: application/json" \
  -d '{"nodeIds": ["123:456", "789:012"]}'
```

---

### 2. Screenshots/Imagens

#### `GET /api/figma/screenshot`
Gera screenshot de um nó do Figma.

**Query Parameters:**
- `nodeId` (obrigatório): ID do nó no Figma
- `scale` (opcional): Escala da imagem (1, 2, 3, 4) - padrão: 2
- `format` (opcional): Formato da imagem (png, jpg, svg, pdf) - padrão: png

**Exemplo de Requisição:**
```bash
curl "http://localhost:3000/api/figma/screenshot?nodeId=123:456&scale=2&format=png"
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "url": "https://figma-alpha-api.com/images/...",
    "nodeId": "123:456",
    "format": "png",
    "scale": 2,
    "source": "figma-rest-api"
  },
  "timestamp": "2025-10-04T..."
}
```

#### `POST /api/figma/screenshot`
Gera screenshots de múltiplos nós.

**Body:**
```json
{
  "nodeIds": ["123:456", "789:012"],
  "scale": 2,
  "format": "png"
}
```

---

### 3. Geração de Código

#### `GET /api/figma/code`
Gera código (React, CSS, HTML) a partir de um nó do Figma.

**Query Parameters:**
- `nodeId` (obrigatório): ID do nó no Figma

**Exemplo de Requisição:**
```bash
curl "http://localhost:3000/api/figma/code?nodeId=123:456"
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "react": "export default function HeroSection() { ... }",
    "css": ".herosection { ... }",
    "html": "<div class=\"herosection\"></div>",
    "metadata": {...},
    "nodeId": "123:456",
    "source": "figma-rest-api-generated",
    "note": "Código gerado automaticamente..."
  },
  "timestamp": "2025-10-04T..."
}
```

#### `POST /api/figma/code`
Gera código para múltiplos nós.

**Body:**
```json
{
  "nodeIds": ["123:456", "789:012"]
}
```

---

### 4. Variáveis de Design

#### `GET /api/figma/variables`
Obtém variáveis de design (cores, tipografia) do arquivo do Figma.

**Exemplo de Requisição:**
```bash
curl "http://localhost:3000/api/figma/variables"
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "colors": {
      "Brown": "#421d13",
      "Beige": "#ad8a6c",
      "Background": "#e3dcd6",
      "Orange": "#c95127"
    },
    "typography": {
      "H1": "Font(family: \"Playfair Display\", ...)",
      "Body": "Font(family: \"Roboto Flex\", ...)"
    },
    "source": "figma-rest-api",
    "fileKey": "...",
    "fileName": "Portfolio Design",
    "lastModified": "2025-10-04T..."
  },
  "timestamp": "2025-10-04T..."
}
```

---

### 5. Informações do Arquivo

#### `GET /api/figma/file`
Obtém informações gerais do arquivo do Figma.

**Exemplo de Requisição:**
```bash
curl "http://localhost:3000/api/figma/file"
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "name": "Portfolio Design",
    "lastModified": "2025-10-04T...",
    "thumbnailUrl": "https://...",
    "version": "123",
    "componentsCount": 45,
    "stylesCount": 12
  },
  "timestamp": "2025-10-04T..."
}
```

---

### 6. Gerenciamento de Cache

#### `GET /api/figma/cache`
Obtém estatísticas do cache.

**Exemplo de Requisição:**
```bash
curl "http://localhost:3000/api/figma/cache"
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "size": 15,
    "hits": 234,
    "misses": 45,
    "hitRate": "83.87%"
  },
  "timestamp": "2025-10-04T..."
}
```

#### `DELETE /api/figma/cache`
Invalida o cache (completo ou de um nó específico).

**Query Parameters (opcional):**
- `nodeId`: ID específico do nó para invalidar

**Exemplos de Requisição:**
```bash
# Invalidar todo o cache
curl -X DELETE "http://localhost:3000/api/figma/cache"

# Invalidar cache de um nó específico
curl -X DELETE "http://localhost:3000/api/figma/cache?nodeId=123:456"
```

---

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
FIGMA_ACCESS_TOKEN=seu_token_aqui
FIGMA_FILE_KEY=sua_chave_de_arquivo_aqui
FIGMA_MCP_SERVER_URL=http://127.0.0.1:3845/sse
```

### Como obter o Token do Figma

1. Acesse [Figma Account Settings](https://www.figma.com/settings)
2. Vá para "Personal access tokens"
3. Clique em "Create a new personal access token"
4. Dê um nome ao token e defina as permissões necessárias
5. Copie o token gerado

### Como obter o File Key

O File Key está na URL do seu arquivo Figma:
```
https://www.figma.com/file/{FILE_KEY}/nome-do-arquivo
```

---

## 📊 Sistema de Cache

Todas as rotas utilizam um sistema de cache inteligente:

- **Metadados**: Cache por 10 minutos
- **Arquivo completo**: Cache por 30 minutos
- **Screenshots**: Cache por 60 minutos
- **Variáveis**: Cache por 20 minutos

O cache é automático e ajuda a reduzir chamadas à API do Figma, melhorando a performance e evitando rate limiting.

---

## 🛠️ Tratamento de Erros

Todas as rotas retornam erros padronizados:

```json
{
  "success": false,
  "error": "Descrição do erro",
  "timestamp": "2025-10-04T..."
}
```

### Códigos de Status HTTP

- `200`: Sucesso
- `400`: Requisição inválida (parâmetros faltando ou inválidos)
- `500`: Erro interno do servidor ou erro na API do Figma

---

## 🚀 Exemplos de Uso

### Exemplo em JavaScript/TypeScript

```typescript
// Buscar metadados de um nó
async function getNodeMetadata(nodeId: string) {
  const response = await fetch(`/api/figma/metadata?nodeId=${nodeId}`);
  const data = await response.json();
  
  if (data.success) {
    console.log('Metadados:', data.data);
  } else {
    console.error('Erro:', data.error);
  }
}

// Gerar screenshot
async function getScreenshot(nodeId: string) {
  const response = await fetch(
    `/api/figma/screenshot?nodeId=${nodeId}&scale=2&format=png`
  );
  const data = await response.json();
  
  if (data.success) {
    console.log('URL da imagem:', data.data.url);
  }
}

// Buscar variáveis de design
async function getDesignVariables() {
  const response = await fetch('/api/figma/variables');
  const data = await response.json();
  
  if (data.success) {
    console.log('Cores:', data.data.colors);
    console.log('Tipografia:', data.data.typography);
  }
}

// Gerar código React
async function generateCode(nodeId: string) {
  const response = await fetch(`/api/figma/code?nodeId=${nodeId}`);
  const data = await response.json();
  
  if (data.success) {
    console.log('React:', data.data.react);
    console.log('CSS:', data.data.css);
  }
}
```

### Exemplo em React Component

```tsx
import { useState, useEffect } from 'react';

function FigmaNodeViewer({ nodeId }: { nodeId: string }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/figma/metadata?nodeId=${nodeId}`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      }
      setLoading(false);
    }

    fetchData();
  }, [nodeId]);

  if (loading) return <div>Carregando...</div>;
  if (!data) return <div>Erro ao carregar dados</div>;

  return (
    <div>
      <h2>{data.name}</h2>
      <p>Tipo: {data.type}</p>
      <p>Dimensões: {data.width}x{data.height}</p>
    </div>
  );
}
```

---

## 📝 Notas

- As rotas são **server-side only** e não podem ser acessadas diretamente do cliente em produção se você tiver configurado proteções de CORS
- O código gerado é uma versão simplificada. Para código de produção, considere usar Figma Dev Mode ou plugins especializados
- Screenshots podem demorar alguns segundos para serem gerados pelo Figma, especialmente para nós complexos
- Use o cache de forma inteligente para evitar rate limiting da API do Figma

---

## 🔗 Recursos Úteis

- [Figma REST API Documentation](https://www.figma.com/developers/api)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

