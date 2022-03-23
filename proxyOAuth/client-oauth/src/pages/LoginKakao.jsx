import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import KakaoLoginImg from "../assets/kakaologin.png";
import { kakaoPassportAction } from "../modules/user";
const LoginPageWrapper = styled.div`
    width: 800px;
    height: 100vh;
    margin: 0 auto;
`;

const LoginKakaoPage = () => {
    const dispatch = useDispatch();

    const onClickHandler = async () => {
        await dispatch(kakaoPassportAction());
    };

    return (
        <LoginPageWrapper>
            <img src={KakaoLoginImg} onClick={onClickHandler} />
        </LoginPageWrapper>
    );
};
export default LoginKakaoPage;
