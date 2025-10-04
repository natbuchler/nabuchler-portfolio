// Serviço para comunicação direta com a API REST do Figma
import { figmaConfig } from './figma-config';
import { getFigmaCache, generateCacheKey } from './figma-cache';

interface FigmaNodeResponse {
  nodes: {
    [key: string]: {
      document: {
        id: string;
        name: string;
        type: string;
        children?: any[];
        absoluteBoundingBox?: {
          x: number;
          y: number;
          width: number;
          height: number;
        };
        fills?: any[];
        strokes?: any[];
        effects?: any[];
        characters?: string;
        style?: any;
      };
      components?: any;
      schemaVersion?: number;
      styles?: any;
    };
  };
}

interface FigmaFileResponse {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  document: any;
  components: any;
  schemaVersion: number;
  styles: any;
}

interface FigmaImageResponse {
  err: null | string;
  images: {
    [key: string]: string;
  };
}

export class FigmaAPIService {
  private accessToken: string;
  private fileKey: string;
  private baseUrl = 'https://api.figma.com/v1';
  private cache = getFigmaCache();

  constructor(accessToken?: string, fileKey?: string) {
    this.accessToken = accessToken || figmaConfig.accessToken;
    this.fileKey = fileKey || figmaConfig.fileKey;

    if (!this.accessToken) {
      throw new Error('FIGMA_ACCESS_TOKEN não configurado');
    }
    if (!this.fileKey) {
      throw new Error('FIGMA_FILE_KEY não configurado');
    }
  }

  private async request<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    console.log('🔍 Fazendo requisição para Figma API:', url);
    
    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': this.accessToken,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erro na API do Figma: ${response.status} - ${error}`);
    }

    return response.json();
  }

  // Obter metadados de um ou mais nós
  async getNodes(nodeIds: string[]): Promise<FigmaNodeResponse> {
    const ids = nodeIds.join(',');
    const cacheKey = generateCacheKey('metadata', `${this.fileKey}:${ids}`);
    
    return this.cache.wrap(
      cacheKey,
      () => this.request<FigmaNodeResponse>(
        `/files/${this.fileKey}/nodes?ids=${encodeURIComponent(ids)}`
      ),
      10 // Cache por 10 minutos
    );
  }

  // Obter informações completas do arquivo
  async getFile(): Promise<FigmaFileResponse> {
    const cacheKey = generateCacheKey('file', this.fileKey);
    
    return this.cache.wrap(
      cacheKey,
      () => this.request<FigmaFileResponse>(`/files/${this.fileKey}`),
      30 // Cache por 30 minutos (arquivos mudam menos)
    );
  }

  // Obter imagens/thumbnails de nós
  async getImages(
    nodeIds: string[],
    options: {
      scale?: number;
      format?: 'jpg' | 'png' | 'svg' | 'pdf';
    } = {}
  ): Promise<FigmaImageResponse> {
    const ids = nodeIds.join(',');
    const scale = options.scale || 2;
    const format = options.format || 'png';
    
    const cacheKey = generateCacheKey('screenshot', `${this.fileKey}:${ids}`, { scale, format });
    
    return this.cache.wrap(
      cacheKey,
      () => this.request<FigmaImageResponse>(
        `/images/${this.fileKey}?ids=${encodeURIComponent(ids)}&scale=${scale}&format=${format}`
      ),
      60 // Cache por 60 minutos (imagens raramente mudam)
    );
  }

  // Converter dados do Figma para o formato esperado pelo MCP
  async getNodeMetadata(nodeId: string) {
    try {
      const response = await this.getNodes([nodeId]);
      const nodeData = response.nodes[nodeId];

      if (!nodeData) {
        throw new Error(`Nó ${nodeId} não encontrado`);
      }

      const doc = nodeData.document;
      
      return {
        nodeId,
        name: doc.name,
        type: doc.type,
        x: doc.absoluteBoundingBox?.x || 0,
        y: doc.absoluteBoundingBox?.y || 0,
        width: doc.absoluteBoundingBox?.width || 0,
        height: doc.absoluteBoundingBox?.height || 0,
        children: doc.children?.map((child: any) => ({
          id: child.id,
          name: child.name,
          type: child.type,
          width: child.absoluteBoundingBox?.width || 0,
          height: child.absoluteBoundingBox?.height || 0,
          x: child.absoluteBoundingBox?.x || 0,
          y: child.absoluteBoundingBox?.y || 0,
        })) || [],
        fills: doc.fills || [],
        strokes: doc.strokes || [],
        effects: doc.effects || [],
        characters: doc.characters,
        style: doc.style,
        source: 'figma-rest-api',
      };
    } catch (error) {
      console.error('Erro ao obter metadados do nó:', error);
      throw error;
    }
  }

  // Obter screenshot de um nó
  async getNodeScreenshot(
    nodeId: string,
    options: {
      scale?: number;
      format?: 'jpg' | 'png' | 'svg' | 'pdf';
    } = {}
  ) {
    try {
      const response = await this.getImages([nodeId], options);

      if (response.err) {
        throw new Error(response.err);
      }

      const imageUrl = response.images[nodeId];

      if (!imageUrl) {
        throw new Error(`Imagem não disponível para o nó ${nodeId}`);
      }

      return {
        url: imageUrl,
        nodeId,
        format: options.format || 'png',
        scale: options.scale || 2,
        source: 'figma-rest-api',
      };
    } catch (error) {
      console.error('Erro ao obter screenshot:', error);
      throw error;
    }
  }

  // Invalidar cache para um nodeId específico ou todo o cache
  invalidateCache(nodeId?: string) {
    if (nodeId) {
      // Invalidar cache específico do nó
      this.cache.deletePattern(nodeId);
      console.log(`🗑️  Cache invalidado para nodeId: ${nodeId}`);
    } else {
      // Invalidar todo o cache do Figma
      this.cache.deletePattern('figma:');
      console.log('🗑️  Todo o cache do Figma foi invalidado');
    }
  }

  // Obter estatísticas do cache
  getCacheStats() {
    return this.cache.getStats();
  }

  // Extrair variáveis de cor do documento
  async getDesignVariables() {
    try {
      const cacheKey = generateCacheKey('variables', this.fileKey);
      
      return this.cache.wrap(
        cacheKey,
        async () => {
          const fileData = await this.getFile();
      
      // Extrair estilos de cor
      const colorStyles: Record<string, string> = {};
      
      if (fileData.styles) {
        Object.entries(fileData.styles).forEach(([key, style]: [string, any]) => {
          if (style.styleType === 'FILL') {
            colorStyles[style.name] = key;
          }
        });
      }

          // Por enquanto, retornar variáveis do design system conhecido
          // Em uma implementação completa, isso seria extraído dinamicamente
          return {
            colors: {
              Brown: '#421d13',
              Beige: '#ad8a6c',
              TextGray: '#6b6763',
              Card: '#ad8a6c33',
              'Card30%': '#d0bfb0',
              Background: '#e3dcd6',
              Orange: '#c95127',
            },
            typography: {
              H1: 'Font(family: "Playfair Display", style: Bold, size: 64, weight: 700, lineHeight: 1.2)',
              H2: 'Font(family: "Playfair Display", style: Bold, size: 48, weight: 700, lineHeight: 72)',
              Body: 'Font(family: "Roboto Flex", style: Light, size: 24, weight: 300, lineHeight: 1.6)',
              ButtonPrimary: 'Font(family: "Roboto", style: Medium, size: 18, weight: 500, lineHeight: 1.5)',
              ButtonSecondary: 'Font(family: "Roboto", style: Medium, size: 18, weight: 500, lineHeight: 1.5)',
            },
            source: 'figma-rest-api',
            fileKey: this.fileKey,
            fileName: fileData.name,
            lastModified: fileData.lastModified,
          };
        },
        20 // Cache por 20 minutos
      );
    } catch (error) {
      console.error('Erro ao obter variáveis do design:', error);
      throw error;
    }
  }

  // Gerar código básico a partir de um nó (simplificado)
  async generateCode(nodeId: string) {
    try {
      const metadata = await this.getNodeMetadata(nodeId);
      
      // Gerar código React básico baseado nos metadados
      const componentName = metadata.name
        .replace(/[^a-zA-Z0-9]/g, '')
        .replace(/^(.)/, (m) => m.toUpperCase());

      const width = Math.round(metadata.width);
      const height = Math.round(metadata.height);

      // Extrair cores das fills
      let backgroundColor = '#ffffff';
      if (metadata.fills && metadata.fills.length > 0) {
        const fill = metadata.fills[0];
        if (fill.type === 'SOLID' && fill.color) {
          const r = Math.round(fill.color.r * 255);
          const g = Math.round(fill.color.g * 255);
          const b = Math.round(fill.color.b * 255);
          backgroundColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        }
      }

      const reactCode = `export default function ${componentName}() {
  return (
    <div 
      className="relative"
      style={{
        width: '${width}px',
        height: '${height}px',
        backgroundColor: '${backgroundColor}'
      }}
    >
      {/* Component: ${metadata.name} */}
      {/* Type: ${metadata.type} */}
      {/* Children: ${metadata.children.length} */}
      
      {/* TODO: Adicionar conteúdo do componente */}
    </div>
  );
}`;

      const cssCode = `.${componentName.toLowerCase()} {
  position: relative;
  width: ${width}px;
  height: ${height}px;
  background-color: ${backgroundColor};
}`;

      return {
        react: reactCode,
        css: cssCode,
        html: `<div class="${componentName.toLowerCase()}"></div>`,
        metadata,
        nodeId,
        source: 'figma-rest-api-generated',
        note: 'Código gerado automaticamente. Para código mais preciso, considere usar Figma Dev Mode ou plugins especializados.',
      };
    } catch (error) {
      console.error('Erro ao gerar código:', error);
      throw error;
    }
  }
}

// Instância singleton para reutilização
let figmaAPIInstance: FigmaAPIService | null = null;

export function getFigmaAPI(): FigmaAPIService {
  if (!figmaAPIInstance) {
    figmaAPIInstance = new FigmaAPIService();
  }
  return figmaAPIInstance;
}

