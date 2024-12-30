import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { LOADING } from '~/store/slices/constants'
import { drawPlayer } from '~/utils/drawPlayer'
import type { IPlayer } from '../players/player'
import {
    type InitialState,
    ON_CHANGE_POINTS,
    ON_CHANGE_POINTS_FAIL,
    ON_CHANGE_POINTS_SUCCESS,
    ON_CHANGE_QUESTION_ROUND,
    ON_CHANGE_QUESTION_ROUND_FAIL,
    ON_CHANGE_QUESTION_ROUND_SUCCESS,
    ON_CHANGE_ROUNDS,
    ON_CHANGE_ROUNDS_FAIL,
    ON_CHANGE_ROUNDS_SUCCESS,
    ON_GENERATE_DISGUISED,
    ON_GENERATE_DISGUISED_FAIL,
    ON_GENERATE_DISGUISED_SUCCESS,
    name,
} from './types'

const initialState: InitialState = {
    isLoading: LOADING.IDLE,
    rounds: 1,
    points: 500,
    disguisedPlayer: null,
    questionRound: 1,
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
        [ON_CHANGE_QUESTION_ROUND]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_CHANGE_QUESTION_ROUND_SUCCESS]: (
            state,
            action: PayloadAction<{ questionRound: number }>,
        ) => {
            state.isLoading = LOADING.SUCCESS
            if (action.payload.questionRound <= 0) {
                state.questionRound = 1
                return
            }
            state.questionRound = action.payload.questionRound
        },
        [ON_CHANGE_QUESTION_ROUND_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_GENERATE_DISGUISED]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_GENERATE_DISGUISED_SUCCESS]: (
            state,
            action: PayloadAction<{ players: IPlayer[] }>,
        ) => {
            state.isLoading = LOADING.SUCCESS
            const player = drawPlayer(action.payload.players)
            state.disguisedPlayer = player
        },
        [ON_GENERATE_DISGUISED_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
    },
})

export default slice.reducer
