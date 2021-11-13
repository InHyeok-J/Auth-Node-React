import React from "react";
import {
    Container,
    Grid,
    Input,
    Paper,
    Button,
    Box,
    Typography,
    TextField,
} from "@material-ui/core";
import {
    InputChattingText,
    ConnectChattingText,
    MyChattingText,
} from "./ChattingText";
import styled from "styled-components";

const Chatting = ({ inputText, onInputText, onSubmitHandler }) => {
    return (
        <Grid item xs={6}>
            <Typography variant="h5" style={{ textAlign: "center" }}>
                ChattingRoom
            </Typography>
            <ChatList>
                <InputChattingText />
                <ConnectChattingText />
                <MyChattingText />
            </ChatList>
            <form style={{ display: "flex" }}>
                <ChatInput
                    type="text"
                    rows="5"
                    value={inputText}
                    onChange={onInputText}
                ></ChatInput>
                <Button
                    onSubmit={onSubmitHandler}
                    style={{
                        width: "20%",
                        backgroundColor: "rgb(248, 248, 248)",
                        border: "1px solid black",
                        fontSize: "24px",
                    }}
                >
                    전송
                </Button>
            </form>
        </Grid>
    );
};

export default Chatting;

const ChatList = styled.div`
    padding: 5px;
    width: 100%;
    height: 600px;
    background-color: rgb(186, 201, 215);
`;
const ChatInput = styled.textarea`
    width: 80%;
    height: 50px;
    padding: 10px;
    background-color: rgb(248, 248, 248);
`;
