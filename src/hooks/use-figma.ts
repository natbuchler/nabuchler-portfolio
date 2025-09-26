'use client';

import { useState, useEffect, useCallback } from 'react';
import { FigmaService } from '../lib/figma-service';
import { FigmaFile, FigmaNode } from '../lib/figma-config';

export interface UseFigmaOptions {
  fileKey?: string;
  autoConnect?: boolean;
}

export interface UseFigmaReturn {
  file: FigmaFile | null;
  loading: boolean;
  error: string | null;
  mcpConnected: boolean;
  components: FigmaNode[];
  fetchFile: (fileKey?: string) => Promise<void>;
  connectMCP: () => Promise<void>;
  disconnectMCP: () => void;
  extractComponents: () => FigmaNode[];
}

export function useFigma(options: UseFigmaOptions = {}): UseFigmaReturn {
  const [file, setFile] = useState<FigmaFile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mcpConnected, setMcpConnected] = useState(false);
  const [components, setComponents] = useState<FigmaNode[]>([]);
  const [mcpConnection, setMcpConnection] = useState<EventSource | null>(null);

  const figmaService = new FigmaService();

  const fetchFile = useCallback(async (fileKey?: string) => {
    setLoading(true);
    setError(null);

    try {
      const figmaFile = await figmaService.getFile(fileKey);
      setFile(figmaFile);
      
      // Extrair componentes automaticamente
      const extractedComponents = figmaService.extractComponents(figmaFile.document);
      setComponents(extractedComponents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar arquivo do Figma');
    } finally {
      setLoading(false);
    }
  }, [figmaService]);

  const connectMCP = useCallback(async () => {
    try {
      const connection = await figmaService.connectToMCPServer();
      
      connection.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Dados recebidos do MCP:', data);
          
          // Processar dados recebidos do Figma via MCP
          if (data.type === 'selection_changed') {
            // Atualizar componentes quando a seleção mudar no Figma
            if (file) {
              const extractedComponents = figmaService.extractComponents(file.document);
              setComponents(extractedComponents);
            }
          }
        } catch (err) {
          console.error('Erro ao processar dados MCP:', err);
        }
      };

      setMcpConnection(connection);
      setMcpConnected(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar com MCP');
    }
  }, [figmaService, file]);

  const disconnectMCP = useCallback(() => {
    if (mcpConnection) {
      mcpConnection.close();
      setMcpConnection(null);
      setMcpConnected(false);
    }
  }, [mcpConnection]);

  const extractComponents = useCallback(() => {
    if (!file) return [];
    
    const extractedComponents = figmaService.extractComponents(file.document);
    setComponents(extractedComponents);
    return extractedComponents;
  }, [file, figmaService]);

  // Auto-conectar MCP se habilitado
  useEffect(() => {
    if (options.autoConnect && !mcpConnected) {
      connectMCP();
    }

    return () => {
      disconnectMCP();
    };
  }, [options.autoConnect, mcpConnected, connectMCP, disconnectMCP]);

  return {
    file,
    loading,
    error,
    mcpConnected,
    components,
    fetchFile,
    connectMCP,
    disconnectMCP,
    extractComponents,
  };
}
