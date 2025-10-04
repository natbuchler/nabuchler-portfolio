# 🛡️ Plano de Segurança - Remoção do MCP

## 📊 Análise de Risco

### Probabilidade de Quebrar o Projeto

#### SEM Backup (❌ NÃO RECOMENDADO):
- **Risco: 30-40%**
  - Pode deletar código importante por acidente
  - Difícil reverter mudanças
  - Sem histórico de comparação

#### COM Backup via Git (✅ RECOMENDADO):
- **Risco: 0-5%**
  - Sempre podemos voltar
  - Commits incrementais
  - Fácil comparar diferenças
  - GitHub como backup remoto

---

## 🎯 Estratégia de Segurança (Sugerida por Você)

### Fase 1: BACKUP E SEGURANÇA ✅

```bash
# 1. Commitar trabalho atual (cache + análises)
git add src/lib/figma-cache.ts
git add src/lib/figma-api.ts
git add ANALISE_TECNICA.md
git add CACHE_USAGE.md
git add MCP_USAGE.md
git add STATUS_MCP.md
git commit -m "feat: adicionar sistema de cache e documentação técnica"

# 2. Criar branch de backup (snapshot do estado atual)
git branch backup-before-mcp-removal

# 3. Push de segurança para GitHub
git push origin backup-before-mcp-removal
git push origin main

# 4. Criar branch de trabalho
git checkout -b simplify-remove-mcp
```

### Fase 2: REMOÇÃO INCREMENTAL (Commits pequenos)

Cada mudança = 1 commit. Se algo quebrar, voltamos 1 commit.

```bash
# Commit 1: Simplificar route.ts principal
git add src/app/api/figma-direct-mcp/route.ts
git commit -m "refactor: simplificar route.ts - remover tentativas MCP"

# Teste: npm run dev + verificar se não quebrou
# Se OK → próximo commit
# Se QUEBROU → git reset --hard HEAD~1

# Commit 2: Atualizar componentes
git add src/components/FigmaDirectMCP.tsx
git commit -m "refactor: atualizar FigmaDirectMCP para usar apenas REST API"

# Teste novamente...

# E assim por diante...
```

### Fase 3: VALIDAÇÃO

```bash
# Testar tudo funcionando
npm run dev
npm run build

# Se TUDO OK:
git checkout main
git merge simplify-remove-mcp
git push origin main

# Se ALGO DEU ERRADO:
git checkout main
# Estado original preservado!
```

---

## 🔒 Pontos de Segurança

### Backups Múltiplos:
1. ✅ **Branch local**: `backup-before-mcp-removal`
2. ✅ **Branch remoto**: GitHub
3. ✅ **Branch de trabalho**: `simplify-remove-mcp`
4. ✅ **Main intacto**: Até validarmos tudo

### Commits Incrementais:
- 📝 Cada arquivo modificado = 1 commit
- ✅ Teste após cada commit
- 🔄 Fácil reverter se algo der errado

### Testes Entre Commits:
```bash
# Após cada mudança:
npm run dev          # Servidor inicia?
curl http://localhost:3000/  # Página carrega?
curl http://localhost:3000/api/figma-direct-mcp # API responde?
```

---

## 📝 Checklist de Execução

### Antes de Começar:
- [ ] Git está limpo (sem mudanças não commitadas importantes)
- [ ] Sabemos voltar ao estado atual
- [ ] GitHub tem backup remoto
- [ ] Entendemos cada arquivo que vamos modificar

### Durante Mudanças:
- [ ] 1 mudança por vez
- [ ] Commit após cada mudança
- [ ] Teste após cada commit
- [ ] Se quebrar: `git reset --hard HEAD~1`

### Depois de Terminar:
- [ ] Todos os testes passam
- [ ] `npm run build` funciona
- [ ] `npm run dev` funciona
- [ ] API responde corretamente
- [ ] Então fazer merge para main

---

## 🚨 Plano de Emergência

### Se algo der muito errado:

```bash
# Opção 1: Voltar 1 commit
git reset --hard HEAD~1

# Opção 2: Voltar para o backup completo
git checkout backup-before-mcp-removal

# Opção 3: Voltar para main original
git checkout main

# Opção 4: Deletar branch de trabalho e recomeçar
git checkout main
git branch -D simplify-remove-mcp
```

---

## ✅ Arquivos que Vamos Modificar

### Críticos (modificar com cuidado):
1. `src/app/api/figma-direct-mcp/route.ts` - API principal
2. `src/lib/figma-api.ts` - Já tem cache, só ajustar uso
3. `src/components/FigmaDirectMCP.tsx` - Componente principal

### Secundários (menor risco):
4. `src/components/FigmaMCPComponent.tsx`
5. `src/components/FigmaRealMCP.tsx`
6. `src/lib/figma-service.ts`

### Documentação (zero risco):
7. `README.md`
8. `MCP_USAGE.md`
9. `STATUS_MCP.md`

---

## 🎯 Resumo da Estratégia

1. **Commit atual** → Salva cache + documentação
2. **Branch backup** → Snapshot completo do estado atual
3. **Push GitHub** → Backup remoto seguro
4. **Branch trabalho** → Fazer mudanças aqui
5. **Commits pequenos** → Fácil reverter
6. **Testar sempre** → Detectar problemas cedo
7. **Merge só se OK** → Main sempre estável

---

## 💡 Vantagens desta Abordagem

✅ **Zero risco de perder trabalho**
✅ **Fácil reverter qualquer mudança**
✅ **Histórico completo no Git**
✅ **Backup remoto no GitHub**
✅ **Main sempre estável**
✅ **Processo testado e confiável**

---

## 🚀 Pronto para Começar?

Execute os comandos da Fase 1 e estaremos 100% protegidos.

**Probabilidade de problema irreversível: ~0%**

