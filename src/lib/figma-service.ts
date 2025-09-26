import axios from 'axios';
import { figmaConfig, FigmaFile, FigmaNode } from './figma-config';

export class FigmaService {
  private baseURL = 'https://api.figma.com/v1';

  constructor() {
    if (!figmaConfig.accessToken || figmaConfig.accessToken === 'your_figma_access_token_here') {
      console.warn('Figma access token não configurado. Configure FIGMA_ACCESS_TOKEN nas variáveis de ambiente.');
    }
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
   * Conecta com o servidor MCP do Figma
   */
  async connectToMCPServer(): Promise<EventSource> {
    try {
      const eventSource = new EventSource(figmaConfig.mcpServerUrl);
      
      eventSource.onopen = () => {
        console.log('Conectado ao servidor MCP do Figma');
      };

      eventSource.onerror = (error) => {
        console.error('Erro na conexão MCP:', error);
      };

      return eventSource;
    } catch (error) {
      console.error('Erro ao conectar com servidor MCP:', error);
      throw error;
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
