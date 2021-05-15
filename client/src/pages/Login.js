import React from "react";
import { FormBlock, Input, Button, Container } from "./styles";
import useInput from "../hooks/useInput";

function Login() {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  return (
    <Container>
      <div className="main-text">로그인 페이지</div>
      <FormBlock>
        <div className="left-block">email :</div>
        <Input type="email" value={email} onChange={setEmail} />
      </FormBlock>
      <FormBlock>
        <div className="left-block">password :</div>
        <Input type="password" value={password} onChange={setPassword} />
      </FormBlock>
      <FormBlock>
        <Button>로그인</Button>
      </FormBlock>
    </Container>
  );
}

export default Login;
