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
import { logout } from "../modules/user";
import { getAllChannelAction, joinChannelAction } from "../modules/channel";
function Main() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [timeValue, setTimeValue] = useState(null);

    const onChangeTime = useCallback(
        (e) => {
            setTimeValue(e.target.value);
            console.log(timeValue);
        },
        [timeValue]
    );

    const { loading, data: userData, error } = useSelector(
        (state) => state.userReducer.users
    );

    const {
        loading: Channelloading,
        data: ChannelData,
        error: ChannelError,
    } = useSelector((state) => state.channelReducer.channellist);

    useEffect(() => {
        dispatch(getAllChannelAction());
    }, []);

    const onLogout = useCallback(() => {
        dispatch(logout());
        alert("로그아웃 성공");
        history.push("/");
    }, [dispatch, history]);

    const onJoinChannel = useCallback(
        (id) => {
            dispatch(joinChannelAction(id));
        },
        [dispatch]
    );

    if (Channelloading) return <div>로딩중..</div>;
    if (!ChannelData) return null;

    return (
        <Container maxWidth="sm">
            <Paper>
                <input
                    type="datetime-local"
                    value={timeValue}
                    onChange={onChangeTime}
                />
                <Grid container spacing={4} style={{ padding: "10px" }}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h2"
                            style={{ textAlign: "center" }}
                        >
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
                                onClick={onLogout}
                            >
                                로그아웃
                            </Button>
                            <div>
                                <Divider />
                                <div
                                    style={{
                                        textAlign: "center",
                                        margin: "10px",
                                    }}
                                >
                                    채널리스트
                                </div>
                                <Divider />
                                <div
                                    style={{
                                        marginTop: "10px",
                                    }}
                                >
                                    {ChannelData.map((data, index) => (
                                        <Card
                                            style={{
                                                width: "100px",
                                                padding: "10px",
                                                textAlign: "center",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {data.name}채널
                                            {data.participant.find(
                                                (data) =>
                                                    data.userId ===
                                                    userData.data.id
                                            ) ? (
                                                <Link
                                                    to={`/channel/${data.id}`}
                                                    key={index}
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <Button>채널 입장</Button>
                                                </Link>
                                            ) : (
                                                <Button
                                                    onClick={() =>
                                                        onJoinChannel(data.id)
                                                    }
                                                >
                                                    채널 가입
                                                </Button>
                                            )}
                                        </Card>
                                    ))}
                                </div>
                            </div>
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
