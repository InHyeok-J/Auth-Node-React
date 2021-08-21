import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Grid, Input, Paper, Button } from "@material-ui/core";
import Chatting from "../components/Chatting";

const Channel = () => {
    return (
        <Container width="75%">
            <Paper>
                <Grid container spacing={2}>
                    <Chatting />
                    <Grid item xs={12} sm container>
                        <div width="500px" height="500px">
                            z
                        </div>
                        <Link to="/">홈으로</Link>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Channel;
