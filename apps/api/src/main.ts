import { existsSync } from 'node:fs';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  if (existsSync('.env')) {
    process.loadEnvFile('.env');
  }

  const app = await NestFactory.create(AppModule, { rawBody: true });
  const corsOrigin = process.env.CORS_ORIGIN;

  if (corsOrigin) {
    app.enableCors({
      origin: corsOrigin.split(',').map((origin) => origin.trim()),
    });
  }

  await app.listen(Number(process.env.PORT ?? 3000));
}
bootstrap();
