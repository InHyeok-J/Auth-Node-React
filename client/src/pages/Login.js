import React, { useCallback, useEffect } from "react";
import useInput from "../hooks/useInput";
import { loginAction } from "../modules/user";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Grid, Input, Paper, Button } from "@material-ui/core";

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useInput("");
    const [password, setPassword] = useInput("");
    const { loading, data, error } = useSelector(
        (state) => state.userReducer.users
    );
    console.log("상태:", loading, data, error);
    const LoginHandler = useCallback(() => {
        const data = {
            email,
            password,
        };
        console.log(data);

        dispatch(loginAction(data));
    }, [email, password]);

    useEffect(() => {
        if (data) {
            console.log(data);
            alert(data.message);
            history.push("/");
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            console.log(error);
            alert(error.message);
            history.push("/login");
        }
    }, [error]);

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
                        xs={12}
                    >
                        로그인 페이지
                    </Grid>
                    <Grid
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                        item
                        xs={6}
                    >
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
                        xs={6}
                    >
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
                        xs={3}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <Button variant="contained" onClick={LoginHandler}>
                            로그인
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <Button>
                            <img
                                src="/images/kakao_login_medium.png"
                                alt="카카오로그인ㄴ"
                            />
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <Button>
                            <img
                                src="/images/google_login.png"
                                alt="구글로그인"
                            />
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <Button>
                            <Link
                                to="/signup"
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                    fontSize: "1.1rem",
                                }}
                            >
                                회원가입
                            </Link>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default Login;
