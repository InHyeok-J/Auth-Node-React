import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./styles";

function Main() {
  return (
    <Container>
      <div className="main-text">메인 페이지 입니다.</div>
      <Link to="/login">
        <div>로그인 하러 가기</div>
      </Link>
      <Link to="/signup">
        <div>회원가입 하러 가기</div>
      </Link>
    </Container>
  );
}

export default Main;
