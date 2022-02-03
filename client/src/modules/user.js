import { createAction, handleActions } from "redux-actions";
import * as userApi from "../apis/userApi";
import { pender } from "redux-pender";

const INIT_USER = "user/INIT_USER";
const INIT_SIGNUP = "user/INIT_SIGNUP";
const SIGNUP = "user/SIGNUP";
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const GET_USER = "user/GET_USER";
const KAKAO_LOGIN = "user/KAKAO_LOGIN";

export const signUpAction = createAction(SIGNUP, userApi.UserSignUp);
export const loginAction = createAction(LOGIN, userApi.UserLogin);
export const logoutAction = createAction(LOGOUT, userApi.UserLogout);
export const getUserAction = createAction(GET_USER, userApi.GetUser);
export const KakaoLoginAction = createAction(KAKAO_LOGIN, userApi.KakaoLogin);
export const initSignUpAction = createAction(INIT_SIGNUP);
export const initUserAction = createAction(INIT_USER);

const initialState = {
    signup: null,
    logout: null,
    user: null,
    error: null,
};

export default handleActions(
    {
        [INIT_USER]: (state) => ({
            ...state,
            user: initialState.user,
        }),
        [INIT_SIGNUP]: (state) => ({
            ...state,
            signup: initialState.signup,
        }),
        ...pender({
            type: SIGNUP,
            onSuccess: (state, { payload }) => ({
                ...state,
                signup: payload,
            }),
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
            }),
        }),
        ...pender({
            type: LOGIN,
            onSuccess: (state, { payload }) => ({
                ...state,
                user: payload,
            }),
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
            }),
        }),
        ...pender({
            type: KAKAO_LOGIN,
            onSuccess: (state, { payload }) => ({
                ...state,
                user: payload,
            }),
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
            }),
        }),
        ...pender({
            type: LOGOUT,
            onSuccess: (state, { payload }) => ({
                ...state,
                user: null,
            }),
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
            }),
        }),
        ...pender({
            type: GET_USER,
            onSuccess: (state, { payload }) => ({
                ...state,
                user: payload,
            }),
            onFailure: (state, { payload }) => ({
                ...state,
                error: payload,
            }),
        }),
    },
    initialState
);
