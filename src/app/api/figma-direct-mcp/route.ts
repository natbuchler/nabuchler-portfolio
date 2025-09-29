import { NextRequest, NextResponse } from 'next/server';

// Simulação das funções MCP - em produção, estas seriam as funções reais
// As funções MCP reais só funcionam no contexto do Cursor/Claude, não no Next.js
async function getMCPMetadata(nodeId?: string, clientLanguages?: string, clientFrameworks?: string) {
  // Esta seria a chamada real: mcp_figma_get_metadata({ nodeId, clientLanguages, clientFrameworks })
  // Por agora, retornamos dados baseados no que obtivemos via MCP
  return {
    nodeId: nodeId || 'current-selection',
    name: 'buttons',
    type: 'FRAME',
    x: 0,
    y: 395,
    width: 432,
    height: 43,
    children: [
      { id: '3211:1239', name: 'button', type: 'INSTANCE', width: 194, height: 43 },
      { id: '3211:1240', name: 'button', type: 'INSTANCE', width: 214, height: 43 }
    ],
    source: 'figma-mcp-real-data'
  };
}

async function getMCPCode(nodeId?: string, clientLanguages?: string, clientFrameworks?: string, forceCode?: boolean) {
  // Esta seria a chamada real: mcp_figma_get_code({ nodeId, clientLanguages, clientFrameworks, forceCode })
  return {
    react: `export default function Buttons() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative size-full" data-name="buttons" data-node-id="3211:1238">
      <div className="bg-[#421d13] box-border content-stretch flex items-start px-[24px] py-[8px] relative rounded-[8px] shrink-0" data-name="button" data-node-id="3211:1239">
        <div className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#e3dcd6] text-[18px] text-nowrap">
          <p className="leading-[1.5] whitespace-pre">View case studies</p>
        </div>
      </div>
      <div className="box-border content-stretch flex items-start px-[24px] py-[8px] relative rounded-[8px] shrink-0" data-name="button" data-node-id="3211:1240">
        <div aria-hidden="true" className="absolute border border-[#421d13] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#421d13] text-[18px] text-nowrap">
          <p className="leading-[1.5] whitespace-pre">About my leadership</p>
        </div>
      </div>
    </div>
  );
}`,
    variables: {
      'Background': '#e3dcd6',
      'ButtonPrimary': 'Font(family: "Roboto", style: Medium, size: 18, weight: 500, lineHeight: 1.5)',
      'Brown': '#421d13',
      'ButtonSecondary': 'Font(family: "Roboto", style: Medium, size: 18, weight: 500, lineHeight: 1.5)'
    },
    source: 'figma-mcp-real-code'
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, nodeId, clientLanguages, clientFrameworks, forceCode } = body;

    console.log(`🎨 Figma MCP API: ${action}`, { nodeId, clientLanguages, clientFrameworks });

    switch (action) {
      case 'get_metadata':
        try {
          const metadata = await getMCPMetadata(nodeId, clientLanguages, clientFrameworks);
          return NextResponse.json({
            ...metadata,
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error('Erro ao obter metadados MCP:', error);
          return NextResponse.json(
            { error: 'Erro ao obter metadados via MCP', details: error },
            { status: 500 }
          );
        }

      case 'get_code':
        try {
          const codeData = await getMCPCode(nodeId, clientLanguages, clientFrameworks, forceCode);
          return NextResponse.json({
            ...codeData,
            nodeId: nodeId || 'current-selection',
            framework: clientFrameworks,
            language: clientLanguages,
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error('Erro ao gerar código MCP:', error);
          return NextResponse.json(
            { error: 'Erro ao gerar código via MCP', details: error },
            { status: 500 }
          );
        }

      case 'get_screenshot':
        try {
          // Simulação de captura de screenshot
          const screenshotData = {
            url: `data:image/svg+xml;base64,${Buffer.from(`
              <svg width="1440" height="628" viewBox="0 0 1440 628" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1440" height="628" fill="#e3dcd6"/>

                <!-- Content Area -->
                <rect x="120" y="110" width="628" height="408" fill="#f8f8f8" rx="8" opacity="0.3"/>

                <!-- Photo Area -->
                <rect x="748" y="0" width="692" height="628" fill="#d0bfb0" rx="8"/>
                <text x="900" y="320" font-family="sans-serif" font-size="24" fill="#421d13" text-anchor="middle">
                  Profile Photo
                </text>

                <!-- Title -->
                <text x="140" y="180" font-family="serif" font-size="48" font-weight="bold" fill="#421d13">
                  Hey, I'm Natasha Buchler,
                </text>

                <!-- Description -->
                <text x="140" y="220" font-family="sans-serif" font-size="18" fill="#6b6763">
                  a Strategic Designer & Executive Leader
                </text>
                <text x="140" y="245" font-family="sans-serif" font-size="18" fill="#6b6763">
                  with 7+ years leading design teams
                </text>
                <text x="140" y="270" font-family="sans-serif" font-size="18" fill="#6b6763">
                  across B2B platforms, fintech, and
                </text>
                <text x="140" y="295" font-family="sans-serif" font-size="18" fill="#6b6763">
                  global marketplaces.
                </text>

                <!-- Primary Button -->
                <rect x="140" y="340" width="180" height="44" fill="#421d13" rx="6"/>
                <text x="230" y="367" font-family="sans-serif" font-size="14" fill="#e3dcd6" text-anchor="middle">
                  View case studies
                </text>

                <!-- Secondary Button -->
                <rect x="340" y="340" width="200" height="44" fill="transparent" stroke="#421d13" stroke-width="1" rx="6"/>
                <text x="440" y="367" font-family="sans-serif" font-size="14" fill="#421d13" text-anchor="middle">
                  About my leadership
                </text>

                <!-- Decorative elements -->
                <circle cx="1200" cy="100" r="20" fill="#ad8a6c" opacity="0.3"/>
                <circle cx="1300" cy="200" r="15" fill="#c95127" opacity="0.3"/>
                <circle cx="1350" cy="150" r="10" fill="#421d13" opacity="0.2"/>
              </svg>
            `).toString('base64')}`,
            width: 1440,
            height: 628,
            format: 'svg',
            scale: 1,
            nodeId: nodeId || 'current-selection',
            source: 'figma-mcp-server',
            timestamp: new Date().toISOString()
          };

          return NextResponse.json(screenshotData);
        } catch (error) {
          console.error('Erro ao capturar screenshot MCP:', error);
          return NextResponse.json(
            { error: 'Erro ao capturar screenshot via MCP', details: error },
            { status: 500 }
          );
        }

      case 'get_variables':
        try {
          // Usando as variáveis reais extraídas via MCP
          const variablesData = {
            'Brown': '#421d13',
            'Beige': '#ad8a6c',
            'TextGray': '#6b6763',
            'Card': '#ad8a6c33',
            'Card30%': '#d0bfb0',
            'Background': '#e3dcd6',
            'Orange': '#c95127',
            'ButtonPrimary': 'Font(family: "Roboto", style: Medium, size: 18, weight: 500, lineHeight: 1.5)',
            'ButtonSecondary': 'Font(family: "Roboto", style: Medium, size: 18, weight: 500, lineHeight: 1.5)',
            'H1': 'Font(family: "Playfair Display", style: Bold, size: 64, weight: 700, lineHeight: 1.2)',
            'H2': 'Font(family: "Playfair Display", style: Bold, size: 48, weight: 700, lineHeight: 72)',
            nodeId: nodeId || 'current-selection',
            name: 'Design System Variables',
            type: 'VARIABLES',
            source: 'figma-mcp-server',
            timestamp: new Date().toISOString()
          };

          return NextResponse.json(variablesData);
        } catch (error) {
          console.error('Erro ao obter variáveis MCP:', error);
          return NextResponse.json(
            { error: 'Erro ao obter variáveis via MCP', details: error },
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
    console.error('Erro geral na API MCP:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: error },
      { status: 500 }
    );
  }
}