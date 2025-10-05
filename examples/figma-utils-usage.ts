/**
 * Exemplos de uso dos utilitários do Figma
 */

import {
  convertNodeId,
  extractNodeIdFromUrl,
  extractFileKeyFromUrl,
  isValidNodeId,
  generateFigmaUrl,
  parseFigmaUrl,
  rgbToHex,
  rgbaToCSS,
} from '@/lib/figma-utils';

// ============================================================================
// Exemplo 1: Converter Node ID do formato de URL para API
// ============================================================================

const urlNodeId = '3211-1217';
const apiNodeId = convertNodeId(urlNodeId);
console.log(apiNodeId); // '3211:1217'

// ============================================================================
// Exemplo 2: Extrair Node ID de uma URL do Figma
// ============================================================================

const figmaUrl = 'https://www.figma.com/design/KBKaj4z9hPZRv26GbNFSUz/Protfolio-2025?node-id=3211-1217&t=pssxONINarSbjwwx-4';
const nodeId = extractNodeIdFromUrl(figmaUrl);
console.log(nodeId); // '3211:1217'

// ============================================================================
// Exemplo 3: Extrair File Key de uma URL do Figma
// ============================================================================

const fileKey = extractFileKeyFromUrl(figmaUrl);
console.log(fileKey); // 'KBKaj4z9hPZRv26GbNFSUz'

// ============================================================================
// Exemplo 4: Validar Node ID
// ============================================================================

console.log(isValidNodeId('3211:1217')); // true
console.log(isValidNodeId('3211-1217')); // true
console.log(isValidNodeId('invalid'));   // false

// ============================================================================
// Exemplo 5: Gerar URL do Figma
// ============================================================================

const generatedUrl = generateFigmaUrl(
  'KBKaj4z9hPZRv26GbNFSUz',
  '3211:1217',
  'Protfolio-2025'
);
console.log(generatedUrl);
// 'https://www.figma.com/design/KBKaj4z9hPZRv26GbNFSUz/Protfolio-2025?node-id=3211-1217'

// ============================================================================
// Exemplo 6: Fazer parsing completo de uma URL
// ============================================================================

const parts = parseFigmaUrl(figmaUrl);
console.log(parts);
// {
//   fileKey: 'KBKaj4z9hPZRv26GbNFSUz',
//   nodeId: '3211:1217',
//   fileName: 'Protfolio-2025',
//   isValid: true
// }

// ============================================================================
// Exemplo 7: Converter cores do Figma
// ============================================================================

// Converter RGB do Figma (0-1) para hex
const hexColor = rgbToHex(0.89, 0.86, 0.84);
console.log(hexColor); // '#e3dcd6'

// Converter RGBA do Figma para CSS
const rgbaColor = rgbaToCSS(0.89, 0.86, 0.84, 0.5);
console.log(rgbaColor); // 'rgba(227, 220, 214, 0.5)'

// ============================================================================
// Exemplo 8: Usar em um componente React
// ============================================================================

// Exemplo de componente - comentado para evitar erros de build
// export async function FigmaNodeFromUrl({ url }: { url: string }) {
//   const parts = parseFigmaUrl(url);
//
//   if (!parts.isValid || !parts.nodeId) {
//     return <div>URL inválida do Figma</div>;
//   }
//
//   try {
//     const response = await fetch(`/api/figma/metadata?nodeId=${parts.nodeId}`);
//     const data = await response.json();
//
//     if (data.success) {
//       return (
//         <div>
//           <h2>{data.data.name}</h2>
//           <p>Tipo: {data.data.type}</p>
//           <p>Dimensões: {data.data.width}x{data.data.height}</p>
//           <a href={generateFigmaUrl(parts.fileKey!, parts.nodeId)} target="_blank">
//             Ver no Figma
//           </a>
//         </div>
//       );
//     }
//   } catch (error) {
//     return <div>Erro ao carregar dados do Figma</div>;
//   }
//
//   return null;
// }

// ============================================================================
// Exemplo 9: Hook customizado com conversão automática
// ============================================================================

/*
import { useState, useEffect } from 'react';

export function useFigmaNode(urlOrNodeId: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        // Detectar se é uma URL ou um Node ID
        let nodeId: string | null = urlOrNodeId;
        
        if (urlOrNodeId.startsWith('http')) {
          // É uma URL, extrair o Node ID
          nodeId = extractNodeIdFromUrl(urlOrNodeId);
          
          if (!nodeId) {
            throw new Error('Não foi possível extrair Node ID da URL');
          }
        } else {
          // É um Node ID, converter para formato da API
          nodeId = convertNodeId(urlOrNodeId);
        }
        
        const response = await fetch(`/api/figma/metadata?nodeId=${nodeId}`);
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [urlOrNodeId]);
  
  return { data, loading, error };
}

// ============================================================================
// Exemplo 10: Processar fills do Figma
// ============================================================================

export function processFigmaFills(fills: any[]) {
  if (!fills || fills.length === 0) {
    return null;
  }
  
  return fills.map(fill => {
    if (fill.type === 'SOLID' && fill.color) {
      const { r, g, b, a = 1 } = fill.color;
      
      return {
        type: 'solid',
        hex: rgbToHex(r, g, b),
        rgba: rgbaToCSS(r, g, b, a),
        opacity: a,
      };
    }
    
    return {
      type: fill.type.toLowerCase(),
      ...fill,
    };
  });
}

// ============================================================================
// Exemplo 11: Buscar múltiplos nós de uma vez
// ============================================================================

export async function fetchMultipleNodes(urls: string[]) {
  // Extrair Node IDs de todas as URLs
  const nodeIds = urls
    .map(url => extractNodeIdFromUrl(url))
    .filter((id): id is string => id !== null);
  
  if (nodeIds.length === 0) {
    throw new Error('Nenhum Node ID válido encontrado nas URLs');
  }
  
  // Fazer requisição batch
  const response = await fetch('/api/figma/metadata', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodeIds }),
  });
  
  const result = await response.json();
  
  if (result.success) {
    return result.data;
  }
  
  throw new Error('Erro ao buscar múltiplos nós');
}

// ============================================================================
// Exemplo 12: Validar e preparar dados antes de enviar para API
// ============================================================================

export function prepareFigmaRequest(input: string | string[]) {
  const inputs = Array.isArray(input) ? input : [input];
  const nodeIds: string[] = [];
  
  for (const item of inputs) {
    if (item.startsWith('http')) {
      // É uma URL
      const nodeId = extractNodeIdFromUrl(item);
      if (nodeId) {
        nodeIds.push(nodeId);
      }
    } else if (isValidNodeId(item)) {
      // É um Node ID
      nodeIds.push(convertNodeId(item));
    } else {
      console.warn(`Item inválido ignorado: ${item}`);
    }
  }
  
  return nodeIds;
}

// Uso:
// const nodeIds = prepareFigmaRequest([
//   'https://www.figma.com/design/ABC/File?node-id=123-456',
//   '789-012',
//   '345:678',
//   'invalid-input', // será ignorado
// ]);
// console.log(nodeIds); // ['123:456', '789:012', '345:678']
*/
