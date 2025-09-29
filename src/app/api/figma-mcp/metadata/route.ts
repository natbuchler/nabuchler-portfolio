import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nodeId, clientLanguages, clientFrameworks } = body;

    // Simulação da chamada MCP real
    // Em produção, isso usaria as funções MCP do Figma
    const mockResponse = {
      nodeId: nodeId || 'current-selection',
      type: 'FRAME',
      name: 'Hero Section',
      width: 1440,
      height: 628,
      x: -6017,
      y: -3096,
      children: [
        { id: '3211:1234', name: 'content', type: 'FRAME' },
        { id: '3294:208', name: 'photo', type: 'ROUNDED_RECTANGLE' },
        { id: '3281:5317', name: 'header', type: 'INSTANCE' }
      ],
      fills: [
        {
          type: 'SOLID',
          color: { r: 0.89, g: 0.86, b: 0.84, a: 1 }
        }
      ],
      timestamp: new Date().toISOString(),
      source: 'figma-mcp'
    };

    return NextResponse.json(mockResponse);

  } catch (error) {
    console.error('Erro na API MCP metadata:', error);
    return NextResponse.json(
      { error: 'Erro ao obter metadados do Figma' },
      { status: 500 }
    );
  }
}
