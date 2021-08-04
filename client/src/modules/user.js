import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as AuthApi from "../apis/AuthApi";
import { reducerUtils, handleAsyncActions } from "../utils/asyncUtils";

//type
const SIGNUP = "SIGNUP";
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNUP_ERROR = "SIGNUP_ERROR";
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGOUT = "LOGOUT";
const LOGOUT_SUCCESS = "LOGOUT_SCUEESS";
const LOGOUT_ERROR = "LOGOUT_ERROR";
const LOGOUT_END = "LOGOUT_END";
//action
export const signupAction = ({ name, nickname, email, password }) => ({
    type: SIGNUP,
    payload: {
        name: name,
        nickname: nickname,
        email: email,
        password: password,
    },
    meta: email,
});
export const loginAction = ({ email, password }) => ({
    type: LOGIN,
    payload: {
        email: email,
        password: password,
    },
    meta: email,
});
export const logout = () => ({ type: LOGOUT });

function* loginSaga(action) {
    console.log("saga", action.payload);
    try {
        const response = yield call(AuthApi.UserLogin, action.payload);
        yield put({
            type: LOGIN_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOGIN_ERROR,
            error: true,
            payload: err.response.data,
        });
    }
}
function* signUpSaga(action) {
    try {
        const response = yield call(AuthApi.UserSignUp, action.payload);
        console.log(response.data);
        yield put({
            type: SIGNUP_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: SIGNUP_ERROR,
            error: true,
            payload: err.response.data,
        });
    }
}

function* logOutSaga(action) {
    try {
        const response = yield call(AuthApi.UserLogout);
        console.log(response.data);
        yield put({
            type: LOGOUT_SUCCESS,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOGOUT_ERROR,
            error: true,
            payload: err.response.data,
        });
    }
}

export function* userSaga() {
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(SIGNUP, signUpSaga);
    yield takeLatest(LOGOUT, logOutSaga);
}
const initialState = {
    users: reducerUtils.initial(),
    signup: reducerUtils.initial(),
    logout: reducerUtils.initial(),
};
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
        case LOGIN_SUCCESS:
        case LOGIN_ERROR:
            return handleAsyncActions(LOGIN, "users")(state, action);
        case SIGNUP:
        case SIGNUP_SUCCESS:
        case SIGNUP_ERROR:
            return handleAsyncActions(SIGNUP, "signup")(state, action);
        case LOGOUT:
        case LOGOUT_ERROR:
            return handleAsyncActions(LOGOUT, "users")(state, action);
        case LOGOUT_SUCCESS:
            return { ...state, users: reducerUtils.initial() };
        default:
            return state;
    }
    return 0;
}
