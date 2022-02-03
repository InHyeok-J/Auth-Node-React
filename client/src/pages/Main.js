import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Grid,
    Input,
    Paper,
    Button,
    Card,
    Typography,
    Divider,
} from "@material-ui/core";
import { logout } from "../modules/user1";
import { logoutAction } from "../modules/user";
function Main() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { user: userData } = useSelector((state) => state.userReducer);

    const onLogout = async () => {
        try {
            console.log("로그아웃 버튼");
            await dispatch(logoutAction());
            alert("로그아웃 성공");
            history.push("/");
        } catch (err) {
            console.error(err.response);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper>
                <Grid container spacing={4} style={{ padding: "10px" }}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h2"
                            style={{ textAlign: "center" }}>
                            메인 페이지 입니다.
                        </Typography>
                    </Grid>
                    {userData ? (
                        <Grid item xs={12}>
                            <span>{userData.data.nickname}님 환영합니다.</span>
                            <Button
                                style={{
                                    backgroundColor: "green",
                                    color: "white",
                                }}
                                onClick={onLogout}>
                                로그아웃
                            </Button>
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
                </Grid>
            </Paper>
        </Container>
    );
}

export default Main;
