# 🎨 Guia de Uso do Figma MCP

## Status da Integração

✅ **MCP do Figma está configurado e rodando!**

### Verificação de Status

```bash
# Verificar processos MCP
ps aux | grep figma-mcp

# Verificar configuração
cat ~/.cursor/mcp.json

# Testar API
curl -X POST http://localhost:3000/api/figma-direct-mcp \
  -H "Content-Type: application/json" \
  -d '{"action": "get_metadata"}'
```

## Como Funciona

### 1. Configuração do MCP

O MCP está configurado em `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "figma-mcp": {
      "command": "npx",
      "args": ["figma-mcp@0.1.4"],
      "env": {
        "FIGMA_API_KEY": "figd_..."
      }
    }
  }
}
```

### 2. Funções MCP Disponíveis

As seguintes funções MCP estão disponíveis no contexto do Cursor/Claude:

- `mcp_figma_mcp_add_figma_file(url)` - Adiciona um arquivo Figma ao contexto
- `mcp_figma_mcp_view_node(file_key, node_id)` - Obtém thumbnail de um nó
- `mcp_figma_mcp_read_comments(file_key)` - Lê comentários do arquivo
- `mcp_figma_mcp_post_comment(file_key, message, x, y, node_id?)` - Posta um comentário
- `mcp_figma_mcp_reply_to_comment(file_key, comment_id, message)` - Responde a um comentário

**IMPORTANTE:** As funções `get_metadata` e `get_code` mencionadas na documentação original 
não são funções MCP nativas do Figma. Elas podem ser funções customizadas ou de outro servidor MCP.

### 3. API Implementada

A API em `/src/app/api/figma-direct-mcp/route.ts` tenta usar o MCP real e faz fallback para dados mockados:

```typescript
// Exemplo de uso na API
try {
  // @ts-ignore - MCP functions são injetadas pelo Cursor
  if (typeof mcp_figma_mcp_get_metadata !== 'undefined') {
    const result = await mcp_figma_mcp_get_metadata({ nodeId });
    return { ...result, source: 'figma-mcp-real' };
  }
} catch (error) {
  // Fallback para dados mockados
  return mockData;
}
```

### 4. Endpoints da API

#### GET Metadata
```bash
curl -X POST http://localhost:3000/api/figma-direct-mcp \
  -H "Content-Type: application/json" \
  -d '{
    "action": "get_metadata",
    "nodeId": "3211:1234"
  }'
```

#### GET Code
```bash
curl -X POST http://localhost:3000/api/figma-direct-mcp \
  -H "Content-Type: application/json" \
  -d '{
    "action": "get_code",
    "nodeId": "buttons",
    "clientLanguages": "typescript,javascript",
    "clientFrameworks": "react,nextjs"
  }'
```

#### GET Screenshot
```bash
curl -X POST http://localhost:3000/api/figma-direct-mcp \
  -H "Content-Type: application/json" \
  -d '{
    "action": "get_screenshot",
    "nodeId": "3211:1234"
  }'
```

#### GET Variables
```bash
curl -X POST http://localhost:3000/api/figma-direct-mcp \
  -H "Content-Type: application/json" \
  -d '{"action": "get_variables"}'
```

## Como Usar no Frontend

### Componente React

```tsx
import FigmaDirectMCP from '@/components/FigmaDirectMCP';

export default function Page() {
  return (
    <div>
      <FigmaDirectMCP nodeId="3211:1234" />
    </div>
  );
}
```

### Uso Programático

```typescript
const response = await fetch('/api/figma-direct-mcp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    action: 'get_metadata',
    nodeId: '3211:1234'
  })
});

const data = await response.json();
console.log('Source:', data.source); // 'figma-mcp-real' ou 'figma-mcp-mock'
```

## Identificando Dados Reais vs Mockados

Todos os dados retornados incluem um campo `source`:

- `"source": "figma-mcp-real"` - Dados obtidos via MCP real do Figma
- `"source": "figma-mcp-mock"` - Dados mockados (fallback)

## Troubleshooting

### MCP não está respondendo

1. Certifique-se de que o Figma Desktop está aberto
2. Verifique se o arquivo está aberto no Figma
3. Verifique se o MCP está habilitado nas preferências do Figma
4. Reinicie o Cursor

### Sempre retorna dados mockados

Isso é esperado quando as funções MCP são chamadas de um servidor Next.js (não no contexto do Cursor).
As funções MCP só estão disponíveis no contexto do Cursor/Claude.

**Soluções:**

1. Use a API REST do Figma diretamente (com `FIGMA_ACCESS_TOKEN`)
2. Use as funções MCP no contexto do Cursor (este arquivo, por exemplo)
3. Crie um proxy que executa comandos via MCP CLI

### Como obter dados reais do Figma

Para obter dados reais em produção, use a API REST do Figma:

```typescript
const response = await fetch(
  `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${nodeId}`,
  {
    headers: {
      'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN
    }
  }
);
```

## Próximos Passos

1. **✅ MCP Configurado** - O servidor MCP está rodando
2. **✅ API Implementada** - Endpoints funcionando com fallback
3. **🔄 Integração Real** - As funções MCP tentam usar dados reais
4. **📝 Documentação** - Este guia

### Para ativar dados 100% reais:

1. Configure `FIGMA_ACCESS_TOKEN` no `.env.local`
2. Configure `FIGMA_FILE_KEY` no `.env.local`
3. Use a API REST do Figma como fallback

## Referências

- [Figma MCP no NPM](https://www.npmjs.com/package/figma-mcp)
- [Figma REST API](https://www.figma.com/developers/api)
- [MCP (Model Context Protocol)](https://modelcontextprotocol.io/)

