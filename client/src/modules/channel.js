import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as ChannelApi from "../apis/ChannelApi";
import { reducerUtils, handleAsyncActions } from "../utils/asyncUtils";

const ALLCHANNEL = "ALLCHANNEL";
const ALLCHANNEL_SUCCESS = "ALLCHANNEL_SUCCESS";
const ALLCHANNEL_ERROR = "ALLCHANNEL_ERROR";

const GETCHANNEL = "GETCHANNEL";
const GETCHANNEL_SUCCESS = "GETCHANNEL_SUCCESS";
const GETCHANNEL_ERROR = "GETCHANNEL_ERROR";

const JOINCHANNEL = "JOINCHANNEL";
const JOINCHANNEL_SUCCESS = "JOINCHANNEL_SUCCESS";
const JOINCHANNEL_ERROR = "JOINCHANNEL_ERROR";
//Actions
export const getAllChannelAction = () => ({
    type: ALLCHANNEL,
});
export const getOneChannelAction = (channelId) => ({
    type: GETCHANNEL,
    payload: {
        channelId,
    },
    meta: channelId,
});

export const joinChannelAction = (channelId) => ({
    type: JOINCHANNEL,
    payload: {
        channelId,
    },
    meta: channelId,
});

function* allchannelSaga(action) {
    try {
        const response = yield call(ChannelApi.GetAllChannel);
        console.log(response);
        yield put({
            type: ALLCHANNEL_SUCCESS,
            payload: response.data.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: ALLCHANNEL_ERROR,
            error: true,
            payload: err.response.data,
        });
    }
}

function* getcahnnelSaga(action) {
    try {
        const response = yield call(ChannelApi.GetChannel, action.payload);
        console.log(response);
        yield put({
            type: GETCHANNEL_SUCCESS,
            payload: response.data.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: GETCHANNEL_ERROR,
            error: true,
            payload: err.response.data,
        });
    }
}

function* joinchannelSaga(action) {
    try {
        const response = yield call(ChannelApi.JoinChannel, action.payload);
        console.log(response);
        yield put({
            type: JOINCHANNEL_SUCCESS,
            payload: response.data.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: JOINCHANNEL_ERROR,
            error: true,
            payload: err.response.data,
        });
    }
}

export function* channelSaga() {
    yield takeLatest(ALLCHANNEL, allchannelSaga);
    yield takeLatest(GETCHANNEL, getcahnnelSaga);
    yield takeLatest(JOINCHANNEL, joinchannelSaga);
}

const initialState = {
    channellist: reducerUtils.initial(),
    channel: reducerUtils.initial(),
    join: reducerUtils.initial(),
};

export default function channelReducer(state = initialState, action) {
    switch (action.type) {
        case ALLCHANNEL:
        case ALLCHANNEL_SUCCESS:
        case ALLCHANNEL_ERROR:
            return handleAsyncActions(ALLCHANNEL, "channellist")(state, action);
        case GETCHANNEL:
        case GETCHANNEL_SUCCESS:
        case GETCHANNEL_ERROR:
            return handleAsyncActions(GETCHANNEL, "channel")(state, action);
        case JOINCHANNEL:
        case JOINCHANNEL_SUCCESS:
        case JOINCHANNEL_ERROR:
            return handleAsyncActions(JOINCHANNEL, "join")(state, action);
        default:
            return state;
    }
}
