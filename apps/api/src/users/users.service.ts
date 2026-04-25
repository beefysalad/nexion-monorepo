import { BadRequestException, Injectable } from '@nestjs/common';
import { createClerkClient } from '@clerk/backend';
import type { CurrentUserResponse } from '@workspace/shared';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async syncCurrentUser(clerkUserId: string): Promise<CurrentUserResponse> {
    const secretKey = process.env.CLERK_SECRET_KEY;

    if (!secretKey) {
      throw new BadRequestException('Missing CLERK_SECRET_KEY');
    }

    const clerk = createClerkClient({ secretKey });
    const clerkUser = await clerk.users.getUser(clerkUserId);
    const primaryEmail =
      clerkUser.emailAddresses.find(
        (email) => email.id === clerkUser.primaryEmailAddressId,
      ) ?? clerkUser.emailAddresses[0];

    if (!primaryEmail) {
      throw new BadRequestException('Clerk user has no email address');
    }

    const name =
      [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') ||
      clerkUser.username ||
      primaryEmail.emailAddress;

    return this.usersRepository.upsertClerkUser({
      clerkId: clerkUser.id,
      email: primaryEmail.emailAddress,
      name,
      imageUrl: clerkUser.imageUrl || null,
    });
  }
}
