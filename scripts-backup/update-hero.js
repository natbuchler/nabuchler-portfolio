#!/usr/bin/env node

const http = require('http');
const { randomUUID } = require('crypto');

class FigmaMCP {
  constructor() {
    this.baseUrl = 'http://127.0.0.1:3845';
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
                  reject(new Error(response.error.message));
                } else if (response.result !== undefined) {
                  resolve(response.result);
                }
              } catch (e) {}
            }
          }

          buffer = lines[lines.length - 1];
        });

        res.on('end', () => {
          if (!buffer) {
            reject(new Error('No valid response received'));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(payload);
      req.end();
    });
  }
}

async function main() {
  const client = new FigmaMCP();

  try {
    console.log('🔌 Inicializando conexão MCP...\n');

    await client.request('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'hero-updater',
        version: '1.0.0'
      }
    });

    console.log('✅ Conectado ao Figma MCP\n');

    // Listar ferramentas disponíveis
    console.log('📋 Listando ferramentas...\n');
    const tools = await client.request('tools/list', {});

    console.log('Ferramentas disponíveis:');
    tools.tools.forEach(tool => {
      console.log(`  - ${tool.name}: ${tool.description}`);
    });
    console.log('\n');

    // Obter arquivo atual
    console.log('📄 Obtendo arquivo do Figma...\n');
    const file = await client.request('tools/call', {
      name: 'get_current_file',
      arguments: {}
    });

    console.log(`Arquivo: ${file.content[0].text}\n`);

    // Buscar Hero section
    console.log('🔍 Buscando Hero section...\n');
    const search = await client.request('tools/call', {
      name: 'search_nodes',
      arguments: {
        query: 'Hero'
      }
    });

    console.log('Resultados da busca:');
    console.log(JSON.stringify(search, null, 2));

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

main();
