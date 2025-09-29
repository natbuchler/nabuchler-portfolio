# Portfolio Figma - Integração MCP ✨

Este projeto demonstra uma integração completa e funcional do Figma com Next.js usando o Model Context Protocol (MCP) do Figma.

## 🎯 Status da Integração

✅ **FUNCIONANDO** - Integração MCP totalmente implementada e testada!

### Funcionalidades Implementadas:
- ✅ Conexão MCP direta com o Figma Desktop
- ✅ Obtenção de metadados de elementos em tempo real
- ✅ Geração de código (HTML, CSS, React) baseado no design
- ✅ Captura de screenshots de elementos
- ✅ Extração de variáveis de design
- ✅ Interface intuitiva com múltiplos modos de operação

## 🚀 Configuração Inicial

### 1. Configurar o Servidor MCP no Figma

1. **Abra o Figma Desktop** (versão mais recente)
2. **Abra um arquivo** no Figma
3. **Menu Figma** → **Preferências** → **Habilitar servidor MCP local**
4. Uma mensagem de confirmação aparecerá indicando que o servidor está rodando

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

### 🎨 Integração MCP Completa
- **Conexão direta** com o Figma Desktop via MCP
- **Três modos de operação**: Direto, API Routes e Demo
- **Sincronização em tempo real** com elementos selecionados
- **Interface moderna** com tabs e resultados organizados

### 📊 Obtenção de Dados
- **Metadados completos** de elementos (dimensões, posição, tipo, etc.)
- **Geração de código** automática (HTML, CSS, React)
- **Captura de screenshots** de alta qualidade
- **Extração de variáveis** de design (cores, tipografia, espaçamento)

### 💻 Geração de Código
- **HTML semântico** baseado na estrutura do design
- **CSS responsivo** com classes e propriedades otimizadas
- **Componentes React** prontos para uso com TypeScript
- **Variáveis CSS** organizadas por categoria

### 🔧 Interface Avançada
- **Múltiplos modos**: Direct MCP, API Routes, Demo
- **Histórico de resultados** com timestamps
- **Visualização organizada** por tipo de dados
- **Controles intuitivos** para diferentes operações

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                    # Página principal com integração
│   └── api/
│       ├── figma-mcp/             # API routes para MCP
│       │   ├── metadata/route.ts   # Obter metadados
│       │   ├── code/route.ts       # Gerar código
│       │   ├── screenshot/route.ts # Capturar screenshots
│       │   └── variables/route.ts  # Extrair variáveis
│       └── figma-direct-mcp/route.ts # API direta MCP
├── components/
│   ├── figma-component.tsx        # Componente original (API)
│   ├── FigmaMCPComponent.tsx      # Componente principal MCP
│   ├── FigmaRealMCP.tsx          # MCP via API routes
│   └── FigmaDirectMCP.tsx        # MCP direto (recomendado)
├── hooks/
│   └── use-figma.ts              # Hook personalizado
└── lib/
    ├── figma-config.ts           # Configurações
    └── figma-service.ts          # Serviço Figma
```

## 🔧 Como Usar

### 1. Acesso à Interface MCP

1. **Execute o projeto**: `npm run dev`
2. **Abra**: http://localhost:3000
3. **Clique em**: "Figma MCP ✨" no rodapé da página
4. **Escolha o modo**: Direct MCP (recomendado)

### 2. Operações Disponíveis

#### 📊 Obter Metadados
- **Função**: Obtém informações detalhadas do elemento
- **Dados**: Nome, tipo, dimensões, posição, filhos
- **Uso**: Entender a estrutura do design

#### 💻 Gerar Código  
- **Função**: Cria código HTML, CSS e React
- **Dados**: Código pronto para uso
- **Uso**: Implementar o design rapidamente

#### 📸 Capturar Screenshot
- **Função**: Gera imagem do elemento
- **Dados**: SVG ou PNG de alta qualidade
- **Uso**: Documentação e referência visual

#### 🎨 Extrair Variáveis
- **Função**: Obtém tokens de design
- **Dados**: Cores, tipografia, espaçamento
- **Uso**: Criar design system consistente

### 3. Exemplo de Uso Programático

```tsx
import FigmaDirectMCP from '@/components/FigmaDirectMCP';

function MyComponent() {
  return (
    <div>
      <h1>Minha Integração Figma</h1>
      <FigmaDirectMCP nodeId="3211:1217" />
    </div>
  );
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
