import { existsSync } from "node:fs"

import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { getTrustedOrigins } from "./auth/auth.config"

async function bootstrap() {
  if (existsSync(".env")) {
    process.loadEnvFile(".env")
  }

  const app = await NestFactory.create(AppModule, {
    // Required by Better Auth, which parses auth request bodies itself.
    bodyParser: false,
  })

  // Same origin list Better Auth trusts, so CORS and auth never disagree.
  app.enableCors({
    origin: getTrustedOrigins(),
    credentials: true,
  })

  await app.listen(Number(process.env.PORT ?? 3000))
}
void bootstrap()
