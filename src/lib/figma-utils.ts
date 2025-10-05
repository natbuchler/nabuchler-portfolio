/**
 * Utilitários para trabalhar com a API do Figma
 */

/**
 * Converte Node ID do formato de URL do Figma para o formato da API
 * 
 * @param nodeId - Node ID no formato de URL (3211-1217) ou API (3211:1217)
 * @returns Node ID no formato da API (3211:1217)
 * 
 * @example
 * ```ts
 * convertNodeId('3211-1217') // '3211:1217'
 * convertNodeId('3211:1217') // '3211:1217'
 * ```
 */
export function convertNodeId(nodeId: string): string {
  return nodeId.replace(/-/g, ':');
}

/**
 * Extrai o Node ID de uma URL do Figma
 * 
 * @param url - URL do Figma
 * @returns Node ID no formato da API (3211:1217) ou null se não encontrado
 * 
 * @example
 * ```ts
 * const url = 'https://www.figma.com/design/ABC123/File?node-id=3211-1217&t=xyz';
 * extractNodeIdFromUrl(url) // '3211:1217'
 * ```
 */
export function extractNodeIdFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const nodeId = urlObj.searchParams.get('node-id');
    
    if (!nodeId) {
      return null;
    }
    
    return convertNodeId(nodeId);
  } catch (error) {
    console.error('Erro ao extrair Node ID da URL:', error);
    return null;
  }
}

/**
 * Extrai o File Key de uma URL do Figma
 * 
 * @param url - URL do Figma
 * @returns File Key ou null se não encontrado
 * 
 * @example
 * ```ts
 * const url = 'https://www.figma.com/design/ABC123/File-Name';
 * extractFileKeyFromUrl(url) // 'ABC123'
 * ```
 */
export function extractFileKeyFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    
    // URL format: /design/{fileKey}/{fileName} ou /file/{fileKey}/{fileName}
    const fileKeyIndex = pathParts.findIndex(
      part => part === 'design' || part === 'file'
    );
    
    if (fileKeyIndex !== -1 && pathParts[fileKeyIndex + 1]) {
      return pathParts[fileKeyIndex + 1];
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao extrair File Key da URL:', error);
    return null;
  }
}

/**
 * Valida se um Node ID está no formato correto
 * 
 * @param nodeId - Node ID para validar
 * @returns true se o formato é válido
 * 
 * @example
 * ```ts
 * isValidNodeId('3211:1217') // true
 * isValidNodeId('3211-1217') // true
 * isValidNodeId('invalid') // false
 * ```
 */
export function isValidNodeId(nodeId: string): boolean {
  // Aceita tanto formato de URL (3211-1217) quanto de API (3211:1217)
  return /^\d+[-:]\d+$/.test(nodeId);
}

/**
 * Gera a URL do Figma para um nó específico
 * 
 * @param fileKey - File Key do arquivo Figma
 * @param nodeId - Node ID (em qualquer formato)
 * @param fileName - Nome do arquivo (opcional)
 * @returns URL completa do Figma
 * 
 * @example
 * ```ts
 * generateFigmaUrl('ABC123', '3211:1217', 'My-File')
 * // 'https://www.figma.com/design/ABC123/My-File?node-id=3211-1217'
 * ```
 */
export function generateFigmaUrl(
  fileKey: string,
  nodeId: string,
  fileName?: string
): string {
  const urlNodeId = nodeId.replace(/:/g, '-');
  const fileNamePart = fileName ? `/${fileName}` : '';
  
  return `https://www.figma.com/design/${fileKey}${fileNamePart}?node-id=${urlNodeId}`;
}

/**
 * Tipo de retorno para parseamento de URL do Figma
 */
export interface FigmaUrlParts {
  fileKey: string | null;
  nodeId: string | null;
  fileName: string | null;
  isValid: boolean;
}

/**
 * Faz o parsing completo de uma URL do Figma
 * 
 * @param url - URL do Figma
 * @returns Objeto com todas as partes extraídas
 * 
 * @example
 * ```ts
 * const parts = parseFigmaUrl('https://www.figma.com/design/ABC123/File?node-id=3211-1217');
 * // {
 * //   fileKey: 'ABC123',
 * //   nodeId: '3211:1217',
 * //   fileName: 'File',
 * //   isValid: true
 * // }
 * ```
 */
export function parseFigmaUrl(url: string): FigmaUrlParts {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    
    // Encontrar o tipo (design ou file)
    const typeIndex = pathParts.findIndex(
      part => part === 'design' || part === 'file'
    );
    
    const fileKey = typeIndex !== -1 ? pathParts[typeIndex + 1] || null : null;
    const fileName = typeIndex !== -1 ? pathParts[typeIndex + 2] || null : null;
    const nodeIdParam = urlObj.searchParams.get('node-id');
    const nodeId = nodeIdParam ? convertNodeId(nodeIdParam) : null;
    
    return {
      fileKey,
      nodeId,
      fileName,
      isValid: !!(fileKey && nodeId),
    };
  } catch (error) {
    console.error('Erro ao fazer parsing da URL do Figma:', error);
    return {
      fileKey: null,
      nodeId: null,
      fileName: null,
      isValid: false,
    };
  }
}

/**
 * Formata um RGB do Figma (0-1) para hex
 * 
 * @param r - Red (0-1)
 * @param g - Green (0-1)
 * @param b - Blue (0-1)
 * @returns Cor em formato hex (#RRGGBB)
 * 
 * @example
 * ```ts
 * rgbToHex(0.89, 0.86, 0.84) // '#e3dcd6'
 * ```
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16).padStart(2, '0');
    return hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Formata um RGBA do Figma (0-1) para rgba CSS
 * 
 * @param r - Red (0-1)
 * @param g - Green (0-1)
 * @param b - Blue (0-1)
 * @param a - Alpha (0-1)
 * @returns Cor em formato rgba CSS
 * 
 * @example
 * ```ts
 * rgbaToCSS(0.89, 0.86, 0.84, 0.5) // 'rgba(227, 220, 214, 0.5)'
 * ```
 */
export function rgbaToCSS(r: number, g: number, b: number, a: number): string {
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
}

