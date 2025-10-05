#!/usr/bin/env node

const http = require('http');
const fs = require('fs');

const FILE_KEY = 'KBKaj4z9hPZRv26GbNFSUz';

function mcpRequest(method, params = {}) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now().toString(),
      method: method,
      params: params
    });

    const options = {
      hostname: '127.0.0.1',
      port: 3845,
      path: '/mcp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    let resolved = false;
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        reject(new Error('Timeout'));
      }
    }, 20000);

    const req = http.request(options, (res) => {
      let buffer = '';

      res.on('data', (chunk) => {
        buffer += chunk.toString();

        const lines = buffer.split('\n');
        for (const line of lines) {
          let json = line.startsWith('data: ') ? line.substring(6) : line;

          if (json.trim() && !line.startsWith('event:')) {
            try {
              const parsed = JSON.parse(json);
              if (parsed.result && !resolved) {
                resolved = true;
                clearTimeout(timeout);
                resolve(parsed.result);
              } else if (parsed.error && !resolved) {
                resolved = true;
                clearTimeout(timeout);
                reject(new Error(parsed.error.message));
              }
            } catch (e) {}
          }
        }
      });

      res.on('end', () => {
        if (!resolved) {
          clearTimeout(timeout);
          reject(new Error('No response'));
        }
      });
    });

    req.on('error', (err) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeout);
        reject(err);
      }
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  const report = {
    file: {},
    components: [],
    variables: {},
    heroNode: null,
    comparison: {}
  };

  try {
    console.log('🔌 Conectando ao Figma MCP...\n');

    // 1. Initialize
    await mcpRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'figma-sync', version: '1.0.0' }
    });
    console.log('✅ Conectado!\n');

    // 2. Obter arquivo atual
    console.log(`📄 Acessando arquivo ${FILE_KEY}...\n`);
    const fileInfo = await mcpRequest('tools/call', {
      name: 'get_current_file',
      arguments: {}
    });

    report.file = {
      info: fileInfo.content?.[0]?.text || JSON.stringify(fileInfo)
    };
    console.log('✅ Arquivo obtido\n');
    console.log(report.file.info.substring(0, 300) + '...\n');

    // 3. Buscar Hero node
    console.log('🔍 Buscando node Hero...\n');
    const searchResult = await mcpRequest('tools/call', {
      name: 'search_nodes',
      arguments: {
        query: 'Hero'
      }
    });

    console.log('✅ Busca concluída\n');
    report.heroNode = searchResult;

    // 4. Selecionar Hero e obter código
    console.log('📍 Selecionando Hero...\n');
    await mcpRequest('tools/call', {
      name: 'set_selection',
      arguments: {
        nodeIds: ['3211:1217']
      }
    });

    console.log('⚛️  Obtendo código do Hero...\n');
    const codeResult = await mcpRequest('tools/call', {
      name: 'get_code',
      arguments: {
        clientLanguages: 'TypeScript',
        clientFrameworks: 'React'
      }
    });

    const heroCode = codeResult.content?.[0]?.text || JSON.stringify(codeResult);
    fs.writeFileSync('figma-hero-code.tsx', heroCode);
    console.log('✅ Código do Hero salvo em figma-hero-code.tsx\n');

    // 5. Obter variáveis de design
    console.log('🎨 Extraindo variáveis de design...\n');
    const variablesResult = await mcpRequest('tools/call', {
      name: 'get_variables',
      arguments: {}
    });

    report.variables = variablesResult.content?.[0]?.text || JSON.stringify(variablesResult);
    fs.writeFileSync('figma-variables.json', JSON.stringify(report.variables, null, 2));
    console.log('✅ Variáveis salvas em figma-variables.json\n');

    // 6. Salvar relatório completo
    fs.writeFileSync('figma-sync-report.json', JSON.stringify(report, null, 2));
    console.log('📊 Relatório completo salvo em figma-sync-report.json\n');

    console.log('🎉 Sincronização concluída!\n');

    // Resumo
    console.log('═══════════════════════════════════════');
    console.log('RESUMO:');
    console.log('═══════════════════════════════════════');
    console.log(`✓ Arquivo: ${FILE_KEY}`);
    console.log(`✓ Código Hero: figma-hero-code.tsx`);
    console.log(`✓ Variáveis: figma-variables.json`);
    console.log(`✓ Relatório: figma-sync-report.json`);
    console.log('═══════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    fs.writeFileSync('figma-sync-error.log', error.stack);
    process.exit(1);
  }
}

main();
