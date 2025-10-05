import { NextRequest, NextResponse } from 'next/server';
import { getFigmaAPI } from '@/lib/figma-api';

export const dynamic = 'force-dynamic';

/**
 * GET /api/figma/variables
 * Obtém variáveis de design (cores, tipografia) do arquivo do Figma
 * 
 * Retorna as variáveis do design system incluindo:
 * - Cores
 * - Tipografia
 * - Estilos
 * 
 * Exemplo: /api/figma/variables
 */
export async function GET(request: NextRequest) {
  try {
    console.log('🎨 Buscando variáveis do design system...');

    const figmaAPI = getFigmaAPI();
    const variables = await figmaAPI.getDesignVariables();

    return NextResponse.json({
      success: true,
      data: variables,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Erro ao buscar variáveis:', error);
    
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

