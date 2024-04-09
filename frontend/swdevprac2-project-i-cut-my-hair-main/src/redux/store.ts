import { configureStore, combineReducers } from "@reduxjs/toolkit";
import  bookSlice  from "./features/resSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "rootPersist",
    storage
}
const rootReducer = combineReducers({bookSlice})
const reduxPersistReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer: reduxPersistReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDisptach = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector