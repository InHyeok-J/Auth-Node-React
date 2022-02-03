// OAuth에서 데이터를 받아오는 미들웨어 처리 함수 모음
import axios from "axios";

export const GetOAuthKakao = async (req, res, next) => {
    try {
        console.log("-----------kakao Login-----------");
        console.log(req.body);
        const response = await axios({
            url: "https://kapi.kakao.com/v2/user/me",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8",
                Authorization: `Bearer ${req.body.token}`,
            },
        });
        // console.log(response);
        const UserData = {
            name: response.data.properties.nickname,
            email: response.data.kakao_account.email,
        };
        req.UserData = UserData; // UserData를 req로 넣고 다음 미들웨어로 넘김
        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
};
