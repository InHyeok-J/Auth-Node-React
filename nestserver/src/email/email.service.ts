import { Inject, Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';
import emailConfig from 'src/config/email.config';
import { ConfigType } from '@nestjs/config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: this.config.service,
      port: 465,
      host: this.config.host,
      auth: {
        user: this.config.user,
        pass: this.config.password,
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = this.config.baseUrl;
    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;
    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
            가입확인 버튼을 누르시면 가입 인증이 완료됩니다. <br/>
            <form action="${url}" method="POST">
                <button>가입확인</button>
            </form>
          `,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
