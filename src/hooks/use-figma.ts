'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
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
  selectedNode: any;
  mcpData: any;
  fetchFile: (fileKey?: string) => Promise<void>;
  connectMCP: () => Promise<void>;
  disconnectMCP: () => void;
  extractComponents: () => FigmaNode[];
  getMCPMetadata: (nodeId?: string) => Promise<void>;
  getMCPCode: (nodeId?: string) => Promise<void>;
  getMCPScreenshot: (nodeId?: string) => Promise<void>;
}

export function useFigma(options: UseFigmaOptions = {}): UseFigmaReturn {
  const [file, setFile] = useState<FigmaFile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mcpConnected, setMcpConnected] = useState(false);
  const [components, setComponents] = useState<FigmaNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [mcpData, setMcpData] = useState<any>(null);

  const figmaService = useMemo(() => new FigmaService(), []);

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
      // O MCP do Figma funciona através das funções disponíveis
      // Não precisa de conexão EventSource
      setMcpConnected(true);
      console.log('MCP conectado - usando funções MCP do Figma');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar com MCP');
    }
  }, []);

  const disconnectMCP = useCallback(() => {
    setMcpConnected(false);
    setMcpData(null);
    setSelectedNode(null);
    console.log('MCP desconectado');
  }, []);

  const extractComponents = useCallback(() => {
    if (!file) return [];

    const extractedComponents = figmaService.extractComponents(file.document);
    setComponents(extractedComponents);
    return extractedComponents;
  }, [file, figmaService]);

  const getMCPMetadata = useCallback(async (nodeId?: string) => {
    try {
      setLoading(true);
      // Esta função será implementada no lado do servidor/componente
      // usando as funções MCP disponíveis
      console.log('Obtendo metadados MCP para nodeId:', nodeId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao obter metadados MCP');
    } finally {
      setLoading(false);
    }
  }, []);

  const getMCPCode = useCallback(async (nodeId?: string) => {
    try {
      setLoading(true);
      console.log('Obtendo código MCP para nodeId:', nodeId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao obter código MCP');
    } finally {
      setLoading(false);
    }
  }, []);

  const getMCPScreenshot = useCallback(async (nodeId?: string) => {
    try {
      setLoading(true);
      console.log('Obtendo screenshot MCP para nodeId:', nodeId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao obter screenshot MCP');
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-conectar MCP se habilitado
  useEffect(() => {
    if (options.autoConnect && !mcpConnected) {
      connectMCP();
    }
  }, [options.autoConnect, mcpConnected, connectMCP]);

  return {
    file,
    loading,
    error,
    mcpConnected,
    components,
    selectedNode,
    mcpData,
    fetchFile,
    connectMCP,
    disconnectMCP,
    extractComponents,
    getMCPMetadata,
    getMCPCode,
    getMCPScreenshot,
  };
}
