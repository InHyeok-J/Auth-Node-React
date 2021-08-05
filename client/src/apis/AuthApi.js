import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export const UserLogin = async (dataSubmit) => {
    console.log(dataSubmit);
    const response = await axios({
        url: "/api/auth/login",
        method: "post",
        data: dataSubmit,
        //withCredentials: true,
    });
    return response;
};

export const UserSignUp = async (dataSubmit) => {
    const response = await axios({
        url: "/api/auth/signup",
        method: "post",
        data: dataSubmit,
    });
    return response;
};

export const UserLogout = async () => {
    const response = await axios({
        url: "/api/auth/logout",
        method: "get",
    });
    return response;
};

export const GoogleLogin = async () => {
    const response = await axios({
        url: "/api/auth/google/callback",
        method: "get",
    });
    return response;
};

export const KakaoLogin = async (data) => {
    const reponse = await axios({
        url: "/api/Oauth/kakao",
        method: "post",
        data: data,
    });
    return reponse;
};
