import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { LOADING } from '~/store/slices/constants'
import {
    type InitialState,
    ON_CHANGE_POINTS,
    ON_CHANGE_POINTS_FAIL,
    ON_CHANGE_POINTS_SUCCESS,
    ON_CHANGE_ROUNDS,
    ON_CHANGE_ROUNDS_FAIL,
    ON_CHANGE_ROUNDS_SUCCESS,
    name,
} from './types'

const initialState: InitialState = {
    isLoading: LOADING.IDLE,
    rounds: 1,
    points: 500,
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
            if (action.payload.rounds <= 0) {
                state.rounds = 1
                return
            }
            state.rounds = action.payload.rounds
        },
        [ON_CHANGE_ROUNDS_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_CHANGE_POINTS]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_CHANGE_POINTS_SUCCESS]: (
            state,
            action: PayloadAction<{ points: number }>,
        ) => {
            state.isLoading = LOADING.SUCCESS
            if (action.payload.points <= 50) {
                state.points = 50
                return
            }

            if (action.payload.points >= 9999) {
                state.points = 9999
                return
            }

            state.points = action.payload.points
        },
        [ON_CHANGE_POINTS_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
    },
})

export default slice.reducer
