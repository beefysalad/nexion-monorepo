import { Controller, Get } from "@nestjs/common"
import type { ApiHealthResponse } from "@workspace/shared"
import { AppService } from "./app.service"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ApiHealthResponse {
    return this.appService.getHello()
  }
}
