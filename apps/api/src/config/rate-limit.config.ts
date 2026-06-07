import type { ThrottlerOptions } from '@nestjs/throttler';

const DEFAULT_RATE_LIMIT_TTL_MS = 60_000;
const DEFAULT_RATE_LIMIT_MAX = 100;
const DEFAULT_RATE_LIMIT_BLOCK_DURATION_MS = 60_000;

function getPositiveIntegerEnv(name: string, fallback: number): number {
  const rawValue = process.env[name];

  if (!rawValue) {
    return fallback;
  }

  const value = Number(rawValue);

  if (!Number.isInteger(value) || value <= 0) {
    return fallback;
  }

  return value;
}

function getRateLimitThrottlerOptions(): ThrottlerOptions {
  return {
    ttl: getPositiveIntegerEnv('RATE_LIMIT_TTL_MS', DEFAULT_RATE_LIMIT_TTL_MS),
    limit: getPositiveIntegerEnv('RATE_LIMIT_MAX', DEFAULT_RATE_LIMIT_MAX),
    blockDuration: getPositiveIntegerEnv(
      'RATE_LIMIT_BLOCK_DURATION_MS',
      DEFAULT_RATE_LIMIT_BLOCK_DURATION_MS,
    ),
  };
}

export { getRateLimitThrottlerOptions };
