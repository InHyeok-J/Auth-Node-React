import passportCustom from "passport-custom";
import * as UserRepository from "../../repositorys/UserRepository";

const CustomStrategy = passportCustom.Strategy;

export default (passport) => {
    passport.use(
        "use-Kakao",
        new CustomStrategy(async (req, done) => {
            try {
                console.log(req.UserData);
                const findUser = await UserRepository.findByEmail(
                    req.UserData.email
                );
                if (findUser[0]) {
                    return done(null, findUser[0], { message: "유저 존재" });
                }
                const createUser = await UserRepository.createKakao(
                    req.UserData
                );
                return done(null, createUser);
            } catch (err) {
                console.error(err);
                return done(err);
            }
        })
    );
};
