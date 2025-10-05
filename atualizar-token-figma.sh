#!/bin/bash

echo "🔑 Script para Atualizar Token do Figma"
echo "========================================"
echo ""
echo "📋 Passo a Passo:"
echo ""
echo "1️⃣  Acesse: https://www.figma.com/settings"
echo "2️⃣  Role até a seção 'Personal access tokens'"
echo "3️⃣  Clique em 'Create new token' ou 'Generate new token'"
echo "4️⃣  Dê um nome (ex: 'Portfolio Cursor')"
echo "5️⃣  Clique em 'Create token'"
echo "6️⃣  COPIE o token gerado (você só verá uma vez!)"
echo ""
echo "========================================"
echo ""
read -p "Cole o novo token aqui: " NEW_TOKEN
echo ""

if [ -z "$NEW_TOKEN" ]; then
    echo "❌ Token vazio! Abortando."
    exit 1
fi

echo "📝 Atualizando configurações..."

# 1. Atualizar .env.local
if [ -f .env.local ]; then
    # Fazer backup
    cp .env.local .env.local.backup
    echo "✅ Backup criado: .env.local.backup"
    
    # Atualizar token
    if grep -q "FIGMA_ACCESS_TOKEN" .env.local; then
        # Substituir linha existente
        sed -i '' "s/FIGMA_ACCESS_TOKEN=.*/FIGMA_ACCESS_TOKEN=$NEW_TOKEN/" .env.local
        echo "✅ Token atualizado em .env.local"
    else
        # Adicionar nova linha
        echo "FIGMA_ACCESS_TOKEN=$NEW_TOKEN" >> .env.local
        echo "✅ Token adicionado em .env.local"
    fi
    
    # Verificar/adicionar FILE_KEY
    if ! grep -q "FIGMA_FILE_KEY" .env.local; then
        echo "FIGMA_FILE_KEY=KBKaj4z9hPZRv26GbNFSUz" >> .env.local
        echo "✅ File Key adicionado em .env.local"
    fi
else
    # Criar arquivo novo
    cat > .env.local << EOF
# Figma API Configuration
FIGMA_ACCESS_TOKEN=$NEW_TOKEN
FIGMA_FILE_KEY=KBKaj4z9hPZRv26GbNFSUz
FIGMA_MCP_SERVER_URL=http://127.0.0.1:3845/sse
EOF
    echo "✅ Arquivo .env.local criado"
fi

# 2. Atualizar ~/.cursor/mcp.json
if [ -f ~/.cursor/mcp.json ]; then
    # Fazer backup
    cp ~/.cursor/mcp.json ~/.cursor/mcp.json.backup
    echo "✅ Backup criado: ~/.cursor/mcp.json.backup"
    
    # Atualizar token usando sed
    sed -i '' "s/\"FIGMA_API_KEY\": \".*\"/\"FIGMA_API_KEY\": \"$NEW_TOKEN\"/" ~/.cursor/mcp.json
    echo "✅ Token atualizado em ~/.cursor/mcp.json"
else
    echo "⚠️  Arquivo ~/.cursor/mcp.json não encontrado"
fi

echo ""
echo "🧪 Testando novo token..."
RESPONSE=$(curl -s -H "X-Figma-Token: $NEW_TOKEN" \
  "https://api.figma.com/v1/files/KBKaj4z9hPZRv26GbNFSUz" | head -c 100)

if echo "$RESPONSE" | grep -q "403"; then
    echo "❌ Token ainda inválido. Possíveis problemas:"
    echo "   - Token copiado incorretamente"
    echo "   - Conta diferente da que possui o arquivo"
    echo "   - Sem permissões no arquivo"
elif echo "$RESPONSE" | grep -q "name"; then
    echo "✅ Token funcionando! Conexão com Figma estabelecida!"
else
    echo "⚠️  Resposta inesperada: $RESPONSE"
fi

echo ""
echo "📋 Próximos passos:"
echo "1. Reinicie o Cursor (feche completamente e abra novamente)"
echo "2. Reabra este projeto"
echo "3. Teste no chat: 'Use a API do Figma para obter dados do arquivo'"
echo ""
echo "✨ Pronto!"


