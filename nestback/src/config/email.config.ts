import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  service: process.env.EMAIL_SERVICE,
  user: process.env.EMAIL_AUTH_USER,
  password: process.env.EMAIL_AUTH_PASSWORD,
  baseUrl: process.env.EMAIL_BASE_URL,
  host: process.env.EMAIL_HOST,
}));
