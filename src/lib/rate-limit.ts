interface RateLimitRecord {
  timestamps: number[];
}

const cache = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of cache.entries()) {
    record.timestamps = record.timestamps.filter((ts) => now - ts < 15 * 60 * 1000);
    if (record.timestamps.length === 0) {
      cache.delete(key);
    }
  }
}, 10 * 60 * 1000);

export interface RateLimitOptions {
  limit: number; // max requests
  windowMs: number; // in milliseconds
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { limit: 10, windowMs: 15 * 60 * 1000 }
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const windowStart = now - options.windowMs;

  const record = cache.get(identifier) || { timestamps: [] };
  const validTimestamps = record.timestamps.filter((ts) => ts > windowStart);

  if (validTimestamps.length >= options.limit) {
    const oldestTimestamp = validTimestamps[0];
    const reset = Math.ceil((oldestTimestamp + options.windowMs - now) / 1000);
    return {
      success: false,
      remaining: 0,
      reset: Math.max(1, reset),
    };
  }

  validTimestamps.push(now);
  cache.set(identifier, { timestamps: validTimestamps });

  return {
    success: true,
    remaining: options.limit - validTimestamps.length,
    reset: Math.ceil(options.windowMs / 1000),
  };
}
