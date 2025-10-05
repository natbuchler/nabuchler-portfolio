'use client';

import { useState } from 'react';
import { FigmaService } from '@/lib/figma-service';

interface TestResult {
  metadata?: any;
  code?: any;
  screenshot?: any;
}

export default function FigmaMCPDemo() {
  const [results, setResults] = useState<TestResult>({});
  const [loading, setLoading] = useState<{
    metadata: boolean;
    code: boolean;
    screenshot: boolean;
  }>({
    metadata: false,
    code: false,
    screenshot: false,
  });
  const [errors, setErrors] = useState<{
    metadata?: string;
    code?: string;
    screenshot?: string;
  }>({});

  const figmaService = new FigmaService();

  const handleTestMetadata = async () => {
    setLoading(prev => ({ ...prev, metadata: true }));
    setErrors(prev => ({ ...prev, metadata: undefined }));

    try {
      const result = await figmaService.getMCPMetadata();
      setResults(prev => ({ ...prev, metadata: result }));
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        metadata: error instanceof Error ? error.message : 'Erro desconhecido'
      }));
    } finally {
      setLoading(prev => ({ ...prev, metadata: false }));
    }
  };

  const handleTestCode = async () => {
    setLoading(prev => ({ ...prev, code: true }));
    setErrors(prev => ({ ...prev, code: undefined }));

    try {
      const result = await figmaService.getMCPCode();
      setResults(prev => ({ ...prev, code: result }));
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        code: error instanceof Error ? error.message : 'Erro desconhecido'
      }));
    } finally {
      setLoading(prev => ({ ...prev, code: false }));
    }
  };

  const handleTestScreenshot = async () => {
    setLoading(prev => ({ ...prev, screenshot: true }));
    setErrors(prev => ({ ...prev, screenshot: undefined }));

    try {
      const result = await figmaService.getMCPScreenshot();
      setResults(prev => ({ ...prev, screenshot: result }));
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        screenshot: error instanceof Error ? error.message : 'Erro desconhecido'
      }));
    } finally {
      setLoading(prev => ({ ...prev, screenshot: false }));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-brown mb-6">Figma MCP Demo</h2>

      {/* Buttons Row */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <button
          onClick={handleTestMetadata}
          disabled={loading.metadata}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${loading.metadata
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-0.5'
            }
          `}
        >
          {loading.metadata ? 'Testando...' : 'Testar Metadata'}
        </button>

        <button
          onClick={handleTestCode}
          disabled={loading.code}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${loading.code
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg transform hover:-translate-y-0.5'
            }
          `}
        >
          {loading.code ? 'Testando...' : 'Testar Código'}
        </button>

        <button
          onClick={handleTestScreenshot}
          disabled={loading.screenshot}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${loading.screenshot
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg transform hover:-translate-y-0.5'
            }
          `}
        >
          {loading.screenshot ? 'Testando...' : 'Testar Screenshot'}
        </button>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metadata Result */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-brown">Metadata Result</h3>
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 min-h-[200px]">
            {errors.metadata ? (
              <div className="text-red-600 font-mono text-sm">
                Erro: {errors.metadata}
              </div>
            ) : results.metadata ? (
              <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap overflow-auto">
                {JSON.stringify(results.metadata, null, 2)}
              </pre>
            ) : (
              <div className="text-gray-500 font-mono text-sm">
                Clique em "Testar Metadata" para ver o resultado
              </div>
            )}
          </div>
        </div>

        {/* Code Result */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-brown">Code Result</h3>
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 min-h-[200px]">
            {errors.code ? (
              <div className="text-red-600 font-mono text-sm">
                Erro: {errors.code}
              </div>
            ) : results.code ? (
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">React/Tailwind Code:</h4>
                  <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap overflow-auto bg-white p-3 rounded border">
                    {typeof results.code === 'string'
                      ? results.code
                      : JSON.stringify(results.code, null, 2)
                    }
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 font-mono text-sm">
                Clique em "Testar Código" para ver o resultado
              </div>
            )}
          </div>
        </div>

        {/* Screenshot Result */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-brown">Screenshot Result</h3>
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 min-h-[200px]">
            {errors.screenshot ? (
              <div className="text-red-600 font-mono text-sm">
                Erro: {errors.screenshot}
              </div>
            ) : results.screenshot ? (
              <div className="space-y-3">
                <div className="text-xs font-mono text-gray-600">
                  {typeof results.screenshot === 'object' && results.screenshot.status
                    ? `Status: ${results.screenshot.status}`
                    : 'Screenshot capturado'
                  }
                </div>
                {typeof results.screenshot === 'string' && results.screenshot.startsWith('data:image') ? (
                  <img
                    src={results.screenshot}
                    alt="Figma Screenshot"
                    className="max-w-full h-auto rounded border"
                  />
                ) : (
                  <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap overflow-auto bg-white p-3 rounded border">
                    {JSON.stringify(results.screenshot, null, 2)}
                  </pre>
                )}
              </div>
            ) : (
              <div className="text-gray-500 font-mono text-sm">
                Clique em "Testar Screenshot" para ver o resultado
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Como funciona:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Metadata:</strong> Obtém informações sobre o elemento selecionado no Figma</li>
          <li>• <strong>Código:</strong> Gera código React/Tailwind baseado no design</li>
          <li>• <strong>Screenshot:</strong> Captura uma imagem do elemento selecionado</li>
        </ul>
      </div>
    </div>
  );
}