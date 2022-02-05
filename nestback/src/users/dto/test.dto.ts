import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTest {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;
}
