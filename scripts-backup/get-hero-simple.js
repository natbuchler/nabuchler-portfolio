#!/usr/bin/env node

const http = require('http');
const fs = require('fs');

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
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;

        // Procurar por JSON na resposta
        const lines = data.split('\n');
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
          reject(new Error('No valid response'));
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
    // 1. Initialize
    console.log('1️⃣  Inicializando...');
    await mcpRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'hero-getter', version: '1.0.0' }
    });
    console.log('✅ Inicializado\n');

    // 2. Get code from selected Hero frame
    console.log('2️⃣  Obtendo código do Hero...');
    const codeResult = await mcpRequest('tools/call', {
      name: 'get_code',
      arguments: {
        clientLanguages: 'TypeScript',
        clientFrameworks: 'React'
      }
    });

    console.log('✅ Código recebido\n');

    // Extract code from content array
    const code = codeResult.content?.[0]?.text || JSON.stringify(codeResult, null, 2);

    fs.writeFileSync('hero-extracted.tsx', code);
    console.log('📝 Código salvo em hero-extracted.tsx');
    console.log('\nPrimeiras linhas:');
    console.log(code.substring(0, 500));

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    process.exit(1);
  }
}

main();
