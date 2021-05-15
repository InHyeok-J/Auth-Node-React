import React from "react";
import { Container, FormBlock, Input, Button } from "./styles";
import useInput from "../hooks/useInput";

function SignUp() {
  const [name, setName] = useInput("");
  const [nickName, setNickName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  return (
    <Container>
      <div className="main-text">회원가입 페이지</div>
      <FormBlock>
        <div className="left-block">이름 :</div>
        <Input type="text" value={name} onChange={setName} />
      </FormBlock>
      <FormBlock>
        <div className="left-block">닉네임 :</div>
        <Input type="text" value={nickName} onChange={setNickName} />
      </FormBlock>
      <FormBlock>
        <div className="left-block">Eamil :</div>
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

export default SignUp;
