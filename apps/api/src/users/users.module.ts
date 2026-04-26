import { Module } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { UsersController } from "./users.controller"
import { UsersRepository } from "./users.repository"
import { UsersService } from "./users.service"

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersRepository, UsersService],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
