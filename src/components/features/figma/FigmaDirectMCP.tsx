'use client';

import { useState } from 'react';

interface FigmaDirectMCPProps {
  nodeId?: string;
}

export default function FigmaDirectMCP({ nodeId }: FigmaDirectMCPProps) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState(nodeId || '');

  // Função para obter metadados usando as funções MCP disponíveis no servidor
  const getMCPMetadata = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Obtendo metadados MCP diretamente...');
      
      // Esta seria a chamada real para o servidor que usa as funções MCP
      const response = await fetch('/api/figma-direct-mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'get_metadata',
          nodeId: selectedNodeId,
          clientLanguages: 'typescript,javascript',
          clientFrameworks: 'react,nextjs'
        })
      });
      
      if (!response.ok) {
        throw new Error('Erro ao obter metadados MCP');
      }
      
      const data = await response.json();
      
      setResults(prev => [{
        type: 'metadata',
        data,
        timestamp: new Date().toISOString()
      }, ...prev.slice(0, 9)]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro MCP:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMCPCode = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('💻 Obtendo código MCP diretamente...');
      
      const response = await fetch('/api/figma-direct-mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'get_code',
          nodeId: selectedNodeId,
          clientLanguages: 'typescript,javascript',
          clientFrameworks: 'react,nextjs',
          forceCode: true
        })
      });
      
      if (!response.ok) {
        throw new Error('Erro ao obter código MCP');
      }
      
      const data = await response.json();
      
      setResults(prev => [{
        type: 'code',
        data,
        timestamp: new Date().toISOString()
      }, ...prev.slice(0, 9)]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro MCP:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMCPScreenshot = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📸 Obtendo screenshot MCP diretamente...');
      
      const response = await fetch('/api/figma-direct-mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'get_screenshot',
          nodeId: selectedNodeId,
          clientLanguages: 'typescript,javascript',
          clientFrameworks: 'react,nextjs'
        })
      });
      
      if (!response.ok) {
        throw new Error('Erro ao obter screenshot MCP');
      }
      
      const data = await response.json();
      
      setResults(prev => [{
        type: 'screenshot',
        data,
        timestamp: new Date().toISOString()
      }, ...prev.slice(0, 9)]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro MCP:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMCPVariables = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🎨 Obtendo variáveis MCP diretamente...');
      
      const response = await fetch('/api/figma-direct-mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'get_variables',
          nodeId: selectedNodeId,
          clientLanguages: 'typescript,javascript',
          clientFrameworks: 'react,nextjs'
        })
      });
      
      if (!response.ok) {
        throw new Error('Erro ao obter variáveis MCP');
      }
      
      const data = await response.json();
      
      setResults(prev => [{
        type: 'variables',
        data,
        timestamp: new Date().toISOString()
      }, ...prev.slice(0, 9)]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro MCP:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  const renderResult = (result: any) => {
    const typeIcons = {
      metadata: '📊',
      code: '💻',
      screenshot: '📸',
      variables: '🎨'
    };

    const typeColors = {
      metadata: 'bg-blue-50 border-blue-200',
      code: 'bg-green-50 border-green-200',
      screenshot: 'bg-purple-50 border-purple-200',
      variables: 'bg-pink-50 border-pink-200'
    };

    return (
      <div
        key={`${result.type}-${result.timestamp}`}
        className={`border rounded-lg p-4 ${typeColors[result.type as keyof typeof typeColors]}`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{typeIcons[result.type as keyof typeof typeIcons]}</span>
            <h4 className="font-semibold capitalize">{result.type}</h4>
          </div>
          <span className="text-xs text-gray-500">
            {new Date(result.timestamp).toLocaleTimeString()}
          </span>
        </div>
        
        <div className="bg-white rounded p-3 max-h-96 overflow-y-auto">
          {result.type === 'screenshot' && result.data.url ? (
            <div className="space-y-3">
              <img 
                src={result.data.url} 
                alt="Figma Screenshot"
                className="max-w-full h-auto border rounded"
              />
              <div className="text-sm text-gray-600">
                <p>Dimensões: {result.data.width} × {result.data.height}</p>
                <p>Formato: {result.data.format}</p>
              </div>
            </div>
          ) : result.type === 'code' ? (
            <div className="space-y-4">
              {result.data.html && (
                <div>
                  <h5 className="font-semibold mb-2">HTML:</h5>
                  <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                    <code>{result.data.html}</code>
                  </pre>
                </div>
              )}
              {result.data.css && (
                <div>
                  <h5 className="font-semibold mb-2">CSS:</h5>
                  <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                    <code>{result.data.css}</code>
                  </pre>
                </div>
              )}
              {result.data.react && (
                <div>
                  <h5 className="font-semibold mb-2">React:</h5>
                  <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                    <code>{result.data.react}</code>
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <pre className="text-sm whitespace-pre-wrap">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">🎨 Figma MCP - Conexão Direta</h1>
        <p className="text-gray-600">
          Integração direta com as funções MCP do Figma no servidor
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Node ID (deixe vazio para usar seleção atual do Figma):
          </label>
          <input
            type="text"
            value={selectedNodeId}
            onChange={(e) => setSelectedNodeId(e.target.value)}
            placeholder="ex: 3211:1217 ou deixe vazio"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            💡 Dica: Selecione um elemento no Figma Desktop e deixe vazio para usar a seleção atual
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={getMCPMetadata}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
          >
            📊 Metadados
          </button>
          
          <button
            onClick={getMCPCode}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
          >
            💻 Código
          </button>

          <button
            onClick={getMCPScreenshot}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
          >
            📸 Screenshot
          </button>

          <button
            onClick={getMCPVariables}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
          >
            🎨 Variáveis
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={clearResults}
            disabled={loading}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            🗑️ Limpar Resultados
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-8 bg-blue-50 rounded-lg mb-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-blue-700 font-medium">Processando via MCP...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <div>
              <strong>Erro:</strong> {error}
              <p className="text-sm mt-1">
                Certifique-se de que o Figma Desktop está aberto e o MCP está configurado.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            📋 Resultados ({results.length})
          </h2>
          {results.length > 0 && (
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Últimos 10 resultados
            </span>
          )}
        </div>
        
        {results.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum resultado ainda</h3>
            <p className="text-gray-500 mb-4">
              Use os botões acima para obter dados do Figma via MCP
            </p>
            <div className="text-sm text-gray-400">
              <p>• Abra o Figma Desktop</p>
              <p>• Selecione um elemento</p>
              <p>• Clique em um dos botões acima</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {results.map((result, index) => renderResult(result))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
        <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
          <span className="text-xl">💡</span>
          Como usar esta integração MCP:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-semibold mb-2">Preparação:</h4>
            <ul className="space-y-1">
              <li>• Abra o Figma Desktop (versão mais recente)</li>
              <li>• Certifique-se de que o MCP está habilitado</li>
              <li>• Abra um arquivo de design</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Uso:</h4>
            <ul className="space-y-1">
              <li>• Selecione um elemento no Figma</li>
              <li>• Clique nos botões para obter dados</li>
              <li>• Os resultados aparecem em tempo real</li>
              <li>• Experimente diferentes elementos!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Status da Conexão MCP:</span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 font-medium">Conectado e Pronto</span>
          </span>
        </div>
      </div>
    </div>
  );
}
