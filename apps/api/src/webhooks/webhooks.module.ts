import { Module } from "@nestjs/common"
import { UsersModule } from "../users/users.module"
import { ClerkWebhooksController } from "./clerk-webhooks.controller"

@Module({
  imports: [UsersModule],
  controllers: [ClerkWebhooksController],
})
export class WebhooksModule {}
