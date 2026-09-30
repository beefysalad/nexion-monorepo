import { Injectable } from "@nestjs/common"
import type { GetAllUsersResponse } from "@workspace/shared"
import { UsersRepository } from "./users.repository"

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsers(): Promise<GetAllUsersResponse> {
    return this.usersRepository.getAllUsers()
  }
}
