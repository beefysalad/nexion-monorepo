import { Controller, Get } from "@nestjs/common"
import { AllowAnonymous } from "@thallesp/nestjs-better-auth"
import type { ApiHealthResponse } from "@workspace/shared"
import { AppService } from "./app.service"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AllowAnonymous()
  @Get()
  getHello(): ApiHealthResponse {
    return this.appService.getHello()
  }
}
