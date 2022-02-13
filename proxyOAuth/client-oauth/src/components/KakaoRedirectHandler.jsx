import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { KakaoLoginAction } from "../modules/user";

const KakaoRedirectHandler = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        const KakaoLogin = async () => {
            const query = new URLSearchParams(window.location.search);
            const code = query.get("code");
            await dispatch(KakaoLoginAction(code));
            alert("회원가입 성공!");
            history.push("/");
        };
        KakaoLogin();
    }, []);
    console.log("???");
    return <div>로그인 하는중..</div>;
};
export default KakaoRedirectHandler;
