import axios from "axios";

export const UserLogout = async () => {
    const response = await axios({
        url: "/api/user/logout",
        method: "get",
    });
    return response.data;
};

export const GoogleLogin = async () => {
    const response = await axios({
        url: "/api/user/google/callback",
        method: "get",
    });
    return response.data;
};

export const KakaoLogin = async (data) => {
    const response = await axios({
        url: `http://localhost:3001/api/auth/kakao-callback?code=${data}`,
        method: "get",
    });
    return response;
};

export const GetUser = async () => {
    return await axios({
        url: "/api/user/",
    });
};
