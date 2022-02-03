import * as UserRepository from "../repositorys/UserRepository";
import bcrypt from "bcrypt";
import passport from "passport";
import statusCode from "../utils/statusCode";
import resutils from "../utils/resutils";

export const signup = async (req, res, next) => {
    const { name, nickname, email, password } = req.body;
    if (!name || !nickname || !email || !password) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(resutils.fail(statusCode.BAD_REQUEST, "필요 값 없음"));
    }
    try {
        const exUser = await UserRepository.findByEmail(req.body.email);
        console.log(exUser);
        if (exUser[0]) {
            return res
                .status(400)
                .send(resutils.fail(400, "이미 존재하는 유저입니다."));
        }
        req.body.password = await bcrypt.hash(req.body.password, 10);

        const user = await UserRepository.createLocal(req.body);
        if (user) {
            return res
                .status(statusCode.OK)
                .send(resutils.success(statusCode.OK, "회원가입 성공"));
        } else {
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .send(
                    resutils.fail(
                        statusCode.INTERNAL_SERVER_ERROR,
                        "알수 없는 에러 발생"
                    )
                );
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const login = (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(resutils.fail(statusCode.BAD_REQUEST, "필요 값 없음"));
    }
    passport.authenticate("local", (err, user) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send({ message: "이메일과 패스워드를 확인해주세요" });
        }
        req.logIn(user, function (err) {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res
                .status(statusCode.OK)
                .send(resutils.successData(statusCode.OK, "로그인성공", user));
        });
    })(req, res, next);
};

export const logout = (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            next(err);
        } else {
            res.clearCookie("connect.sid");
            res.status(statusCode.OK).send(
                resutils.success(statusCode.OK, "로그아웃 성공")
            );
        }
    });
};

export const GetUser = async (req, res, next) => {
    try {
        if (req.user) {
            const user = await UserRepository.findById(req.user.id);
            return res
                .status(200)
                .send(resutils.successData(200, "유저 정보 확인 성공", user));
        } else {
            return res
                .status(401)
                .json(resutils.fail(401, "유저 정보 확인 실패"));
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};
