import axios from 'axios';
import { figmaConfig, FigmaFile, FigmaNode } from './figma-config';

export interface MCPMetadataResponse {
  nodeId: string;
  type: string;
  name: string;
  dimensions: { width: number; height: number };
  children: unknown[];
  timestamp: string;
  source: string;
}

export interface MCPCodeResponse {
  html: string;
  css: string;
  framework: string;
  language: string;
  source: string;
}

export interface MCPScreenshotResponse {
  image: string;
  format: string;
  width: number;
  height: number;
  source: string;
}

export class FigmaService {
  private baseURL = 'https://api.figma.com/v1';
  private mcpServerURL = 'http://127.0.0.1:3845';

  constructor() {
    // MCP do Figma não precisa de token - funciona através das funções MCP
    console.log('FigmaService inicializado com suporte MCP');
  }

  /**
   * Busca dados de um arquivo do Figma
   */
  async getFile(fileKey?: string): Promise<FigmaFile> {
    const key = fileKey || figmaConfig.fileKey;
    
    if (!key || key === 'your_figma_file_key_here') {
      throw new Error('File key do Figma não configurado');
    }

    try {
      const response = await axios.get(`${this.baseURL}/files/${key}`, {
        headers: {
          'X-Figma-Token': figmaConfig.accessToken,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar arquivo do Figma:', error);
      throw error;
    }
  }

  /**
   * Busca imagens de nós específicos do Figma
   */
  async getImages(fileKey: string, nodeIds: string[]): Promise<Record<string, string>> {
    try {
      const response = await axios.get(`${this.baseURL}/images/${fileKey}`, {
        headers: {
          'X-Figma-Token': figmaConfig.accessToken,
        },
        params: {
          ids: nodeIds.join(','),
          format: 'png',
          scale: 2,
        },
      });

      return response.data.images;
    } catch (error) {
      console.error('Erro ao buscar imagens do Figma:', error);
      throw error;
    }
  }

    /**
   * Obtém metadados do Figma via MCP
   */
    async getMCPMetadata(nodeId?: string): Promise<MCPMetadataResponse> {
      try {
        console.log("🔍 Pedindo metadados MCP para nodeId:", nodeId);

        const response = await axios.post(`${this.mcpServerURL}/figma/metadata`, {
          nodeId: nodeId || null,
          clientLanguages: 'typescript,javascript',
          clientFrameworks: 'react,nextjs'
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 5000
        });

        console.log("✅ Metadados MCP obtidos:", response.data);
        return response.data;
      } catch (error) {
        console.warn("⚠️  MCP Server não disponível, usando dados mock:", error instanceof Error ? error.message : String(error));

        // Fallback com dados mock
        return {
          nodeId: nodeId || 'current-selection',
          type: 'FRAME',
          name: 'Mock Component',
          dimensions: { width: 320, height: 240 },
          children: [],
          timestamp: new Date().toISOString(),
          source: 'fallback'
        };
      }
    }
  
    /**
     * Obtém código do componente via MCP
     */
    async getMCPCode(nodeId?: string): Promise<MCPCodeResponse> {
      try {
        console.log("💻 Pedindo código MCP para nodeId:", nodeId);

        const response = await axios.post(`${this.mcpServerURL}/figma/code`, {
          nodeId: nodeId || null,
          clientLanguages: 'typescript,javascript',
          clientFrameworks: 'react,nextjs',
          includeCSS: true
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 5000
        });

        console.log("✅ Código MCP obtido:", response.data);
        return response.data;
      } catch (error) {
        console.warn("⚠️  MCP Server não disponível, usando código mock:", error instanceof Error ? error.message : String(error));

        // Fallback com código mock
        return {
          html: `<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">\n  <div className="flex items-start gap-4">\n    <div className="flex-shrink-0">\n      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">\n        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">\n          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>\n        </svg>\n      </div>\n    </div>\n    <div className="flex-1 min-w-0">\n      <h3 className="text-lg font-semibold text-gray-900 mb-2">\n        Componente do Figma\n      </h3>\n      <p className="text-gray-600 text-sm leading-relaxed">\n        Este é um componente renderizado a partir do Figma via MCP (fallback mock).\n      </p>\n    </div>\n  </div>\n</div>`,
          css: `.figma-component {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);\n  padding: 24px;\n  transition: box-shadow 0.2s ease-in-out;\n}\n\n.figma-component:hover {\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);\n}`,
          framework: 'react',
          language: 'typescript',
          source: 'fallback'
        };
      }
    }
  
    /**
     * Obtém screenshot via MCP
     */
    async getMCPScreenshot(nodeId?: string): Promise<MCPScreenshotResponse> {
      try {
        console.log("📸 Pedindo screenshot MCP para nodeId:", nodeId);

        const response = await axios.post(`${this.mcpServerURL}/figma/screenshot`, {
          nodeId: nodeId || null,
          format: 'png',
          scale: 2
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 5000,
          responseType: 'json'
        });

        console.log("✅ Screenshot MCP obtido:", response.data);

        // Se a resposta contém uma imagem base64
        if (response.data.image || response.data.data) {
          return {
            image: response.data.image || response.data.data,
            format: response.data.format || 'png',
            width: response.data.width,
            height: response.data.height,
            source: 'mcp'
          };
        }

        return response.data;
      } catch (error) {
        console.warn("⚠️  MCP Server não disponível, usando screenshot mock:", error instanceof Error ? error.message : String(error));

        // Fallback com placeholder
        return {
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNDcuNSAxMTBIMTcyLjVWMTMwSDE0Ny41VjExMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+PC9wPgo8L3N2Zz4K',
          format: 'svg',
          width: 320,
          height: 240,
          source: 'fallback'
        };
      }
    }
  

  /**
   * Extrai componentes de um nó do Figma
   */
  extractComponents(node: FigmaNode): FigmaNode[] {
    const components: FigmaNode[] = [];

    const traverse = (currentNode: FigmaNode) => {
      if (currentNode.type === 'COMPONENT' || currentNode.type === 'INSTANCE') {
        components.push(currentNode);
      }

      if (currentNode.children) {
        currentNode.children.forEach(traverse);
      }
    };

    traverse(node);
    return components;
  }

  /**
   * Converte cores do Figma para CSS
   */
  figmaColorToCSS(color: { r: number; g: number; b: number; a: number }): string {
    const { r, g, b, a } = color;
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
  }

  /**
   * Converte medidas do Figma para CSS
   */
  figmaSizeToCSS(size: number): string {
    return `${size}px`;
  }
}
