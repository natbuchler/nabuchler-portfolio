#!/bin/bash

echo "🔧 Corrigindo configuração MCP do Figma..."

# 1. Parar todos os processos figma-mcp
echo "📋 Parando processos figma-mcp existentes..."
pkill -f figma-mcp
sleep 3

# 2. Verificar se ainda há processos
REMAINING=$(ps aux | grep figma-mcp | grep -v grep | wc -l)
if [ $REMAINING -gt 0 ]; then
    echo "⚠️  Ainda há $REMAINING processos figma-mcp rodando"
    echo "🔄 Forçando parada..."
    pkill -9 -f figma-mcp
    sleep 2
fi

# 3. Verificar se o Figma Desktop está rodando
FIGMA_RUNNING=$(ps aux | grep -i figma | grep -v grep | wc -l)
if [ $FIGMA_RUNNING -eq 0 ]; then
    echo "⚠️  Figma Desktop não está rodando!"
    echo "📝 Por favor, abra o Figma Desktop e habilite o servidor MCP:"
    echo "   Menu Figma → Preferências → Habilitar servidor MCP local"
fi

# 4. Verificar configuração MCP
echo "📋 Verificando configuração MCP..."
if [ -f ~/.cursor/mcp.json ]; then
    echo "✅ Arquivo mcp.json encontrado"
    cat ~/.cursor/mcp.json
else
    echo "❌ Arquivo mcp.json não encontrado!"
fi

# 5. Testar conexão MCP
echo "🧪 Testando conexão MCP..."
timeout 5 curl -s http://127.0.0.1:3845/sse > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Servidor MCP está respondendo"
else
    echo "❌ Servidor MCP não está respondendo"
    echo "💡 Certifique-se de que:"
    echo "   1. Figma Desktop está aberto"
    echo "   2. Servidor MCP está habilitado nas preferências"
    echo "   3. Arquivo está aberto no Figma"
fi

echo "🎯 Correção concluída!"
echo "💡 Reinicie o Cursor para aplicar as mudanças"

