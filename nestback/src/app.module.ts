import emailConfig from 'src/config/email.config';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { loggingMiddleware } from './common/middleware/prisma.logger.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [emailConfig],
      isGlobal: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
      },
    }),
    UsersModule,
    EmailModule,
  ],
  controllers: [],
  providers: [EmailService],
})
export class AppModule {}
