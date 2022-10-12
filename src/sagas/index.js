import { 
  fetchGetMoreRequest,
  fetchGetMoreSuccess,
  fetchGetRequest,
  fetchGetSuccess } from "../store/slicesList";
  import { spawn, retry, put, takeLatest } from "redux-saga/effects";

async function getNews() {
  const response = await fetch(process.env.REACT_APP_NEWS_URL);
  if (!response.ok) {
    throw new Error(response.statusText);
  };
  return await response.json();
}

function* handleGetNewsSaga() {
  const data = yield retry(3, 3000, getNews);
  yield put(fetchGetSuccess(data));
};

function* watchGetNewsSaga() {
  yield takeLatest(fetchGetRequest, handleGetNewsSaga);
};

async function getNewsMore(id) {
  const response = await fetch(`${process.env.REACT_APP_NEWS_URL}?lastSeenId=${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  };
  return await response.json();
}

function* handleGetNewsMoreSaga(action) {
  const data = yield retry(3, 3000, getNewsMore, action.payload);
  yield put(fetchGetMoreSuccess(data));
};

function* watchGetNewsMoreSaga() {
  yield takeLatest(fetchGetMoreRequest, handleGetNewsMoreSaga);
};

export default function* saga() {
  yield spawn(watchGetNewsSaga);
  yield spawn(watchGetNewsMoreSaga);
}