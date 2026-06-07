import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getRateLimitThrottlerOptions } from './config/rate-limit.config';
import { UsersModule } from './users/users.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        throttlers: [getRateLimitThrottlerOptions()],
      }),
    }),
    UsersModule,
    WebhooksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
