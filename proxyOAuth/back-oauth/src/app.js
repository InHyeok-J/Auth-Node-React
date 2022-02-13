import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import env from './config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 받은 데이터를 req에 넣어줌.
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(
  session({
    secret: env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.get('/', (req, res, next) => {
  res.send('gd');
});
//All router
app.use('/', routes);

//Error Handler
app.use(errorHandler);

app.listen(env.PORT || 4000, () => {
  console.log(env.PORT + '서버 시작');
});
