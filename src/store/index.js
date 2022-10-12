import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { newsReducer } from "./slicesList";
import saga from "../sagas/index";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: newsReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(saga);

export default store;