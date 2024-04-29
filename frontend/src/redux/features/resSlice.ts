import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {reserveItem} from "../../../interface";

type ResState = {
    resItems : reserveItem[];
}

const initialState:ResState = {resItems:[]}

export const resSlice = createSlice({
    name: "res",
    initialState,
    reducers: {
        addReservation: (state, action:PayloadAction<reserveItem>) =>{
            const remainItems = state.resItems.filter(obj =>{
                return((obj.id !== action.payload.id))
            })
            remainItems.push(action.payload)
            state.resItems = remainItems
        },
        removeReservation: (state, action:PayloadAction<string>) =>{
            const remainItems = state.resItems.filter(obj =>{
                return ((obj.id !== action.payload))
            })
            state.resItems = remainItems
        }
    }
})
export const { addReservation, removeReservation} = resSlice.actions
export default resSlice.reducer