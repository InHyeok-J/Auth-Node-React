import axios from "axios";
import React from "react";
import styled from "styled-components";
import KakaoLoginImg from "../assets/kakaologin.png";
const LoginPageWrapper = styled.div`
    width: 800px;
    height: 100vh;
    margin: 0 auto;
`;
const LoginPage = () => {
    const kakaologinUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIEND_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=code`;
    console.log("?");
    return (
        <LoginPageWrapper>
            <a href={kakaologinUrl}>
                <img src={KakaoLoginImg} />
            </a>
        </LoginPageWrapper>
    );
};

export default LoginPage;
