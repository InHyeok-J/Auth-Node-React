import axios from "axios";

export const UserLogin = async (dataSubmit) => {
  const response = await axios({
    url: "/user/login",
    method: "post",
    data: dataSubmit,
    withCredentials: true,
  });
  return response;
};

export const UserSignUp = async (dataSubmit) => {
  const response = await axios({
    url: "/user/signup",
    method: "post",
    data: dataSubmit,
  });
  return response;
};

export const UserLogout = async () => {
  const response = await axios({
    url: "/user/logout",
    method: "get",
  });
  return response;
};
