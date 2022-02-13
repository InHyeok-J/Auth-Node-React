import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainPageWrapper = styled.div`
    width: 800px;
    height: 100vh;
    margin: 0 auto;
`;

const MainPage = () => {
    return (
        <MainPageWrapper>
            <h2>로그인 연습 페이지 입니다.</h2>
            <Link to="login">로그인</Link>
        </MainPageWrapper>
    );
};

export default MainPage;
