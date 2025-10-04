// Sistema de cache em memória para reduzir chamadas à API do Figma
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export class FigmaCache {
  private cache: Map<string, CacheEntry<any>>;
  private defaultTTL: number; // Time to live em milissegundos

  constructor(defaultTTLMinutes: number = 15) {
    this.cache = new Map();
    this.defaultTTL = defaultTTLMinutes * 60 * 1000;
    
    // Limpar cache periodicamente
    this.startCleanupInterval();
  }

  /**
   * Armazena um valor no cache
   */
  set<T>(key: string, data: T, ttlMinutes?: number): void {
    const ttl = ttlMinutes ? ttlMinutes * 60 * 1000 : this.defaultTTL;
    const timestamp = Date.now();
    
    this.cache.set(key, {
      data,
      timestamp,
      expiresAt: timestamp + ttl,
    });
    
    console.log(`📦 Cache: Armazenado "${key}" (expira em ${ttlMinutes || this.defaultTTL / 60000}min)`);
  }

  /**
   * Recupera um valor do cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      console.log(`📦 Cache: Miss para "${key}"`);
      return null;
    }

    // Verificar se expirou
    if (Date.now() > entry.expiresAt) {
      console.log(`📦 Cache: Expirado "${key}"`);
      this.cache.delete(key);
      return null;
    }

    console.log(`📦 Cache: Hit para "${key}" (idade: ${Math.round((Date.now() - entry.timestamp) / 1000)}s)`);
    return entry.data as T;
  }

  /**
   * Remove um valor específico do cache
   */
  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      console.log(`📦 Cache: Removido "${key}"`);
    }
    return deleted;
  }

  /**
   * Remove todos os valores do cache que correspondem a um padrão
   */
  deletePattern(pattern: string): number {
    let count = 0;
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
        count++;
      }
    }
    console.log(`📦 Cache: Removidos ${count} itens com padrão "${pattern}"`);
    return count;
  }

  /**
   * Limpa todo o cache
   */
  clear(): void {
    const size = this.cache.size;
    this.cache.clear();
    console.log(`📦 Cache: Limpo (${size} itens removidos)`);
  }

  /**
   * Retorna estatísticas do cache
   */
  getStats() {
    const now = Date.now();
    let validEntries = 0;
    let expiredEntries = 0;

    for (const entry of this.cache.values()) {
      if (now > entry.expiresAt) {
        expiredEntries++;
      } else {
        validEntries++;
      }
    }

    return {
      total: this.cache.size,
      valid: validEntries,
      expired: expiredEntries,
      defaultTTLMinutes: this.defaultTTL / 60000,
    };
  }

  /**
   * Executa uma função com cache automático
   */
  async wrap<T>(
    key: string,
    fn: () => Promise<T>,
    ttlMinutes?: number
  ): Promise<T> {
    // Tentar obter do cache primeiro
    const cached = this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // Se não estiver no cache, executar a função
    console.log(`📦 Cache: Executando função para "${key}"`);
    const data = await fn();
    
    // Armazenar no cache
    this.set(key, data, ttlMinutes);
    
    return data;
  }

  /**
   * Inicia um intervalo para limpar entradas expiradas
   */
  private startCleanupInterval(): void {
    // Limpar cache a cada 5 minutos
    setInterval(() => {
      const now = Date.now();
      let cleaned = 0;

      for (const [key, entry] of this.cache.entries()) {
        if (now > entry.expiresAt) {
          this.cache.delete(key);
          cleaned++;
        }
      }

      if (cleaned > 0) {
        console.log(`📦 Cache: Limpeza automática removeu ${cleaned} itens expirados`);
      }
    }, 5 * 60 * 1000); // 5 minutos
  }
}

// Instância singleton do cache
let cacheInstance: FigmaCache | null = null;

/**
 * Retorna a instância singleton do cache
 */
export function getFigmaCache(): FigmaCache {
  if (!cacheInstance) {
    // Cache padrão de 15 minutos
    cacheInstance = new FigmaCache(15);
    console.log('📦 Cache: Instância criada (TTL padrão: 15 minutos)');
  }
  return cacheInstance;
}

/**
 * Gera uma chave de cache consistente para requisições da API do Figma
 */
export function generateCacheKey(
  type: 'metadata' | 'code' | 'screenshot' | 'variables' | 'file',
  identifier: string,
  params?: Record<string, any>
): string {
  const baseKey = `figma:${type}:${identifier}`;
  
  if (params && Object.keys(params).length > 0) {
    // Adicionar parâmetros ordenados à chave
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    return `${baseKey}?${sortedParams}`;
  }
  
  return baseKey;
}

