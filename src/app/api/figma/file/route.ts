import { NextRequest, NextResponse } from 'next/server';
import { getFigmaAPI } from '@/lib/figma-api';

export const dynamic = 'force-dynamic';

/**
 * GET /api/figma/file
 * Obtém informações completas do arquivo do Figma
 * 
 * Retorna:
 * - Nome do arquivo
 * - Última modificação
 * - Thumbnail
 * - Estrutura do documento
 * - Componentes
 * - Estilos
 * 
 * Exemplo: /api/figma/file
 */
export async function GET(request: NextRequest) {
  try {
    console.log('📁 Buscando informações do arquivo Figma...');

    const figmaAPI = getFigmaAPI();
    const fileData = await figmaAPI.getFile();

    return NextResponse.json({
      success: true,
      data: {
        name: fileData.name,
        lastModified: fileData.lastModified,
        thumbnailUrl: fileData.thumbnailUrl,
        version: fileData.version,
        componentsCount: Object.keys(fileData.components || {}).length,
        stylesCount: Object.keys(fileData.styles || {}).length,
        // Não retornamos o documento completo por ser muito grande
        // Use os endpoints específicos para obter dados de nós
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Erro ao buscar arquivo:', error);
    
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

