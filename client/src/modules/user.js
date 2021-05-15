import { call, put, takeEvery } from "redux-saga/effects";
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
//action
export const signup = ({ name, nickname, email, password }) => ({
  type: SIGNUP,
  payload: {
    name: name,
    nickname: nickname,
    email: email,
    password: password,
  },
  meta: email,
});
export const login = ({ email, password }) => ({
  type: LOGIN,
  payload: {
    email: email,
    password: password,
  },
  meta: email,
});
export const logout = () => ({ type: LOGOUT });

function* loginSaga() {
  try {
    const response = yield call(AuthApi.UserLogin());
    yield put({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: LOGIN_ERROR,
      error: true,
      payload: err,
    });
  }
}
function* signUpSaga() {
  try {
    const response = yield call(AuthApi.UserSignUp());
    yield put({
      type: SIGNUP_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: SIGNUP_ERROR,
      error: true,
      payload: err,
    });
  }
}

export function* userSaga() {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(SIGNUP, signUpSaga);
}
const initialState = {
  users: reducerUtils.initial(),
};
export default function userRedcuer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
    case LOGIN_SUCCESS:
    case LOGIN_ERROR:
      return handleAsyncActions(LOGIN, "users")(state, action);
    case SIGNUP:
    case SIGNUP_SUCCESS:
    case SIGNUP_ERROR:
      return handleAsyncActions(SIGNUP, "users")(state, action);
    default:
      return state;
  }
  return 0;
}
