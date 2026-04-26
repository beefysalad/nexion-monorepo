import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { UsersModule } from "./users/users.module"
import { WebhooksModule } from "./webhooks/webhooks.module"

@Module({
  imports: [UsersModule, WebhooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
