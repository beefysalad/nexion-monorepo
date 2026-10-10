import { Controller, Get } from "@nestjs/common"
import type { GetAllUsersResponse } from "@workspace/shared"
import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("all")
  getAllUsers(): Promise<GetAllUsersResponse> {
    return this.usersService.getAllUsers()
  }
}
