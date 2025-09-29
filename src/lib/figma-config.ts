// Figma API Configuration
export const figmaConfig = {
  accessToken: process.env.FIGMA_ACCESS_TOKEN || "",
  fileKey: process.env.FIGMA_FILE_KEY || "",
  mcpUrl: process.env.FIGMA_MCP_SERVER_URL || "",
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

export interface FigmaComponent {
  key: string;
  name: string;
  description?: string;
  componentSetId?: string;
  documentationLinks?: Array<{ uri: string }>;
}

export interface FigmaStyle {
  key: string;
  name: string;
  description?: string;
  styleType: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
}

export interface FigmaFile {
  document: FigmaNode;
  components: Record<string, FigmaComponent>;
  styles: Record<string, FigmaStyle>;
}
