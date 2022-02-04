import { EmailModule } from './../email/email.module';
import { EmailService } from './../email/email.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [EmailModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
