#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const { randomUUID } = require('crypto');

class FigmaMCP {
  constructor() {
    this.timeout = 30000;
  }

  async request(method, params = {}) {
    return new Promise((resolve, reject) => {
      const payload = JSON.stringify({
        jsonrpc: '2.0',
        id: randomUUID(),
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

      const timeoutId = setTimeout(() => {
        reject(new Error('Request timeout'));
      }, this.timeout);

      const req = http.request(options, (res) => {
        let buffer = '';

        res.on('data', (chunk) => {
          buffer += chunk.toString();

          const lines = buffer.split('\n');

          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i];
            let jsonData = line;

            if (line.startsWith('data: ')) {
              jsonData = line.substring(6);
            } else if (line.startsWith('event:')) {
              continue;
            }

            if (jsonData.trim()) {
              try {
                const response = JSON.parse(jsonData);
                if (response.error) {
                  clearTimeout(timeoutId);
                  reject(new Error(response.error.message));
                  return;
                } else if (response.result !== undefined) {
                  clearTimeout(timeoutId);
                  resolve(response.result);
                  return;
                }
              } catch (e) {}
            }
          }

          buffer = lines[lines.length - 1];
        });

        res.on('end', () => {
          clearTimeout(timeoutId);
        });
      });

      req.on('error', (error) => {
        clearTimeout(timeoutId);
        reject(error);
      });

      req.write(payload);
      req.end();
    });
  }

  async callTool(name, args = {}) {
    return this.request('tools/call', {
      name: name,
      arguments: args
    });
  }
}

async function main() {
  const client = new FigmaMCP();

  try {
    console.log('🔌 Conectando ao Figma MCP...\n');

    await client.request('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'hero-extractor',
        version: '1.0.0'
      }
    });

    console.log('✅ Conectado!\n');

    // Obter seleção atual
    console.log('📍 Obtendo seleção atual (Hero)...\n');
    const selection = await client.callTool('get_selected_node');

    console.log('Seleção:');
    console.log(JSON.stringify(selection, null, 2));
    console.log('\n');

    // Extrair metadados
    console.log('📊 Extraindo metadados do Hero...\n');
    const metadata = await client.callTool('get_metadata', {
      clientLanguages: 'TypeScript',
      clientFrameworks: 'React'
    });

    console.log('Metadados:');
    console.log(JSON.stringify(metadata, null, 2));
    console.log('\n');

    // Salvar metadados
    fs.writeFileSync('hero-metadata.json', JSON.stringify(metadata, null, 2));
    console.log('✅ Metadados salvos em hero-metadata.json\n');

    // Gerar código React
    console.log('⚛️  Gerando código React...\n');
    const code = await client.callTool('get_code', {
      clientLanguages: 'TypeScript',
      clientFrameworks: 'React'
    });

    console.log('Código gerado:');
    console.log(code.content[0].text.substring(0, 500) + '...\n');

    // Salvar código
    fs.writeFileSync('hero-code.tsx', code.content[0].text);
    console.log('✅ Código salvo em hero-code.tsx\n');

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

main();
