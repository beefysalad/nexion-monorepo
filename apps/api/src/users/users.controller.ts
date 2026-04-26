import { Controller, Get, Post, UseGuards } from "@nestjs/common"
import type {
  CurrentUserResponse,
  GetAllUsersResponse,
} from "@workspace/shared"
import { ClerkUserId } from "../common/decorators/clerk-user-id.decorator"
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard"
import { UsersService } from "./users.service"

@Controller("users")
@UseGuards(ClerkAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("me/sync")
  syncCurrentUser(
    @ClerkUserId() clerkUserId: string
  ): Promise<CurrentUserResponse> {
    return this.usersService.syncCurrentUser(clerkUserId)
  }

  @Get("me")
  getCurrentUser(
    @ClerkUserId() clerkUserId: string
  ): Promise<CurrentUserResponse> {
    return this.usersService.syncCurrentUser(clerkUserId)
  }

  @Get("all")
  async getAllUsers(): Promise<GetAllUsersResponse> {
    return await this.usersService.getAllUsers()
  }
}
