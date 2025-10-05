#!/usr/bin/env node

const http = require('http');
const fs = require('fs');

// Fazer uma única requisição para pegar código do node selecionado
const payload = JSON.stringify({
  jsonrpc: '2.0',
  id: 'get-code',
  method: 'tools/call',
  params: {
    name: 'get_code',
    arguments: {
      clientLanguages: 'TypeScript',
      clientFrameworks: 'React'
    }
  }
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

console.log('📤 Solicitando código do Hero selecionado...\n');

const req = http.request(options, (res) => {
  let buffer = '';

  res.on('data', (chunk) => {
    buffer += chunk.toString();
  });

  res.on('end', () => {
    console.log('📥 Resposta recebida\n');

    // Tentar extrair JSON da resposta SSE
    const lines = buffer.split('\n');
    for (const line of lines) {
      let json = line;
      if (line.startsWith('data: ')) {
        json = line.substring(6);
      }

      if (json.trim()) {
        try {
          const parsed = JSON.parse(json);
          if (parsed.result) {
            const code = parsed.result.content?.[0]?.text || JSON.stringify(parsed.result, null, 2);
            fs.writeFileSync('hero-extracted.tsx', code);
            console.log('✅ Código salvo em hero-extracted.tsx\n');
            console.log('Preview:\n');
            console.log(code.substring(0, 1000));
            process.exit(0);
          } else if (parsed.error) {
            console.error('❌ Erro:', parsed.error.message);
            process.exit(1);
          }
        } catch (e) {
          // Linha não é JSON válido
        }
      }
    }

    console.log('❌ Nenhum resultado válido encontrado');
    console.log('Resposta completa:', buffer);
    process.exit(1);
  });
});

req.on('error', (err) => {
  console.error('❌ Erro de conexão:', err.message);
  process.exit(1);
});

req.write(payload);
req.end();

setTimeout(() => {
  console.log('⏱️  Timeout - nenhuma resposta recebida');
  process.exit(1);
}, 15000);
