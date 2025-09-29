'use client';

import { useFigma } from '@/hooks/use-figma';
import { FigmaNode } from '@/lib/figma-config';
import { useState } from 'react';

interface FigmaComponentProps {
  fileKey?: string;
}

export default function FigmaComponent({ fileKey }: FigmaComponentProps) {
  const {
    file,
    loading,
    error,
    mcpConnected,
    components,
    fetchFile,
    connectMCP,
    disconnectMCP,
  } = useFigma({ fileKey, autoConnect: true });

  const [selectedComponent, setSelectedComponent] = useState<FigmaNode | null>(null);

  const handleFetchFile = () => {
    fetchFile(fileKey);
  };

  const handleConnectMCP = () => {
    if (mcpConnected) {
      disconnectMCP();
    } else {
      connectMCP();
    }
  };

  const renderNode = (node: FigmaNode, depth = 0) => {
    const indent = '  '.repeat(depth);
    
    return (
      <div key={node.id} className="ml-4">
        <div 
          className="cursor-pointer hover:bg-gray-100 p-2 rounded"
          onClick={() => setSelectedComponent(node)}
        >
          {indent}
          <span className="font-mono text-sm">
            {node.type}: {node.name}
          </span>
          {node.absoluteBoundingBox && (
            <span className="text-gray-500 text-xs ml-2">
              ({node.absoluteBoundingBox.width}x{node.absoluteBoundingBox.height})
            </span>
          )}
        </div>
        {node.children && node.children.map(child => renderNode(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Integração Figma MCP</h1>
        
        <div className="flex gap-4 mb-4">
          <button
            onClick={handleFetchFile}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded"
          >
            {loading ? 'Carregando...' : 'Carregar Arquivo Figma'}
          </button>
          
          <button
            onClick={handleConnectMCP}
            className={`px-4 py-2 rounded ${
              mcpConnected 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {mcpConnected ? 'Desconectar MCP' : 'Conectar MCP'}
          </button>
        </div>

        <div className="flex gap-4 text-sm">
          <span className={`px-2 py-1 rounded ${
            mcpConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            MCP: {mcpConnected ? 'Conectado' : 'Desconectado'}
          </span>
          
          {file && (
            <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
              Arquivo: {file.document.name}
            </span>
          )}
          
          {components.length > 0 && (
            <span className="px-2 py-1 rounded bg-purple-100 text-purple-800">
              Componentes: {components.length}
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Erro:</strong> {error}
          {error.includes('File key do Figma não configurado') && (
            <div className="mt-2 text-sm">
              <p>Para resolver este erro:</p>
              <ol className="list-decimal list-inside mt-1">
                <li>Acesse o arquivo <code className="bg-red-200 px-1 rounded">.env.local</code> na raiz do projeto</li>
                <li>Verifique se <code className="bg-red-200 px-1 rounded">FIGMA_ACCESS_TOKEN</code> e <code className="bg-red-200 px-1 rounded">FIGMA_FILE_KEY</code> estão configurados</li>
                <li>Reinicie o servidor de desenvolvimento</li>
              </ol>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Árvore de nós */}
        <div className="bg-white border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Estrutura do Arquivo</h2>
          {file ? (
            <div className="max-h-96 overflow-y-auto">
              {renderNode(file.document)}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum arquivo carregado</p>
          )}
        </div>

        {/* Detalhes do componente selecionado */}
        <div className="bg-white border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Detalhes do Componente</h2>
          {selectedComponent ? (
            <div className="space-y-3">
              <div>
                <strong>Nome:</strong> {selectedComponent.name}
              </div>
              <div>
                <strong>Tipo:</strong> {selectedComponent.type}
              </div>
              <div>
                <strong>ID:</strong> <code className="bg-gray-100 px-1 rounded">{selectedComponent.id}</code>
              </div>
              
              {selectedComponent.absoluteBoundingBox && (
                <div>
                  <strong>Dimensões:</strong>
                  <ul className="ml-4 text-sm">
                    <li>Largura: {selectedComponent.absoluteBoundingBox.width}px</li>
                    <li>Altura: {selectedComponent.absoluteBoundingBox.height}px</li>
                    <li>X: {selectedComponent.absoluteBoundingBox.x}px</li>
                    <li>Y: {selectedComponent.absoluteBoundingBox.y}px</li>
                  </ul>
                </div>
              )}

              {selectedComponent.fills && selectedComponent.fills.length > 0 && (
                <div>
                  <strong>Cores:</strong>
                  <div className="flex gap-2 mt-2">
                    {selectedComponent.fills.map((fill, index) => {
                      if (fill.color) {
                        const color = `rgba(${Math.round(fill.color.r * 255)}, ${Math.round(fill.color.g * 255)}, ${Math.round(fill.color.b * 255)}, ${fill.color.a})`;
                        return (
                          <div key={index} className="flex items-center gap-2">
                            <div 
                              className="w-6 h-6 border rounded"
                              style={{ backgroundColor: color }}
                            />
                            <code className="text-xs">{color}</code>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}

              {selectedComponent.style && (
                <div>
                  <strong>Estilo:</strong>
                  <ul className="ml-4 text-sm">
                    {selectedComponent.style.fontFamily && (
                      <li>Fonte: {selectedComponent.style.fontFamily}</li>
                    )}
                    {selectedComponent.style.fontSize && (
                      <li>Tamanho: {selectedComponent.style.fontSize}px</li>
                    )}
                    {selectedComponent.style.fontWeight && (
                      <li>Peso: {selectedComponent.style.fontWeight}</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Selecione um componente para ver os detalhes</p>
          )}
        </div>
      </div>

      {/* Lista de componentes */}
      {components.length > 0 && (
        <div className="mt-6 bg-white border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Componentes Encontrados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {components.map((component) => (
              <div 
                key={component.id}
                className="border rounded p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedComponent(component)}
              >
                <div className="font-medium">{component.name}</div>
                <div className="text-sm text-gray-500">{component.type}</div>
                {component.absoluteBoundingBox && (
                  <div className="text-xs text-gray-400 mt-1">
                    {component.absoluteBoundingBox.width} × {component.absoluteBoundingBox.height}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
