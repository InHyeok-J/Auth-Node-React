import * as UserRepository from '../../repositories/userRepository';
import env from '../index';

const KakaoStrategy = require('passport-kakao').Strategy;
export default (passport) => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: env.KAKAO_CLIENT_ID,
        callbackURL: 'http://localhost:3001/api/auth/kakao-passport',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('accessToken:', accessToken);
        // console.log(profile);
        try {
          const findUser = await UserRepository.findByEmail(
            profile._json.kakao_account.email
          );
          if (findUser[0]) {
            return done(null, findUser[0], {
              message: '유저 존재',
            });
          }
          let Data = {
            email: profile._json.kakao_account.email,
            name: profile.username,
          };
          console.log(Data);
          console.log('--------------');
          const createUser = await UserRepository.createKakao(Data);
          return done(null, createUser);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );
};
