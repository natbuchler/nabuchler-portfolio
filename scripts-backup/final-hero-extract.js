#!/usr/bin/env node

const http = require('http');
const fs = require('fs');

// Manter conexão aberta e fazer requisições em sequência
async function extractHero() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 3845,
      path: '/mcp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream'
      }
    };

    let buffer = '';
    let step = 0;
    let codeExtracted = false;

    const req = http.request(options, (res) => {
      res.on('data', (chunk) => {
        buffer += chunk.toString();

        // Processar eventos SSE
        const lines = buffer.split('\n');

        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i];
          let jsonData = line.startsWith('data: ') ? line.substring(6) : line;

          if (jsonData.trim() && !line.startsWith('event:')) {
            try {
              const response = JSON.parse(jsonData);

              if (response.result) {
                console.log(`✅ Passo ${step} concluído`);

                if (step === 0) {
                  // Initialize completo, enviar get_code
                  step = 1;
                  console.log('\n📤 Passo 1: Obtendo código...\n');

                  req.write(JSON.stringify({
                    jsonrpc: '2.0',
                    id: '2',
                    method: 'tools/call',
                    params: {
                      name: 'get_code',
                      arguments: {
                        clientLanguages: 'TypeScript',
                        clientFrameworks: 'React'
                      }
                    }
                  }) + '\n');

                } else if (step === 1) {
                  // Código recebido
                  const code = response.result.content?.[0]?.text || JSON.stringify(response.result, null, 2);
                  fs.writeFileSync('hero-final.tsx', code);
                  console.log('\n✅ Código salvo em hero-final.tsx\n');
                  console.log('Preview:\n');
                  console.log(code.substring(0, 800) + '...\n');

                  codeExtracted = true;
                  req.end();
                  resolve();
                }
              } else if (response.error) {
                console.error(`❌ Erro no passo ${step}:`, response.error.message);
                reject(new Error(response.error.message));
              }
            } catch (e) {
              // Ignorar linhas que não são JSON
            }
          }
        }

        buffer = lines[lines.length - 1];
      });

      res.on('end', () => {
        if (!codeExtracted) {
          reject(new Error('Conexão encerrada sem código'));
        }
      });
    });

    req.on('error', reject);

    // Passo 0: Initialize
    console.log('📤 Passo 0: Inicializando...\n');
    req.write(JSON.stringify({
      jsonrpc: '2.0',
      id: '1',
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'hero-final', version: '1.0.0' }
      }
    }) + '\n');

    setTimeout(() => {
      if (!codeExtracted) {
        req.destroy();
        reject(new Error('Timeout'));
      }
    }, 30000);
  });
}

extractHero()
  .then(() => {
    console.log('🎉 Extração concluída!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Falha:', err.message);
    process.exit(1);
  });
