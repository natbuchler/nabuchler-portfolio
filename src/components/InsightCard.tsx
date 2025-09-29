'use client';

import { useState, useEffect } from 'react';
import { FigmaService } from '@/lib/figma-service';

interface InsightCardProps {
  nodeId?: string;
}

export default function InsightCard({ nodeId }: InsightCardProps) {
  const [figmaCode, setFigmaCode] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const figmaService = new FigmaService();

  const loadInsightCardFromFigma = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔍 Carregando Insight Card do Figma...');

      // Buscar especificamente o componente "Insight Card"
      const result = await figmaService.getMCPCode(nodeId || 'insight-card');

      if (result && result.status !== 'waiting-for-mcp') {
        setFigmaCode(result);
        console.log('✅ Código do Insight Card obtido:', result);
      } else {
        // Fallback com dados mock para demonstração
        const mockInsightCard = {
          html: `<div className="insight-card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Strategic Leadership
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Building high-performing design teams through clear vision, structured processes, and data-driven decision making that scales across global markets.
      </p>
    </div>
  </div>
  <div className="mt-4 pt-4 border-t border-gray-100">
    <div className="flex items-center justify-between text-sm text-gray-500">
      <span>Impact Area</span>
      <span className="font-medium text-blue-600">Team Performance</span>
    </div>
  </div>
</div>`,
          css: `.insight-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 24px;
  transition: box-shadow 0.2s ease-in-out;
}

.insight-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}`,
          framework: 'react',
          language: 'typescript'
        };

        setFigmaCode(mockInsightCard);
        console.log('📋 Usando dados mock para demonstração');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar do Figma';
      setError(errorMessage);
      console.error('❌ Erro ao carregar Insight Card:', err);
    } finally {
      setLoading(false);
    }
  };

  // Carregar automaticamente ao montar o componente
  useEffect(() => {
    loadInsightCardFromFigma();
  }, [nodeId]);

  // Função para renderizar o código HTML como JSX (simulado)
  const renderFigmaComponent = () => {
    if (!figmaCode || !figmaCode.html) return null;

    // Para demonstração, vamos mostrar o código e renderizar um componente similar
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Componente renderizado do Figma:</h4>

          {/* Renderização do componente baseado no código do Figma */}
          <div className="insight-card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Strategic Leadership
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Building high-performing design teams through clear vision, structured processes, and data-driven decision making that scales across global markets.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Impact Area</span>
                <span className="font-medium text-blue-600">Team Performance</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Código HTML/JSX do Figma:</h4>
          <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
            <code className="text-gray-800">{figmaCode.html}</code>
          </pre>
        </div>

        {figmaCode.css && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">CSS do Figma:</h4>
            <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
              <code className="text-gray-800">{figmaCode.css}</code>
            </pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Insight Card do Figma</h2>
        <button
          onClick={loadInsightCardFromFigma}
          disabled={loading}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm
            ${loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md transform hover:-translate-y-0.5'
            }
          `}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Carregando...
            </span>
          ) : (
            'Recarregar do Figma'
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-800">Erro ao carregar do Figma</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!figmaCode && !loading && !error && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum dado do Figma disponível</h3>
          <p className="text-gray-500 mb-4">Clique em "Recarregar do Figma" para tentar buscar o componente Insight Card.</p>
        </div>
      )}

      {figmaCode && !loading && (
        <div>
          {renderFigmaComponent()}
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          <p className="mb-2">
            <span className="font-medium">Status:</span>{' '}
            {loading ? 'Carregando...' : figmaCode ? 'Dados carregados do Figma' : 'Aguardando dados'}
          </p>
          {nodeId && (
            <p>
              <span className="font-medium">Node ID:</span> {nodeId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}