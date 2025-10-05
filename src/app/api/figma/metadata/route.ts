import { NextRequest, NextResponse } from 'next/server';
import { getFigmaAPI } from '@/lib/figma-api';

export const dynamic = 'force-dynamic';

/**
 * GET /api/figma/metadata
 * Obtém metadados de um nó do Figma
 * 
 * Query params:
 * - nodeId: ID do nó no Figma (obrigatório)
 * 
 * Exemplo: /api/figma/metadata?nodeId=123:456
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const nodeId = searchParams.get('nodeId');

    if (!nodeId) {
      return NextResponse.json(
        { error: 'nodeId é obrigatório' },
        { status: 400 }
      );
    }

    console.log('📊 Buscando metadados do nó:', nodeId);

    const figmaAPI = getFigmaAPI();
    const metadata = await figmaAPI.getNodeMetadata(nodeId);

    return NextResponse.json({
      success: true,
      data: metadata,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Erro ao buscar metadados:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/figma/metadata
 * Busca metadados de múltiplos nós de uma vez
 * 
 * Body:
 * {
 *   "nodeIds": ["123:456", "789:012"]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nodeIds } = body;

    if (!nodeIds || !Array.isArray(nodeIds) || nodeIds.length === 0) {
      return NextResponse.json(
        { error: 'nodeIds deve ser um array não vazio' },
        { status: 400 }
      );
    }

    console.log('📊 Buscando metadados de múltiplos nós:', nodeIds.length);

    const figmaAPI = getFigmaAPI();
    const results = await Promise.all(
      nodeIds.map(async (nodeId) => {
        try {
          const metadata = await figmaAPI.getNodeMetadata(nodeId);
          return { nodeId, success: true, data: metadata };
        } catch (error) {
          return {
            nodeId,
            success: false,
            error: error instanceof Error ? error.message : 'Erro desconhecido'
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Erro ao buscar múltiplos metadados:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

