import axios from 'axios';
import env from '../config';
export const kakaoLogin = async (req, res, next) => {
  console.log('Hello!');
  console.log(req.body);
  return res.send('hello');
};

export const kakaoCallback = async (req, res, next) => {
  console.log('kakao Callback');
  console.log(req.query.code);
  console.log('-----------');
  const authCode = req.query.code;
  const response = await axios.post(
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${env.KAKAO_CLIENT_ID}&redirect_uri=${env.KAKAO_REDIRECT_URL}&code=${authCode}`
  );
  const accessToken = response.data.access_token;
  const refreshToken = response.data.refresh_token;
  console.log(accessToken);
  const user = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
  console.log(user.data);
  const User = {
    email: user.data.kakao_account.email,
    nickname: user.data.properties.nickname,
  };
  return res.send(User);
};
