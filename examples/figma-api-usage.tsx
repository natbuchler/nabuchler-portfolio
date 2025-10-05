/**
 * Exemplos de Uso das Rotas de API do Figma
 * 
 * Este arquivo contém exemplos práticos de como utilizar
 * as rotas de API do Figma em componentes React.
 */

import { useState, useEffect } from 'react';

// ============================================================================
// EXEMPLO 1: Hook customizado para buscar metadados
// ============================================================================

interface FigmaMetadata {
  nodeId: string;
  name: string;
  type: string;
  width: number;
  height: number;
  x: number;
  y: number;
  children: any[];
}

function useFigmaMetadata(nodeId: string | null) {
  const [data, setData] = useState<FigmaMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nodeId) return;

    async function fetchMetadata() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/figma/metadata?nodeId=${nodeId}`);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchMetadata();
  }, [nodeId]);

  return { data, loading, error };
}

// ============================================================================
// EXEMPLO 2: Componente para exibir metadados de um nó
// ============================================================================

export function FigmaNodeViewer({ nodeId }: { nodeId: string }) {
  const { data, loading, error } = useFigmaMetadata(nodeId);

  if (loading) {
    return (
      <div className="p-4 bg-gray-100 rounded">
        <p>Carregando metadados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        <p>Erro: {error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-xl font-bold mb-2">{data.name}</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="font-semibold">Tipo:</span> {data.type}
        </div>
        <div>
          <span className="font-semibold">ID:</span> {data.nodeId}
        </div>
        <div>
          <span className="font-semibold">Largura:</span> {data.width}px
        </div>
        <div>
          <span className="font-semibold">Altura:</span> {data.height}px
        </div>
        <div className="col-span-2">
          <span className="font-semibold">Filhos:</span> {data.children.length}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// EXEMPLO 3: Componente para exibir screenshot de um nó
// ============================================================================

export function FigmaScreenshot({ 
  nodeId, 
  scale = 2, 
  format = 'png' 
}: { 
  nodeId: string; 
  scale?: number; 
  format?: 'png' | 'jpg' | 'svg' | 'pdf'; 
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchScreenshot() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/figma/screenshot?nodeId=${nodeId}&scale=${scale}&format=${format}`
        );
        const result = await response.json();

        if (result.success) {
          setImageUrl(result.data.url);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    fetchScreenshot();
  }, [nodeId, scale, format]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-100 rounded">
        <p>Gerando screenshot...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        <p>Erro: {error}</p>
      </div>
    );
  }

  if (!imageUrl) return null;

  return (
    <div className="rounded overflow-hidden shadow">
      <img 
        src={imageUrl} 
        alt="Figma screenshot" 
        className="w-full h-auto"
      />
    </div>
  );
}

// ============================================================================
// EXEMPLO 4: Componente para exibir variáveis de design
// ============================================================================

interface DesignVariables {
  colors: Record<string, string>;
  typography: Record<string, string>;
  source: string;
  fileKey: string;
  fileName: string;
}

export function DesignSystemViewer() {
  const [variables, setVariables] = useState<DesignVariables | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVariables() {
      try {
        const response = await fetch('/api/figma/variables');
        const result = await response.json();

        if (result.success) {
          setVariables(result.data);
        }
      } catch (err) {
        console.error('Erro ao buscar variáveis:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchVariables();
  }, []);

  if (loading) return <p>Carregando design system...</p>;
  if (!variables) return <p>Erro ao carregar variáveis</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Cores</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(variables.colors).map(([name, color]) => (
            <div key={name} className="space-y-2">
              <div 
                className="w-full h-20 rounded shadow"
                style={{ backgroundColor: color }}
              />
              <div className="text-sm">
                <p className="font-semibold">{name}</p>
                <p className="text-gray-600">{color}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Tipografia</h2>
        <div className="space-y-2">
          {Object.entries(variables.typography).map(([name, style]) => (
            <div key={name} className="p-3 bg-gray-50 rounded">
              <p className="font-semibold">{name}</p>
              <p className="text-sm text-gray-600 font-mono">{style}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <p>Arquivo: {variables.fileName}</p>
        <p>Fonte: {variables.source}</p>
      </div>
    </div>
  );
}

// ============================================================================
// EXEMPLO 5: Componente para gerar e exibir código
// ============================================================================

interface GeneratedCode {
  react: string;
  css: string;
  html: string;
  note: string;
}

export function CodeGenerator({ nodeId }: { nodeId: string }) {
  const [code, setCode] = useState<GeneratedCode | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'react' | 'css' | 'html'>('react');

  const generateCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/figma/code?nodeId=${nodeId}`);
      const result = await response.json();

      if (result.success) {
        setCode(result.data);
      }
    } catch (err) {
      console.error('Erro ao gerar código:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={generateCode}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Gerando...' : 'Gerar Código'}
      </button>

      {code && (
        <div className="space-y-4">
          <div className="flex space-x-2 border-b">
            <button
              onClick={() => setActiveTab('react')}
              className={`px-4 py-2 ${
                activeTab === 'react' 
                  ? 'border-b-2 border-blue-500 font-semibold' 
                  : 'text-gray-600'
              }`}
            >
              React
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-4 py-2 ${
                activeTab === 'css' 
                  ? 'border-b-2 border-blue-500 font-semibold' 
                  : 'text-gray-600'
              }`}
            >
              CSS
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`px-4 py-2 ${
                activeTab === 'html' 
                  ? 'border-b-2 border-blue-500 font-semibold' 
                  : 'text-gray-600'
              }`}
            >
              HTML
            </button>
          </div>

          <pre className="p-4 bg-gray-900 text-green-400 rounded overflow-x-auto">
            <code>{code[activeTab]}</code>
          </pre>

          <p className="text-sm text-gray-600 italic">{code.note}</p>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// EXEMPLO 6: Componente para gerenciar cache
// ============================================================================

interface CacheStats {
  size: number;
  hits: number;
  misses: number;
  hitRate: string;
}

export function CacheManager() {
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/figma/cache');
      const result = await response.json();

      if (result.success) {
        setStats(result.data);
      }
    } catch (err) {
      console.error('Erro ao buscar estatísticas:', err);
    }
  };

  const clearCache = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/figma/cache', { method: 'DELETE' });
      const result = await response.json();

      if (result.success) {
        alert('Cache invalidado com sucesso!');
        fetchStats();
      }
    } catch (err) {
      console.error('Erro ao limpar cache:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      <h3 className="text-xl font-bold">Gerenciamento de Cache</h3>

      {stats && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded">
            <p className="text-sm text-gray-600">Tamanho</p>
            <p className="text-2xl font-bold">{stats.size}</p>
          </div>
          <div className="p-3 bg-green-50 rounded">
            <p className="text-sm text-gray-600">Taxa de Acerto</p>
            <p className="text-2xl font-bold">{stats.hitRate}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded">
            <p className="text-sm text-gray-600">Hits</p>
            <p className="text-2xl font-bold">{stats.hits}</p>
          </div>
          <div className="p-3 bg-orange-50 rounded">
            <p className="text-sm text-gray-600">Misses</p>
            <p className="text-2xl font-bold">{stats.misses}</p>
          </div>
        </div>
      )}

      <button
        onClick={clearCache}
        disabled={loading}
        className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
      >
        {loading ? 'Limpando...' : 'Limpar Cache'}
      </button>
    </div>
  );
}

// ============================================================================
// EXEMPLO 7: Dashboard completo com todas as funcionalidades
// ============================================================================

export function FigmaDashboard() {
  const [nodeId, setNodeId] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold mb-2">Figma API Dashboard</h1>
          <p className="text-gray-600">
            Demonstração das rotas de API do Figma
          </p>
        </header>

        {/* Input para Node ID */}
        <div className="bg-white p-4 rounded shadow">
          <label className="block text-sm font-semibold mb-2">
            Node ID do Figma
          </label>
          <input
            type="text"
            value={nodeId}
            onChange={(e) => setNodeId(e.target.value)}
            placeholder="Ex: 123:456"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Selecione um elemento no Figma e copie o Node ID da URL
          </p>
        </div>

        {/* Design System */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Design System</h2>
          <DesignSystemViewer />
        </section>

        {/* Metadados e Screenshot (se nodeId estiver preenchido) */}
        {nodeId && (
          <>
            <section className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Metadados</h2>
                <FigmaNodeViewer nodeId={nodeId} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Screenshot</h2>
                <FigmaScreenshot nodeId={nodeId} />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Gerador de Código</h2>
              <CodeGenerator nodeId={nodeId} />
            </section>
          </>
        )}

        {/* Cache Manager */}
        <section>
          <CacheManager />
        </section>
      </div>
    </div>
  );
}

