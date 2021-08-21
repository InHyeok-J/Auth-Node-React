import React from "react";
import styled from "styled-components";

const UserName = styled.span`
    padding-left: 10px;
    color: white;
    font-weight: bold;
    font-size: 12px;
    display: block;
`;
const TextFeild = styled.div`
    margin-left: 10px;
    padding: 6px;
    background-color: white;
    display: inline-block;
    width: auto;
    height: auto;
    font-size: 15px;
    border-radius: 5px;
    margin: 5px;
`;
export const InputChattingText = () => {
    return (
        <div>
            <UserName>닉네임</UserName>
            <TextFeild>텍스zzzz트</TextFeild>
        </div>
    );
};

export const ConnectChattingText = () => {
    return (
        <div>
            <TextFeild>님이 입장하셨습니다.</TextFeild>
        </div>
    );
};

export const MyChattingText = () => {
    return (
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <TextFeild style={{ backgroundColor: "yellow" }}>
                텍스zzzz트
            </TextFeild>
        </div>
    );
};
