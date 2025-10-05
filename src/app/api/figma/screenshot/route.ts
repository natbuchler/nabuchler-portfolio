import { NextRequest, NextResponse } from 'next/server';
import { getFigmaAPI } from '@/lib/figma-api';

export const dynamic = 'force-dynamic';

/**
 * GET /api/figma/screenshot
 * Obtém screenshot/imagem de um nó do Figma
 * 
 * Query params:
 * - nodeId: ID do nó no Figma (obrigatório)
 * - scale: Escala da imagem (1, 2, 3, 4) - padrão: 2
 * - format: Formato da imagem (png, jpg, svg, pdf) - padrão: png
 * 
 * Exemplo: /api/figma/screenshot?nodeId=123:456&scale=2&format=png
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const nodeId = searchParams.get('nodeId');
    const scale = parseInt(searchParams.get('scale') || '2', 10);
    const format = searchParams.get('format') || 'png';

    if (!nodeId) {
      return NextResponse.json(
        { error: 'nodeId é obrigatório' },
        { status: 400 }
      );
    }

    // Validar formato
    if (!['png', 'jpg', 'svg', 'pdf'].includes(format)) {
      return NextResponse.json(
        { error: 'Formato inválido. Use: png, jpg, svg ou pdf' },
        { status: 400 }
      );
    }

    // Validar escala
    if (![1, 2, 3, 4].includes(scale)) {
      return NextResponse.json(
        { error: 'Escala inválida. Use: 1, 2, 3 ou 4' },
        { status: 400 }
      );
    }

    console.log(`📸 Gerando screenshot do nó: ${nodeId} (${scale}x, ${format})`);

    const figmaAPI = getFigmaAPI();
    const screenshot = await figmaAPI.getNodeScreenshot(nodeId, {
      scale,
      format: format as 'png' | 'jpg' | 'svg' | 'pdf',
    });

    return NextResponse.json({
      success: true,
      data: screenshot,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Erro ao gerar screenshot:', error);
    
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
 * POST /api/figma/screenshot
 * Gera screenshots de múltiplos nós de uma vez
 * 
 * Body:
 * {
 *   "nodeIds": ["123:456", "789:012"],
 *   "scale": 2,
 *   "format": "png"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nodeIds, scale = 2, format = 'png' } = body;

    if (!nodeIds || !Array.isArray(nodeIds) || nodeIds.length === 0) {
      return NextResponse.json(
        { error: 'nodeIds deve ser um array não vazio' },
        { status: 400 }
      );
    }

    // Validar formato
    if (!['png', 'jpg', 'svg', 'pdf'].includes(format)) {
      return NextResponse.json(
        { error: 'Formato inválido. Use: png, jpg, svg ou pdf' },
        { status: 400 }
      );
    }

    console.log(`📸 Gerando screenshots de múltiplos nós: ${nodeIds.length}`);

    const figmaAPI = getFigmaAPI();
    const results = await Promise.all(
      nodeIds.map(async (nodeId) => {
        try {
          const screenshot = await figmaAPI.getNodeScreenshot(nodeId, {
            scale,
            format: format as 'png' | 'jpg' | 'svg' | 'pdf',
          });
          return { nodeId, success: true, data: screenshot };
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
    console.error('❌ Erro ao gerar múltiplos screenshots:', error);
    
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

