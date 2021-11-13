import { combineReducers } from "redux";
import userReducer, { userSaga } from "./user";
import channelReducer, { channelSaga } from "./channel";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
    userReducer,
    channelReducer,
});
export function* rootSaga() {
    yield all([userSaga(), channelSaga()]);
}

export default rootReducer;
