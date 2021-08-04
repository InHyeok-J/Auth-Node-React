import express from "express";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import env from "./config";
import AuthController from "./controllers/AuthController";
import passportConfig from "./config/passport";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

passportConfig(passport);
app.set("port", env.PORT || 3001);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(
    session({
        secret: env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: true, // saveUnintialized: resave와 비슷함. true로 세팅될 경우, 세션이 초기화되지 않은 경우에도 세션이 강제로 저장됨.
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", AuthController);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = porcess.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});
