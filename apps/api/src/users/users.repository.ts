import { Injectable } from '@nestjs/common';
import type {
  CurrentUserResponse,
  GetAllUsersResponse,
} from '@workspace/shared';
import { PrismaService } from '../prisma/prisma.service';

type UpsertClerkUserInput = {
  clerkId: string;
  email: string;
  name: string;
  imageUrl: string | null;
};

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsertClerkUser(
    input: UpsertClerkUserInput,
  ): Promise<CurrentUserResponse> {
    const user = await this.prisma.user.upsert({
      where: {
        clerkId: input.clerkId,
      },
      update: input,
      create: input,
    });

    return {
      id: user.id,
      clerkId: input.clerkId,
      email: user.email,
      name: user.name,
      imageUrl: user.imageUrl,
    };
  }

  async deleteByClerkId(clerkId: string): Promise<void> {
    await this.prisma.user.deleteMany({
      where: {
        clerkId,
      },
    });
  }
  async getAllUsers(): Promise<GetAllUsersResponse> {
    const users = await this.prisma.user.findMany();
    return {
      users,
    };
  }
}
