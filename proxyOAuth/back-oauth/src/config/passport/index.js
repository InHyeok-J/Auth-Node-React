import * as UserRepository from '../../repositories/userRepository';
import kakaoStrategy from './kakaoStrategy';

export default (passport) => {
  passport.serializeUser((user, done) => {
    console.log('-------serializeUser---------');
    done(null, user);
  });
  passport.deserializeUser(async (user, done) => {
    console.log('-------deserializeUser---------');
    try {
      const findUser = await UserRepository.findByEmail(user.email);
      if (!findUser[0]) done(new Error({ message: 'Wrong User Id' }));
      done(null, findUser[0]);
    } catch (err) {
      done(err);
    }
  });
  kakaoStrategy(passport);
};
