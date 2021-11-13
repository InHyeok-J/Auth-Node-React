import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
    Container,
    Grid,
    Input,
    Paper,
    Button,
    Typography,
    Divider,
} from "@material-ui/core";

import useInput from "../hooks/useInput";
import { io } from "socket.io-client";
import Chatting from "../components/Chatting";
import { getOneChannelAction } from "../modules/channel";

let socket;
const Channel = ({ match }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [inputText, onInputText, SetInputText] = useInput("");

    const { loading, data, error } = useSelector(
        (state) => state.channelReducer.channel
    );
    const { data: userdata } = useSelector((state) => state.userReducer.users);

    useEffect(() => {
        dispatch(getOneChannelAction(match.params.id));
        //채팅방 소켓 연결
        socket = io(`http://localhost:4000/channel-${match.params.id}`, {
            path: "/socket.io",
            transports: ["websocket"],
        });
    }, []);

    useEffect(() => {
        // 채팅방에 참가.
        if (userdata) {
            socket.emit("join", { userdata: userdata.data });
        }
    }, [userdata]);

    useEffect(() => {
        if (data && userdata) {
            const response = data.participant.find(
                (data) => data.userId === userdata.data.id
            );
            if (response) {
                return true;
            } else {
                alert("채널에 유저가 없습니다.");
                history.push("/");
            }
        }
    }, [data, userdata]);

    useEffect(() => {
        socket.on("onlineList", (data) => {
            console.log(data);
        });
    }, [socket]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const text = {
            context: e.target.value,
            createdAt: new Date().getDate(),
            userdata: userdata.id,
        };
        socket.emit("message", text);
    });

    if (loading) return <div>로딩중..</div>;
    if (!data) return null;

    return (
        <Container width="75%">
            <Paper>
                <Grid container spacing={2}>
                    <Chatting
                        inputText={inputText}
                        onInputText={onInputText}
                        onSubmitHandler={onSubmit}
                    />
                    <Grid item xs={12} sm container>
                        <Grid item xs={12}>
                            <Typography
                                variant="h5"
                                style={{ textAlign: "center" }}
                            >
                                유저 리스트
                            </Typography>
                            <Divider />

                            {data.participant.map((data) => (
                                <span key={data.id}>
                                    <span
                                        style={{
                                            color: "rgb(40,44,51)",
                                            fontSize: "20px",
                                        }}
                                    >
                                        {data.User.name}
                                    </span>
                                    <span style={{ marginRight: "2px" }}>
                                        님
                                    </span>
                                </span>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="h5"
                                style={{ textAlign: "center" }}
                            >
                                채팅 방 리스트
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                style={{ textAlign: "center" }}
                            >
                                그외
                            </Typography>
                            <Divider />
                            <Link to="/">홈으로</Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Channel;
