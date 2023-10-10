import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./app.slice";
import thunk from "redux-thunk";
import { booksReducer } from "./book.slice";

export const store = configureStore({
    reducer : {
    app : appReducer,
    books : booksReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
  });

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>