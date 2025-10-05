'use client';

import { useState } from 'react';

interface FigmaRealMCPProps {
  nodeId?: string;
}

interface MCPResult {
  type: 'metadata' | 'code' | 'screenshot' | 'variables' | 'codeConnect';
  data: any;
  timestamp: string;
}

export default function FigmaRealMCP({ nodeId }: FigmaRealMCPProps) {
  const [results, setResults] = useState<MCPResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState(nodeId || '');

  // Função para obter metadados usando MCP real
  const getMCPMetadata = async (customNodeId?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Obtendo metadados MCP...');
      
      // Aqui usaríamos a função MCP real, mas como estamos no cliente,
      // isso seria feito via API route ou server action
      const response = await fetch('/api/figma-mcp/metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nodeId: customNodeId || selectedNodeId,
          clientLanguages: 'typescript,javascript',
          clientFrameworks: 'react,nextjs'
        })
      });
      
      if (!response.ok) {
        throw new Error('Erro ao obter metadados');
      }
      
      const data = await response.json();
      
      const result: MCPResult = {
        type: 'metadata',
        data,
        timestamp: new Date().toISOString()
      };
      
      setResults(prev => [result, ...prev.slice(0, 9)]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  // Função para obter código usando MCP real
  const getMCPCode = async (customNodeId?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('💻 Obtendo código MCP...');
      
      const response = await fetch('/api/figma-mcp/code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nodeId: customNodeId || selectedNodeId,
          clientLanguages: 'typescript,javascript',
          clientFrameworks: 'react,nextjs',
          forceCode: true
        })
      });
      
      if (!response.ok) {
        throw new Error('Erro ao obter código');
      }
      
      const data = await response.json();
      
      const result: MCPResult = {
        type: 'code',
        data,
        timestamp: new Date().toISOString()
      };
      
      setResults(prev => [result, ...prev.slice(0, 9)]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  // Função para obter screenshot usando MCP real
  const getMCPScreenshot = async (customNodeId?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📸 Obtendo screenshot MCP...');
      
      const response = await fetch('/api/figma-mcp/screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nodeId: customNodeId || selectedNodeId,
          clientLanguages: 'typescript,javascript',
          clientFrameworks: 'react,nextjs'
        })
      });
      
      if (!response.ok) {
        throw new Error('Erro ao obter screenshot');
      }
      
      const data = await response.json();
      
      const result: MCPResult = {
        type: 'screenshot',
        data,
        timestamp: new Date().toISOString()
      };
      
      setResults(prev => [result, ...prev.slice(0, 9)]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  // Função para obter variáveis usando MCP real
  const getMCPVariables = async (customNodeId?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🎨 Obtendo variáveis MCP...');
      
      const response = await fetch('/api/figma-mcp/variables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nodeId: customNodeId || selectedNodeId,
          clientLanguages: 'typescript,javascript',
          clientFrameworks: 'react,nextjs'
        })
      });
      
      if (!response.ok) {
        throw new Error('Erro ao obter variáveis');
      }
      
      const data = await response.json();
      
      const result: MCPResult = {
        type: 'variables',
        data,
        timestamp: new Date().toISOString()
      };
      
      setResults(prev => [result, ...prev.slice(0, 9)]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  const renderResult = (result: MCPResult) => {
    const typeIcons = {
      metadata: '📊',
      code: '💻',
      screenshot: '📸',
      variables: '🎨',
      codeConnect: '🔗'
    };

    const typeColors = {
      metadata: 'bg-blue-50 border-blue-200',
      code: 'bg-green-50 border-green-200',
      screenshot: 'bg-purple-50 border-purple-200',
      variables: 'bg-pink-50 border-pink-200',
      codeConnect: 'bg-yellow-50 border-yellow-200'
    };

    return (
      <div
        key={`${result.type}-${result.timestamp}`}
        className={`border rounded-lg p-4 ${typeColors[result.type]}`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{typeIcons[result.type]}</span>
            <h4 className="font-semibold capitalize">{result.type}</h4>
          </div>
          <span className="text-xs text-gray-500">
            {new Date(result.timestamp).toLocaleTimeString()}
          </span>
        </div>
        
        <div className="bg-white rounded p-3 max-h-60 overflow-y-auto">
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Figma MCP - Conexão Real</h1>
        <p className="text-gray-600">
          Integração direta com o Figma usando Model Context Protocol
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Node ID (deixe vazio para usar seleção atual):
          </label>
          <input
            type="text"
            value={selectedNodeId}
            onChange={(e) => setSelectedNodeId(e.target.value)}
            placeholder="ex: 3211:1217"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => getMCPMetadata()}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            📊 Metadados
          </button>
          
          <button
            onClick={() => getMCPCode()}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            💻 Código
          </button>

          <button
            onClick={() => getMCPScreenshot()}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            📸 Screenshot
          </button>

          <button
            onClick={() => getMCPVariables()}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            🎨 Variáveis
          </button>

          <button
            onClick={clearResults}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            🗑️ Limpar
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3">Processando...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Erro:</strong> {error}
        </div>
      )}

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Resultados ({results.length})
          </h2>
          {results.length > 0 && (
            <span className="text-sm text-gray-500">
              Últimos 10 resultados
            </span>
          )}
        </div>
        
        {results.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhum resultado ainda.</p>
            <p className="text-sm mt-2">
              Use os botões acima para obter dados do Figma via MCP.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result, index) => renderResult(result))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Como usar:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Certifique-se de que o Figma Desktop está aberto</li>
          <li>• Selecione um elemento no Figma ou especifique um Node ID</li>
          <li>• Clique nos botões para obter diferentes tipos de dados</li>
          <li>• Os resultados aparecerão em tempo real abaixo</li>
        </ul>
      </div>

      {/* Status */}
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span>Status MCP:</span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Conectado
          </span>
        </div>
      </div>
    </div>
  );
}

