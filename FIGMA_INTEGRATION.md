# Portfolio Figma - Integração MCP

Este projeto demonstra como integrar o Figma com Next.js usando o Model Context Protocol (MCP) do Figma.

## 🚀 Configuração Inicial

### 1. Configurar o Servidor MCP no Figma

1. **Abra o Figma Desktop** (versão mais recente)
2. **Abra um arquivo** no Figma
3. **Menu Figma** → **Preferências** → **Habilitar servidor MCP local**
4. Uma mensagem de confirmação aparecerá indicando que o servidor está rodando em `http://127.0.0.1:3845/mcp`

### 2. Configurar MCP no Cursor

1. **Abra Cursor** → **Configurações** → **Configurações do Cursor**
2. Vá até a aba **MCP**
3. Clique em **+ Adicionar novo servidor MCP global**
4. Insira a configuração:

```json
{
  "mcpServers": {
    "Figma": {
      "url": "http://127.0.0.1:3845/sse"
    }
  }
}
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Figma API Configuration
FIGMA_ACCESS_TOKEN=seu_token_de_acesso_do_figma
FIGMA_FILE_KEY=chave_do_arquivo_figma

# MCP Server Configuration
FIGMA_MCP_SERVER_URL=http://127.0.0.1:3845/sse
```

#### Como obter o Access Token do Figma:

1. Acesse [Figma Account Settings](https://www.figma.com/settings)
2. Role até a seção "Personal access tokens"
3. Clique em "Create new token"
4. Dê um nome ao token e copie o valor gerado

#### Como obter a File Key:

1. Abra seu arquivo no Figma
2. A URL será algo como: `https://www.figma.com/file/FILE_KEY/File-Name`
3. Copie o `FILE_KEY` da URL

## 📦 Instalação

```bash
npm install
```

## 🏃‍♂️ Executar o Projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🛠️ Funcionalidades

### Integração MCP
- **Conexão em tempo real** com o Figma via MCP
- **Sincronização automática** quando você seleciona elementos no Figma
- **Extração de componentes** e propriedades de design

### API do Figma
- **Carregamento de arquivos** do Figma
- **Extração de componentes** e nós
- **Conversão de cores** e medidas para CSS
- **Geração de imagens** dos componentes

### Interface
- **Visualização da estrutura** do arquivo Figma
- **Detalhes dos componentes** selecionados
- **Lista de componentes** encontrados
- **Status da conexão MCP** em tempo real

## 📁 Estrutura do Projeto

```
src/
├── app/
│   └── page.tsx              # Página principal
├── components/
│   └── figma-component.tsx   # Componente principal do Figma
├── hooks/
│   └── use-figma.ts          # Hook personalizado para Figma
└── lib/
    ├── figma-config.ts       # Configurações e tipos
    └── figma-service.ts      # Serviço para API do Figma
```

## 🔧 Uso

### Hook useFigma

```tsx
import { useFigma } from '@/hooks/use-figma';

function MyComponent() {
  const {
    file,
    loading,
    error,
    mcpConnected,
    components,
    fetchFile,
    connectMCP,
    disconnectMCP,
  } = useFigma({ 
    fileKey: 'seu-file-key', 
    autoConnect: true 
  });

  // Usar os dados do Figma...
}
```

### Serviço FigmaService

```tsx
import { FigmaService } from '@/lib/figma-service';

const figmaService = new FigmaService();

// Carregar arquivo
const file = await figmaService.getFile('file-key');

// Conectar MCP
const connection = await figmaService.connectToMCPServer();

// Extrair componentes
const components = figmaService.extractComponents(file.document);
```

## 🎨 Exemplos de Uso

### Gerar CSS a partir do Figma

```tsx
// Converter cores do Figma para CSS
const color = figmaService.figmaColorToCSS({
  r: 0.2, g: 0.4, b: 0.8, a: 1
}); // "rgba(51, 102, 204, 1)"

// Converter medidas
const width = figmaService.figmaSizeToCSS(200); // "200px"
```

### Criar componentes React baseados no Figma

```tsx
function FigmaButton({ node }: { node: FigmaNode }) {
  const style = {
    width: node.absoluteBoundingBox?.width,
    height: node.absoluteBoundingBox?.height,
    backgroundColor: node.fills?.[0]?.color 
      ? figmaService.figmaColorToCSS(node.fills[0].color)
      : 'transparent',
  };

  return <button style={style}>{node.name}</button>;
}
```

## 🐛 Troubleshooting

### Erro de Conexão MCP
- Verifique se o servidor MCP está habilitado no Figma
- Confirme se a URL `http://127.0.0.1:3845/sse` está acessível
- Reinicie o Figma e o Cursor se necessário

### Erro de API do Figma
- Verifique se o `FIGMA_ACCESS_TOKEN` está correto
- Confirme se o `FIGMA_FILE_KEY` é válido
- Verifique se o token tem permissões para acessar o arquivo

### Componentes não aparecem
- Certifique-se de que o arquivo foi carregado com sucesso
- Verifique se existem componentes no arquivo Figma
- Use o botão "Carregar Arquivo Figma" para recarregar

## 📚 Recursos Adicionais

- [Documentação oficial do Figma MCP](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- [API do Figma](https://www.figma.com/developers/api)
- [Model Context Protocol](https://modelcontextprotocol.io/)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
