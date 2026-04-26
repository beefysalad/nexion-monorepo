import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { verifyToken } from "@clerk/backend"
import type { Request } from "express"

type RequestWithClerkAuth = Request & {
  clerkAuth?: {
    userId: string
  }
}

function getBearerToken(request: Request): string | null {
  const header = request.headers.authorization

  if (!header) {
    return null
  }

  const [scheme, token] = header.split(" ")

  if (scheme !== "Bearer" || !token) {
    return null
  }

  return token
}

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithClerkAuth>()
    const token = getBearerToken(request)

    if (!token) {
      throw new UnauthorizedException("Missing Clerk bearer token")
    }

    const secretKey = process.env.CLERK_SECRET_KEY

    if (!secretKey) {
      throw new UnauthorizedException("Missing CLERK_SECRET_KEY")
    }

    try {
      const payload = await verifyToken(token, { secretKey })

      if (!payload.sub) {
        throw new UnauthorizedException("Invalid Clerk token")
      }

      request.clerkAuth = {
        userId: payload.sub,
      }

      return true
    } catch {
      throw new UnauthorizedException("Invalid Clerk token")
    }
  }
}

export type { RequestWithClerkAuth }
