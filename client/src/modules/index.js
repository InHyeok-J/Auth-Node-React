import { combineReducers } from "redux";
import userRedcuer, { userSaga } from "./user";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  userRedcuer,
});
export function* rootSaga() {
  yield all([userSaga()]);
}

export default rootReducer;
