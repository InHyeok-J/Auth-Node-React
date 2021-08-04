import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, Input, Paper, Button } from "@material-ui/core";
import { logout } from "../modules/user";
function Main() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { loading, data, error } = useSelector(
        (state) => state.userReducer.users
    );

    const onLogout = useCallback(() => {
        dispatch(logout());
        alert("로그아웃 성공");
        history.push("/");
    }, [dispatch, history]);

    return (
        <Container maxWidth="sm">
            <Paper>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <div style={{ textAlign: "center" }}>
                            메인 페이지 입니다.
                        </div>
                    </Grid>
                    {data ? (
                        <Grid item xs={12}>
                            <div>{data.data.nickname}님 환영합니다.</div>
                            <Button onClick={onLogout}>로그아웃</Button>
                        </Grid>
                    ) : (
                        <Grid item xs={12}>
                            <Link to="/login">
                                <div>로그인 하러 가기</div>
                            </Link>
                            <Link to="/signup">
                                <div>회원가입 하러 가기</div>
                            </Link>
                        </Grid>
                    )}
                    <Grid></Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default Main;
