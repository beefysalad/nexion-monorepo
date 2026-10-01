import { Injectable } from "@nestjs/common"
import type { GetAllUsersResponse } from "@workspace/shared"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<GetAllUsersResponse> {
    const users = await this.prisma.db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        imageUrl: true,
      },
    })

    return { users }
  }
}
