import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export const GetAllChannel = async () => {
    return await axios({
        url: "/api/Channel",
        method: "get",
    });
};

export const GetChannel = async ({ channelId }) => {
    return await axios({
        url: `/api/Channel/${channelId}`,
        method: "get",
    });
};

export const JoinChannel = async (data) => {
    return await axios({
        url: "/api/Channel/join",
        method: "post",
        data: data,
    });
};
