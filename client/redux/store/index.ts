import playerReducer from './../reducers/player.slice';
import tracksReducer from './../reducers/tracks.slice';
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { tracksApi } from '../API/tracks.api';

export const makeStore = () =>
  configureStore({
    reducer: {
      player: playerReducer,
      tracks: tracksReducer,
      [tracksApi.reducerPath]: tracksApi.reducer
    },
    middleware: (gDM) => gDM().concat(tracksApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
