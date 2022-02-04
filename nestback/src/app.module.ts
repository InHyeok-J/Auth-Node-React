import emailConfig from 'src/config/email.config';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [emailConfig],
      isGlobal: true,
    }),
    UsersModule,
    EmailModule,
  ],
  controllers: [],
  providers: [EmailService],
})
export class AppModule {}
