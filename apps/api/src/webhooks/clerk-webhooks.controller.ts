import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
  Req,
  UnauthorizedException,
} from "@nestjs/common"
import { Webhook } from "standardwebhooks"
import type { RawBodyRequest } from "@nestjs/common"
import type { Request } from "express"
import { UsersRepository } from "../users/users.repository"

type ClerkEmailAddress = {
  id: string
  email_address: string
}

type ClerkUserData = {
  id: string
  email_addresses?: ClerkEmailAddress[]
  first_name?: string | null
  image_url?: string | null
  last_name?: string | null
  primary_email_address_id?: string | null
  username?: string | null
}

type ClerkDeletedUserData = {
  id?: string
  deleted?: boolean
}

type ClerkUserEvent = {
  data: ClerkUserData
  type: "user.created" | "user.updated"
}

type ClerkDeletedUserEvent = {
  data: ClerkDeletedUserData
  type: "user.deleted"
}

type ClerkWebhookEvent = ClerkUserEvent | ClerkDeletedUserEvent

@Controller("webhooks/clerk")
export class ClerkWebhooksController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Post()
  async handleClerkWebhook(
    @Req() request: RawBodyRequest<Request>,
    @Body() body: unknown,
    @Headers("webhook-id") webhookId?: string,
    @Headers("webhook-timestamp") webhookTimestamp?: string,
    @Headers("webhook-signature") webhookSignature?: string,
    @Headers("svix-id") svixId?: string,
    @Headers("svix-timestamp") svixTimestamp?: string,
    @Headers("svix-signature") svixSignature?: string
  ): Promise<{ received: true }> {
    const event = this.verifyWebhookEvent(request, body, {
      "webhook-id": webhookId ?? svixId,
      "webhook-timestamp": webhookTimestamp ?? svixTimestamp,
      "webhook-signature": webhookSignature ?? svixSignature,
    })

    if (event.type === "user.deleted") {
      if (event.data.id) {
        await this.usersRepository.deleteByClerkId(event.data.id)
      }

      return { received: true }
    }

    await this.usersRepository.upsertClerkUser(this.toUpsertInput(event.data))

    return { received: true }
  }

  private verifyWebhookEvent(
    request: RawBodyRequest<Request>,
    body: unknown,
    headers: {
      "webhook-id"?: string
      "webhook-timestamp"?: string
      "webhook-signature"?: string
    }
  ): ClerkWebhookEvent {
    const secret =
      process.env.CLERK_WEBHOOK_SIGNING_SECRET ??
      process.env.CLERK_WEBHOOK_SECRET

    if (!secret) {
      throw new BadRequestException("Missing CLERK_WEBHOOK_SIGNING_SECRET")
    }

    if (
      !headers["webhook-id"] ||
      !headers["webhook-timestamp"] ||
      !headers["webhook-signature"]
    ) {
      throw new UnauthorizedException("Missing Clerk webhook signature headers")
    }

    const payload = request.rawBody ?? JSON.stringify(body)

    try {
      return new Webhook(secret).verify(payload, {
        "webhook-id": headers["webhook-id"],
        "webhook-timestamp": headers["webhook-timestamp"],
        "webhook-signature": headers["webhook-signature"],
      }) as ClerkWebhookEvent
    } catch {
      throw new UnauthorizedException("Invalid Clerk webhook signature")
    }
  }

  private toUpsertInput(user: ClerkUserData) {
    const primaryEmail =
      user.email_addresses?.find(
        (email) => email.id === user.primary_email_address_id
      ) ?? user.email_addresses?.[0]

    if (!primaryEmail) {
      throw new BadRequestException("Clerk user has no email address")
    }

    const name =
      [user.first_name, user.last_name].filter(Boolean).join(" ") ||
      user.username ||
      primaryEmail.email_address

    return {
      clerkId: user.id,
      email: primaryEmail.email_address,
      name,
      imageUrl: user.image_url ?? null,
    }
  }
}
