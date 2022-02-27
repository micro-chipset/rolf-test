import {DataMessages, dataMessages} from "../mock/data";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

export interface MessagesState {
    data: DataMessages[]
}

const initialState: MessagesState = {
    data: dataMessages,
};

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessages: (state, action: PayloadAction<DataMessages>) => {
            state.data = [...state.data, action.payload]
        }
    },
});

export const {addMessages} = messagesSlice.actions

export const selectMessages = (state: RootState) => state.messages.data

export default messagesSlice.reducer;
