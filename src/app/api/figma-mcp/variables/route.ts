import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nodeId, clientLanguages, clientFrameworks } = body;

    // Simulação da chamada MCP real para variáveis
    const mockVariables = {
      'color/background/primary': '#e3dcd6',
      'color/background/secondary': '#d9ccc1',
      'color/text/primary': '#421d13',
      'color/text/secondary': '#6b6763',
      'color/accent/primary': '#c95127',
      'color/accent/secondary': '#ad8a6c',
      'spacing/xs': '4px',
      'spacing/sm': '8px',
      'spacing/md': '16px',
      'spacing/lg': '24px',
      'spacing/xl': '32px',
      'spacing/2xl': '48px',
      'typography/font-family/heading': 'Playfair Display',
      'typography/font-family/body': 'Roboto Flex',
      'typography/font-family/mono': 'Raleway',
      'typography/font-size/xs': '12px',
      'typography/font-size/sm': '14px',
      'typography/font-size/base': '16px',
      'typography/font-size/lg': '18px',
      'typography/font-size/xl': '24px',
      'typography/font-size/2xl': '32px',
      'typography/font-size/3xl': '48px',
      'border-radius/sm': '4px',
      'border-radius/md': '8px',
      'border-radius/lg': '12px',
      'border-radius/xl': '24px',
      'shadow/sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      'shadow/md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      'shadow/lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      nodeId: nodeId || 'current-selection',
      timestamp: new Date().toISOString(),
      source: 'figma-mcp-variables'
    };

    return NextResponse.json(mockVariables);

  } catch (error) {
    console.error('Erro na API MCP variables:', error);
    return NextResponse.json(
      { error: 'Erro ao obter variáveis do Figma' },
      { status: 500 }
    );
  }
}
