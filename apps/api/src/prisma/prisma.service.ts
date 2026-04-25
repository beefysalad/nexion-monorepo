import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { config as loadEnv } from 'dotenv';
import { PrismaClient } from '../generated/prisma/client';
import type { PrismaClient as PrismaClientType } from '../generated/prisma/client';

@Injectable()
export class PrismaService implements OnModuleDestroy {
  private readonly client: PrismaClientType;

  constructor() {
    if (!process.env.DATABASE_URL) {
      const envPath = [
        '.env',
        'apps/api/.env',
        join(__dirname, '../../.env'),
      ].find((path) => existsSync(path));

      if (envPath) {
        loadEnv({ path: envPath });
      }
    }

    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL is required to initialize Prisma');
    }

    this.client = new PrismaClient({
      adapter: new PrismaPg(connectionString),
    });
  }

  get user(): PrismaClientType['user'] {
    return this.client.user;
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.$disconnect();
  }
}
