import { EmailService } from './../email/email.service';
import { HttpException, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { UserInfo } from './UserInfo';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    private userRepository: UserRepository,
  ) {}

  async create(name: string, email: string, password: string) {
    const existUser = await this.checkUserExists(email);
    if (existUser) throw new HttpException('email 중복', 400);

    const signupVerifyToken = uuid.v1();
    await this.userRepository.create({
      name,
      email,
      password,
      signupVerifyToken,
    });
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }
  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO
    // 1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    // 2. 바로 로그인 상태가 되도록 JWT를 발급
    const signedUser = await this.userRepository.findByVerifyToken(
      signupVerifyToken,
    );
    if (signedUser.length <= 0) throw new HttpException('error', 400);
    else return '인증 성공';
  }

  async login(email: string, password: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async getUserInfo(userId: number): Promise<UserInfo> {
    // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. 조회된 데이터를 UserInfo 타입으로 응답
    const user = await this.userRepository.findByUnique({ id: userId });
    if (!user) throw new Error('error');
    delete user.password;
    return user;
  }

  private async checkUserExists(email: string) {
    const user = await this.userRepository.findByUnique({ email });
    return user !== undefined;
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }
}
