import { Container, Paper } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import socketClient from "socket.io-client";

const Test = () => {
    let io;
    useEffect(() => {
        console.log("Init");
        io = socketClient("http://localhost:4000/relayMind", {
            transports: ["websocket"],
        });
        io.on("join", (data) => {
            console.log(data);
        });
    }, []);
    return (
        <Container maxWidth="sm">
            <Paper>
                Socket Test
                <button
                    onClick={() => {
                        axios.get("/api");
                    }}>
                    클릭
                </button>
            </Paper>
        </Container>
    );
};

export default Test;
