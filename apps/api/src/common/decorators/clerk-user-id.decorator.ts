import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import type { RequestWithClerkAuth } from "../guards/clerk-auth.guard"

export const ClerkUserId = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest<RequestWithClerkAuth>()

    if (!request.clerkAuth?.userId) {
      throw new Error("Clerk user id is missing from request")
    }

    return request.clerkAuth.userId
  }
)
