import React, { useCallback, useEffect } from "react";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Grid, Input, Paper, Button } from "@material-ui/core";
import { signUpAction } from "../modules/user";

function SignUp() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useInput("");
    const [nickname, setNickName] = useInput("");
    const [email, setEmail] = useInput("");
    const [password, setPassword] = useInput("");

    const onSignupHandler = useCallback(
        async (e) => {
            try {
                let data = {
                    name,
                    nickname,
                    email,
                    password,
                };
                await dispatch(signUpAction(data));
                alert("회원가입 성공!");
                history.push("/");
            } catch (err) {
                console.error(err.response);
                alert("회원가입 실패");
            }
        },
        [name, nickname, email, password]
    );

    return (
        <Container maxWidth="sm">
            <Paper>
                <Grid container spacing={3}>
                    <Grid
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "blue",
                            fontSize: "2rem",
                        }}
                        item
                        xs={12}>
                        회원가입 페이지
                    </Grid>
                    <Grid
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                        item
                        xs={6}>
                        <div>이름:</div>
                    </Grid>
                    <Grid item xs={5}>
                        <Input
                            fullWidth
                            placeholder="이름"
                            type="text"
                            value={name}
                            onChange={setName}
                        />
                    </Grid>
                    <Grid
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                        item
                        xs={6}>
                        <div>닉네임:</div>
                    </Grid>
                    <Grid item xs={5}>
                        <Input
                            fullWidth
                            placeholder="닉네임"
                            type="text"
                            value={nickname}
                            onChange={setNickName}
                        />
                    </Grid>
                    <Grid
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                        item
                        xs={6}>
                        <div>email:</div>
                    </Grid>
                    <Grid item xs={5}>
                        <Input
                            fullWidth
                            placeholder="email"
                            type="email"
                            value={email}
                            onChange={setEmail}
                        />
                    </Grid>
                    <Grid
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                        item
                        xs={6}>
                        <div>password:</div>
                    </Grid>
                    <Grid item xs={5}>
                        <Input
                            fullWidth
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={setPassword}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="contained" onClick={onSignupHandler}>
                            회원가입
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default SignUp;
