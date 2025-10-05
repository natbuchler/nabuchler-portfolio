import { NextRequest, NextResponse } from 'next/server';
import { getFigmaAPI } from '@/lib/figma-api';

export const dynamic = 'force-dynamic';

/**
 * GET /api/figma/code
 * Gera código (React, CSS, HTML) a partir de um nó do Figma
 * 
 * Query params:
 * - nodeId: ID do nó no Figma (obrigatório)
 * 
 * Exemplo: /api/figma/code?nodeId=123:456
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

    console.log('💻 Gerando código para o nó:', nodeId);

    const figmaAPI = getFigmaAPI();
    const code = await figmaAPI.generateCode(nodeId);

    return NextResponse.json({
      success: true,
      data: code,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Erro ao gerar código:', error);
    
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
 * POST /api/figma/code
 * Gera código para múltiplos nós de uma vez
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

    console.log('💻 Gerando código para múltiplos nós:', nodeIds.length);

    const figmaAPI = getFigmaAPI();
    const results = await Promise.all(
      nodeIds.map(async (nodeId) => {
        try {
          const code = await figmaAPI.generateCode(nodeId);
          return { nodeId, success: true, data: code };
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
    console.error('❌ Erro ao gerar múltiplos códigos:', error);
    
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

