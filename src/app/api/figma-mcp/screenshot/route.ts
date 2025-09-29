import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nodeId, clientLanguages, clientFrameworks } = body;

    // Simulação da chamada MCP real para screenshot
    const mockScreenshot = {
      url: `data:image/svg+xml;base64,${Buffer.from(`
        <svg width="1440" height="628" viewBox="0 0 1440 628" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="1440" height="628" fill="#e3dcd6"/>
          <rect x="120" y="110" width="628" height="408" fill="#f5f5f5" rx="8" opacity="0.5"/>
          <rect x="628" y="0" width="692" height="628" fill="#d0bfb0" rx="8"/>
          <text x="140" y="160" font-family="serif" font-size="48" font-weight="bold" fill="#421d13">
            Hey, I'm Natasha Buchler,
          </text>
          <text x="140" y="200" font-family="sans-serif" font-size="18" fill="#6b6763">
            a Strategic Designer & Executive Leader
          </text>
          <text x="140" y="220" font-family="sans-serif" font-size="18" fill="#6b6763">
            with 7+ years leading design teams
          </text>
          <rect x="140" y="260" width="180" height="40" fill="#421d13" rx="6"/>
          <text x="150" y="285" font-family="sans-serif" font-size="14" fill="#e3dcd6">
            View case studies
          </text>
          <rect x="340" y="260" width="200" height="40" fill="transparent" stroke="#421d13" stroke-width="1" rx="6"/>
          <text x="350" y="285" font-family="sans-serif" font-size="14" fill="#421d13">
            About my leadership
          </text>
        </svg>
      `).toString('base64')}`,
      width: 1440,
      height: 628,
      format: 'svg',
      scale: 1,
      nodeId: nodeId || 'current-selection',
      timestamp: new Date().toISOString(),
      source: 'figma-mcp-screenshot'
    };

    return NextResponse.json(mockScreenshot);

  } catch (error) {
    console.error('Erro na API MCP screenshot:', error);
    return NextResponse.json(
      { error: 'Erro ao capturar screenshot do Figma' },
      { status: 500 }
    );
  }
}
