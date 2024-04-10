import { configureStore, combineReducers } from "@reduxjs/toolkit";
import  resSlice  from "./features/resSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    timeout: 5000, // added this line to prevent the default !gannub
    key: "rootPersist",
    storage
}
const rootReducer = combineReducers({resSlice})
const reduxPersistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer: reduxPersistedReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDisptach = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector