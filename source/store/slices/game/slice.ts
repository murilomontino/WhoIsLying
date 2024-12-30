import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { LOADING } from '~/store/slices/constants'
import {
    type InitialState,
    ON_CHANGE_ROUNDS,
    ON_CHANGE_ROUNDS_FAIL,
    ON_CHANGE_ROUNDS_SUCCESS,
    name,
} from './types'

const initialState: InitialState = {
    isLoading: LOADING.IDLE,
    rounds: 0,
    pointer: 0,
}

const slice = createSlice({
    name,
    initialState,
    reducers: {
        [ON_CHANGE_ROUNDS]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_CHANGE_ROUNDS_SUCCESS]: (
            state,
            action: PayloadAction<{ rounds: number }>,
        ) => {
            state.isLoading = LOADING.SUCCESS
            state.rounds = action.payload.rounds
        },
        [ON_CHANGE_ROUNDS_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
    },
})

export default slice.reducer
