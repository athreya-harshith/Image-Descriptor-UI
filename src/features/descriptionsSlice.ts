import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Descriptions } from '../types/Description'



const initialState: Descriptions[] = [];

const descriptionsSlice = createSlice({
    name: 'descriptions',
    initialState,
    reducers: {
        addDesciptions(state, action: PayloadAction<Descriptions>) {
            state.push(action.payload)
        },
    },
})

export const { addDesciptions } = descriptionsSlice.actions
export default descriptionsSlice.reducer