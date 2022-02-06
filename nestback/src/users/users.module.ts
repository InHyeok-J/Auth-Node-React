import { EmailModule } from './../email/email.module';
import { EmailService } from './../email/email.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  imports: [EmailModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
