import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
// import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByUnique(input: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({
      where: input,
    });
  }

  async findByVerifyToken(token: string) {
    return await this.prisma.user.findMany({
      where: {
        signupVerifyToken: token,
      },
    });
  }

  async create(input: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data: input,
    });
  }
}
