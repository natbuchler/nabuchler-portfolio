import { NextRequest, NextResponse } from 'next/server';
import { getFigmaAPI } from '@/lib/figma-api';

// Serviço simplificado para obter dados do Figma via REST API
// Cache implementado automaticamente no getFigmaAPI()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, nodeId, clientLanguages, clientFrameworks } = body;

    console.log(`🎨 Figma API: ${action}`, { nodeId });

    const figmaAPI = getFigmaAPI();

    switch (action) {
      case 'get_metadata':
        try {
          const metadata = await figmaAPI.getNodeMetadata(nodeId || '3211:1217');
          return NextResponse.json({
            ...metadata,
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error('Erro ao obter metadados:', error);
          return NextResponse.json(
            { 
              error: 'Erro ao obter metadados do Figma', 
              details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
          );
        }

      case 'get_code':
        try {
          const codeData = await figmaAPI.generateCode(nodeId || '3211:1217');
          return NextResponse.json({
            ...codeData,
            nodeId: nodeId || '3211:1217',
            framework: clientFrameworks || 'react',
            language: clientLanguages || 'typescript',
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error('Erro ao gerar código:', error);
          return NextResponse.json(
            { 
              error: 'Erro ao gerar código do Figma', 
              details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
          );
        }

      case 'get_screenshot':
        try {
          const screenshot = await figmaAPI.getNodeScreenshot(
            nodeId || '3211:1217',
            { scale: 2, format: 'png' }
          );
          return NextResponse.json({
            ...screenshot,
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error('Erro ao capturar screenshot:', error);
          return NextResponse.json(
            { 
              error: 'Erro ao capturar screenshot do Figma', 
              details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
          );
        }

      case 'get_variables':
        try {
          const variables = await figmaAPI.getDesignVariables();
          return NextResponse.json({
            ...variables,
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error('Erro ao obter variáveis:', error);
          return NextResponse.json(
            { 
              error: 'Erro ao obter variáveis do Figma', 
              details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
          );
        }

      case 'invalidate_cache':
        try {
          figmaAPI.invalidateCache(nodeId);
          return NextResponse.json({
            success: true,
            message: nodeId 
              ? `Cache invalidado para nodeId: ${nodeId}` 
              : 'Todo o cache foi invalidado',
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error('Erro ao invalidar cache:', error);
          return NextResponse.json(
            { 
              error: 'Erro ao invalidar cache', 
              details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
          );
        }

      case 'cache_stats':
        try {
          const stats = figmaAPI.getCacheStats();
          return NextResponse.json({
            ...stats,
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error('Erro ao obter estatísticas do cache:', error);
          return NextResponse.json(
            { 
              error: 'Erro ao obter estatísticas', 
              details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
          );
        }

      default:
        return NextResponse.json(
          { error: `Ação '${action}' não reconhecida` },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Erro geral na API Figma:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor', 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
