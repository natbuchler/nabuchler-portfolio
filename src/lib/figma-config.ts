// Figma API Configuration
export const figmaConfig = {
  // Substitua pelos seus valores reais
  accessToken: process.env.FIGMA_ACCESS_TOKEN || 'your_figma_access_token_here',
  fileKey: process.env.FIGMA_FILE_KEY || 'your_figma_file_key_here',
  mcpServerUrl: process.env.FIGMA_MCP_SERVER_URL || 'http://127.0.0.1:3845/sse',
};

// Tipos para os dados do Figma
export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  visible?: boolean;
  children?: FigmaNode[];
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  fills?: Array<{
    type: string;
    color?: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
  }>;
  style?: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
    letterSpacing?: number;
    lineHeightPx?: number;
  };
}

export interface FigmaFile {
  document: FigmaNode;
  components: Record<string, any>;
  styles: Record<string, any>;
}
