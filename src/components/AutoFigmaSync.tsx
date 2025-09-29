'use client';

import { useState, useEffect } from 'react';

interface AutoFigmaSyncProps {
  autoSync?: boolean;
  interval?: number; // em segundos
}

interface FigmaData {
  metadata?: any;
  code?: string;
  variables?: any;
  screenshot?: string;
  timestamp: string;
}

export default function AutoFigmaSync({ autoSync = true, interval = 5 }: AutoFigmaSyncProps) {
  const [figmaData, setFigmaData] = useState<FigmaData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Função para buscar dados automaticamente do Figma
  const fetchFigmaData = async () => {
    try {
      setError(null);
      
      // Simula a chamada das funções MCP reais
      // Em produção, estas seriam chamadas no servidor via API routes
      const response = await fetch('/api/figma-direct-mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'get_metadata',
          clientLanguages: 'typescript,javascript',
          clientFrameworks: 'react,nextjs'
        })
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('API MCP não encontrada. Verifique se a API está configurada.');
        } else if (response.status === 500) {
          throw new Error('Erro do servidor MCP. Verifique se o Figma Desktop está rodando.');
        } else {
          throw new Error('Falha ao conectar com Figma MCP. Certifique-se de que o Figma Desktop está aberto e um elemento está selecionado.');
        }
      }

      const metadata = await response.json();

      // Buscar código se tiver metadados
      const codeResponse = await fetch('/api/figma-direct-mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'get_code',
          clientLanguages: 'typescript,javascript',
          clientFrameworks: 'react,nextjs',
          forceCode: true
        })
      });

      const codeData = await codeResponse.json();

      setFigmaData({
        metadata,
        code: codeData.react,
        variables: codeData.variables,
        timestamp: new Date().toISOString()
      });

      setLastUpdate(new Date().toLocaleTimeString());
      setIsConnected(true);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setIsConnected(false);
    }
  };

  // Auto-sync com interval
  useEffect(() => {
    if (!autoSync) return;

    fetchFigmaData(); // Buscar imediatamente

    const intervalId = setInterval(fetchFigmaData, interval * 1000);

    return () => clearInterval(intervalId);
  }, [autoSync, interval]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">🔄 Auto Figma Sync</h2>
            <p className="text-gray-600">
              Sincronização automática com o Figma via MCP
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              isConnected 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}></div>
              {isConnected ? 'Conectado' : 'Desconectado'}
            </div>
            
            <button
              onClick={fetchFigmaData}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              🔄 Atualizar Agora
            </button>
          </div>
        </div>

        {lastUpdate && (
          <div className="text-sm text-gray-500">
            Última atualização: {lastUpdate}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <div>
              <strong>Erro:</strong> {error}
              <p className="text-sm mt-1">
                Certifique-se de que o Figma Desktop está aberto e um elemento está selecionado.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {figmaData ? (
        <div className="space-y-6">
          {/* Metadados */}
          {figmaData.metadata && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <span className="text-xl">📊</span>
                Elemento Selecionado
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <strong>Nome:</strong>
                  <div className="text-blue-700">{figmaData.metadata.name}</div>
                </div>
                <div>
                  <strong>Tipo:</strong>
                  <div className="text-blue-700">{figmaData.metadata.type}</div>
                </div>
                <div>
                  <strong>Largura:</strong>
                  <div className="text-blue-700">{figmaData.metadata.width}px</div>
                </div>
                <div>
                  <strong>Altura:</strong>
                  <div className="text-blue-700">{figmaData.metadata.height}px</div>
                </div>
              </div>
            </div>
          )}

          {/* Código Gerado */}
          {figmaData.code && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <span className="text-xl">💻</span>
                Código React Gerado Automaticamente
              </h3>
              <div className="bg-white rounded p-4 max-h-60 overflow-y-auto">
                <pre className="text-sm">
                  <code className="text-green-800">{figmaData.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Variáveis */}
          {figmaData.variables && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <span className="text-xl">🎨</span>
                Variáveis de Design
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(figmaData.variables).map(([key, value]) => (
                  <div key={key} className="bg-white rounded p-3 flex items-center justify-between">
                    <span className="font-mono text-sm text-purple-700">{key}</span>
                    <div className="flex items-center gap-2">
                      {key.toLowerCase().includes('color') || key === 'Brown' || key === 'Background' ? (
                        <div 
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: value as string }}
                        />
                      ) : null}
                      <code className="text-xs bg-purple-100 px-2 py-1 rounded">
                        {typeof value === 'string' && value.length > 30 
                          ? `${value.substring(0, 30)}...` 
                          : String(value)
                        }
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Aguardando dados do Figma
          </h3>
          <p className="text-gray-500 mb-4">
            Selecione um elemento no Figma Desktop para ver os dados aqui
          </p>
          <div className="text-sm text-gray-400">
            <p>• Abra o Figma Desktop</p>
            <p>• Selecione qualquer elemento</p>
            <p>• Os dados aparecerão automaticamente aqui</p>
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span>Auto-sync: {autoSync ? '✅ Ativo' : '❌ Inativo'}</span>
            <span>Intervalo: {interval}s</span>
          </div>
          <div className="text-xs">
            Powered by Figma MCP ✨
          </div>
        </div>
      </div>
    </div>
  );
}
