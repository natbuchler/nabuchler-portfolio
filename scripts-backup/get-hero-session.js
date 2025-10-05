#!/usr/bin/env node

const http = require('http');
const fs = require('fs');

async function getHeroCode() {
  return new Promise((resolve, reject) => {
    let buffer = '';
    let initialized = false;
    let codeReceived = false;

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

    // Primeira mensagem: initialize
    const initPayload = JSON.stringify({
      jsonrpc: '2.0',
      id: '1',
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'hero', version: '1.0.0' }
      }
    }) + '\n';

    // Segunda mensagem: get_code
    const codePayload = JSON.stringify({
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
    }) + '\n';

    console.log('🔌 Conectando ao MCP...\n');

    const req = http.request(options, (res) => {
      res.on('data', (chunk) => {
        buffer += chunk.toString();

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          let json = line;
          if (line.startsWith('data: ')) {
            json = line.substring(6);
          } else if (line.startsWith('event:')) {
            continue;
          }

          if (json.trim()) {
            try {
              const parsed = JSON.parse(json);

              // Resposta do initialize
              if (parsed.id === '1' && parsed.result && !initialized) {
                console.log('✅ Inicializado\n');
                initialized = true;

                // Enviar segunda requisição
                console.log('📤 Solicitando código...\n');
                req.write(codePayload);
              }

              // Resposta do get_code
              if (parsed.id === '2' && parsed.result) {
                console.log('✅ Código recebido\n');
                codeReceived = true;
                const code = parsed.result.content?.[0]?.text || JSON.stringify(parsed.result, null, 2);

                fs.writeFileSync('hero-extracted.tsx', code);
                console.log('💾 Salvo em hero-extracted.tsx\n');
                console.log('Preview:\n');
                console.log(code.substring(0, 600) + '...\n');

                req.end();
                resolve(code);
              }

              // Erro
              if (parsed.error) {
                console.error('❌ Erro MCP:', parsed.error.message);
                reject(new Error(parsed.error.message));
              }

            } catch (e) {
              // Ignorar linhas que não são JSON válido
            }
          }
        }
      });

      res.on('end', () => {
        if (!codeReceived) {
          reject(new Error('Conexão encerrada sem receber código'));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    // Enviar primeira requisição
    console.log('📤 Inicializando...\n');
    req.write(initPayload);

    setTimeout(() => {
      if (!codeReceived) {
        req.destroy();
        reject(new Error('Timeout'));
      }
    }, 30000);
  });
}

getHeroCode()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('\n❌ Falha:', err.message);
    process.exit(1);
  });
