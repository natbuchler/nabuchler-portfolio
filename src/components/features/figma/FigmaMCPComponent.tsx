'use client';

import { useState, useEffect } from 'react';
import FigmaRealMCP from './FigmaRealMCP';
import FigmaDirectMCP from './FigmaDirectMCP';

interface FigmaMCPComponentProps {
  nodeId?: string;
}

interface MCPData {
  metadata?: any;
  code?: any;
  screenshot?: any;
  variables?: any;
  codeConnect?: any;
}

export default function FigmaMCPComponent({ nodeId }: FigmaMCPComponentProps) {
  const [mcpMode, setMcpMode] = useState<'auto' | 'direct' | 'api' | 'demo'>('auto');
  const [mcpData, setMcpData] = useState<MCPData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'metadata' | 'code' | 'screenshot' | 'variables'>('metadata');

  // Função para obter metadados via MCP usando FigmaService
  const getMCPMetadata = async (nodeId?: string) => {
    try {
      setLoading(true);
      setError(null);

      // Usando o FigmaService para chamar getMCPMetadata
      const { FigmaService } = await import('@/lib/figma-service');
      const figmaService = new FigmaService();

      console.log('Obtendo metadados MCP via FigmaService para nodeId:', nodeId);

      const metadata = await figmaService.getMCPMetadata(nodeId);

      setMcpData(prev => ({ ...prev, metadata }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao obter metadados');
    } finally {
      setLoading(false);
    }
  };

  // Função para obter código via MCP
  const getMCPCode = async (nodeId?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Obtendo código MCP para nodeId:', nodeId);
      
      // Simulando código gerado
      const mockCode = {
        html: `<div className="hero-section">
  <div className="content">
    <h1>Product Designer</h1>
    <p>Creating digital experiences that matter</p>
    <div className="buttons">
      <button>Contact me</button>
      <button>Download CV</button>
    </div>
  </div>
  <div className="photo">
    <img src="/photo.png" alt="Profile" />
  </div>
</div>`,
        css: `.hero-section {
  display: flex;
  width: 1320px;
  height: 628px;
  padding: 110px 0;
  gap: 20px;
}

.content {
  width: 628px;
}

.photo {
  width: 692px;
  height: 628px;
  border-radius: 8px;
  overflow: hidden;
}`
      };
      
      setMcpData(prev => ({ ...prev, code: mockCode }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao obter código');
    } finally {
      setLoading(false);
    }
  };

  // Função para obter screenshot via MCP
  const getMCPScreenshot = async (nodeId?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Obtendo screenshot MCP para nodeId:', nodeId);
      
      // Simulando URL do screenshot
      const mockScreenshot = {
        url: '/api/figma-screenshot.png',
        width: 1440,
        height: 628,
        format: 'png',
        scale: 2
      };
      
      setMcpData(prev => ({ ...prev, screenshot: mockScreenshot }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao obter screenshot');
    } finally {
      setLoading(false);
    }
  };

  // Função para obter variáveis via MCP
  const getMCPVariables = async (nodeId?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Obtendo variáveis MCP para nodeId:', nodeId);
      
      // Simulando variáveis de design
      const mockVariables = {
        'color/primary': '#2563EB',
        'color/secondary': '#64748B',
        'spacing/base': '16px',
        'typography/heading': 'Inter, sans-serif',
        'border-radius/base': '8px'
      };
      
      setMcpData(prev => ({ ...prev, variables: mockVariables }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao obter variáveis');
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    getMCPMetadata(nodeId);
  }, [nodeId]);

  const renderMetadata = () => {
    if (!mcpData.metadata) return <p className="text-gray-500">Nenhum metadado disponível</p>;
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Node ID:</strong>
            <code className="block bg-gray-100 p-2 rounded text-sm mt-1">
              {mcpData.metadata.nodeId}
            </code>
          </div>
          <div>
            <strong>Tipo:</strong>
            <span className="block mt-1">{mcpData.metadata.type}</span>
          </div>
          <div>
            <strong>Nome:</strong>
            <span className="block mt-1">{mcpData.metadata.name}</span>
          </div>
          <div>
            <strong>Dimensões:</strong>
            <span className="block mt-1">
              {mcpData.metadata.dimensions?.width} × {mcpData.metadata.dimensions?.height}
            </span>
          </div>
        </div>
        
        {mcpData.metadata.children && (
          <div>
            <strong>Filhos ({mcpData.metadata.children.length}):</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {mcpData.metadata.children.map((childId: string) => (
                <code key={childId} className="bg-blue-100 px-2 py-1 rounded text-xs">
                  {childId}
                </code>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCode = () => {
    if (!mcpData.code) {
      return (
        <div className="text-center py-8">
          <button
            onClick={() => getMCPCode(nodeId)}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
          >
            {loading ? 'Gerando...' : 'Gerar Código'}
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">HTML/JSX:</h4>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            <code>{mcpData.code.html}</code>
          </pre>
        </div>
        <div>
          <h4 className="font-semibold mb-2">CSS:</h4>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            <code>{mcpData.code.css}</code>
          </pre>
        </div>
      </div>
    );
  };

  const renderScreenshot = () => {
    if (!mcpData.screenshot) {
      return (
        <div className="text-center py-8">
          <button
            onClick={() => getMCPScreenshot(nodeId)}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
          >
            {loading ? 'Capturando...' : 'Capturar Screenshot'}
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Dimensões: {mcpData.screenshot.width} × {mcpData.screenshot.height} ({mcpData.screenshot.format.toUpperCase()})
        </div>
        <div className="border rounded-lg overflow-hidden">
          <img 
            src={mcpData.screenshot.url} 
            alt="Figma Screenshot"
            className="w-full h-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-screenshot.png';
            }}
          />
        </div>
      </div>
    );
  };

  const renderVariables = () => {
    if (!mcpData.variables) {
      return (
        <div className="text-center py-8">
          <button
            onClick={() => getMCPVariables(nodeId)}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
          >
            {loading ? 'Carregando...' : 'Carregar Variáveis'}
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {Object.entries(mcpData.variables).map(([name, value]) => (
          <div key={name} className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="font-mono text-sm">{name}</span>
            <div className="flex items-center gap-2">
              {name.includes('color') && (
                <div 
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: value as string }}
                />
              )}
              <code className="bg-white px-2 py-1 rounded text-sm">{value as string}</code>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Renderizar baseado no modo selecionado
  if (mcpMode === 'auto') {
    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">🔄 Figma Auto-Sync MCP ✨</h1>
            <p className="text-gray-600">Sincronização automática em tempo real</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMcpMode('direct')}
              className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              Manual
            </button>
            <button
              onClick={() => setMcpMode('api')}
              className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              API Mode
            </button>
            <button
              onClick={() => setMcpMode('demo')}
              className="text-sm bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
            >
              Demo
            </button>
          </div>
        </div>
        {/* AutoFigmaSync component removed */}
      </div>
    );
  }

  if (mcpMode === 'direct') {
    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Figma MCP - Conexão Direta ✨</h1>
            <p className="text-gray-600">Usando funções MCP diretas do servidor</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMcpMode('auto')}
              className="text-sm bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
            >
              Auto-Sync ✨
            </button>
            <button
              onClick={() => setMcpMode('api')}
              className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              API Mode
            </button>
            <button
              onClick={() => setMcpMode('demo')}
              className="text-sm bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
            >
              Demo Mode
            </button>
          </div>
        </div>
        <FigmaDirectMCP nodeId={nodeId} />
      </div>
    );
  }

  if (mcpMode === 'api') {
    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Figma MCP - API Routes</h1>
            <p className="text-gray-600">Usando API routes para MCP</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMcpMode('auto')}
              className="text-sm bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
            >
              Auto-Sync ✨
            </button>
            <button
              onClick={() => setMcpMode('direct')}
              className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Direct MCP
            </button>
            <button
              onClick={() => setMcpMode('demo')}
              className="text-sm bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
            >
              Demo Mode
            </button>
          </div>
        </div>
        <FigmaRealMCP nodeId={nodeId} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Figma MCP Integration (Demo)</h1>
            <p className="text-gray-600">
              Demonstração da integração com o Figma via MCP
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMcpMode('auto')}
              className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
            >
              Auto-Sync ✨
            </button>
            <button
              onClick={() => setMcpMode('direct')}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
            >
              Direct MCP
            </button>
            <button
              onClick={() => setMcpMode('api')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              API Mode
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Erro:</strong> {error}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'metadata', label: 'Metadados', icon: '📊' },
            { id: 'code', label: 'Código', icon: '💻' },
            { id: 'screenshot', label: 'Screenshot', icon: '📸' },
            { id: 'variables', label: 'Variáveis', icon: '🎨' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white border rounded-lg p-6 min-h-[400px]">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3">Carregando...</span>
          </div>
        )}

        {!loading && (
          <>
            {activeTab === 'metadata' && renderMetadata()}
            {activeTab === 'code' && renderCode()}
            {activeTab === 'screenshot' && renderScreenshot()}
            {activeTab === 'variables' && renderVariables()}
          </>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => getMCPMetadata(nodeId)}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
        >
          Atualizar Metadados
        </button>
        
        <button
          onClick={() => getMCPCode(nodeId)}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
        >
          Gerar Código
        </button>

        <button
          onClick={() => getMCPScreenshot(nodeId)}
          disabled={loading}
          className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
        >
          Capturar Tela
        </button>
      </div>

      {/* Info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Como usar:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Abra o Figma Desktop e selecione um elemento</li>
          <li>• Use as funções MCP para obter dados em tempo real</li>
          <li>• O nodeId pode ser específico ou usar a seleção atual</li>
          <li>• Os dados são sincronizados automaticamente com o Figma</li>
        </ul>
      </div>
    </div>
  );
}
