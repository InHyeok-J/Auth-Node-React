import axios from "axios";

export const UserLogin = async (dataSubmit) => {
    console.log(dataSubmit);
    const response = await axios({
        url: "/api/user/login",
        method: "post",
        data: dataSubmit,
        //withCredentials: true,
    });
    return response.data;
};

export const UserSignUp = async (dataSubmit) => {
    console.log(dataSubmit);

    const response = await axios({
        url: "/api/user/signup",
        method: "post",
        data: dataSubmit,
    });
    return response.data;
};

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
    const reponse = await axios({
        url: "/api/Oauth/kakao",
        method: "post",
        data: data,
    });
    return reponse;
};

export const GetUser = async () => {
    return await axios({
        url: "/api/user/",
    });
};
