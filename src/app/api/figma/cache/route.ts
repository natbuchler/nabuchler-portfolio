import { NextRequest, NextResponse } from 'next/server';
import { getFigmaAPI } from '@/lib/figma-api';

export const dynamic = 'force-dynamic';

/**
 * GET /api/figma/cache
 * Obtém estatísticas do cache do Figma
 * 
 * Exemplo: /api/figma/cache
 */
export async function GET(request: NextRequest) {
  try {
    console.log('📊 Buscando estatísticas do cache...');

    const figmaAPI = getFigmaAPI();
    const stats = figmaAPI.getCacheStats();

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas:', error);
    
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
 * DELETE /api/figma/cache
 * Invalida o cache do Figma
 * 
 * Query params (opcional):
 * - nodeId: ID específico do nó para invalidar (se omitido, invalida todo o cache)
 * 
 * Exemplo: 
 * - DELETE /api/figma/cache (invalida todo o cache)
 * - DELETE /api/figma/cache?nodeId=123:456 (invalida cache de um nó específico)
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const nodeId = searchParams.get('nodeId');

    const figmaAPI = getFigmaAPI();
    
    if (nodeId) {
      console.log('🗑️  Invalidando cache do nó:', nodeId);
      figmaAPI.invalidateCache(nodeId);
    } else {
      console.log('🗑️  Invalidando todo o cache do Figma');
      figmaAPI.invalidateCache();
    }

    const stats = figmaAPI.getCacheStats();

    return NextResponse.json({
      success: true,
      message: nodeId 
        ? `Cache invalidado para o nó: ${nodeId}` 
        : 'Todo o cache do Figma foi invalidado',
      data: stats,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Erro ao invalidar cache:', error);
    
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

