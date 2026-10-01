import { Controller, Get } from "@nestjs/common"
import type { GetAllUsersResponse } from "@workspace/shared"
import { UsersService } from "./users.service"

// TODO: no authentication is configured. Protect this controller with an auth
// guard once an auth provider is added, since it exposes user emails.
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("all")
  getAllUsers(): Promise<GetAllUsersResponse> {
    return this.usersService.getAllUsers()
  }
}
