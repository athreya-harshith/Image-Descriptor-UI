import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Captions } from '../types/Caption'



const initialState: Captions = {} as Captions;

const captionsSlice = createSlice({
    name: 'captions',
    initialState,
    reducers: {
        storeCaption(state, action: PayloadAction<Captions>) {
            state.id = action.payload.id;
            state.caption = action.payload.caption;
            state.imageName = action.payload.imageName;
            state.description = action.payload.description
        },
    },
})

export const { storeCaption } = captionsSlice.actions
export default captionsSlice.reducer