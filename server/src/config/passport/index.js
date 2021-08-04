import * as UserRepository from "../../repositorys/UserRepository";
import localStrategy from "./localStrategy";
export default (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser(async (user, done) => {
        try {
            const findUser = await UserRepository.findByEmail(user.email);
            if (!findUser[0]) done(new Error({ message: "Wrong User Id" }));
            done(null, findUser[0]);
        } catch (err) {
            done(err);
        }
    });
    localStrategy(passport);
};
