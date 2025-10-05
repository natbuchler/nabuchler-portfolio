#!/usr/bin/env node

const http = require('http');
const fs = require('fs');

function mcpCall(method, params = {}) {
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
    }, 30000);

    const req = http.request(options, (res) => {
      let buffer = '';

      res.on('data', (chunk) => {
        buffer += chunk.toString();

        const lines = buffer.split('\n');
        for (const line of lines) {
          let json = line;
          if (line.startsWith('data: ')) {
            json = line.substring(6);
          }

          if (json.trim()) {
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
  try {
    console.log('🔌 Inicializando MCP...');
    await mcpCall('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'hero-id', version: '1.0.0' }
    });
    console.log('✅ Inicializado\n');

    // Selecionar o node Hero
    console.log('📍 Selecionando Hero (3211:1217)...');
    await mcpCall('tools/call', {
      name: 'set_selection',
      arguments: {
        nodeIds: ['3211:1217']
      }
    });
    console.log('✅ Selecionado\n');

    // Obter código
    console.log('⚛️  Obtendo código React...');
    const result = await mcpCall('tools/call', {
      name: 'get_code',
      arguments: {
        clientLanguages: 'TypeScript',
        clientFrameworks: 'React'
      }
    });

    const code = result.content?.[0]?.text || JSON.stringify(result, null, 2);

    fs.writeFileSync('hero-code.tsx', code);
    console.log('✅ Código salvo em hero-code.tsx\n');
    console.log('Preview (primeiras 800 chars):\n');
    console.log(code.substring(0, 800) + '...\n');

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    process.exit(1);
  }
}

main();
