import { createSlice } from '@reduxjs/toolkit'

import { v4 as uuidV4 } from 'uuid'
import { LOADING } from '~/store/slices/constants'
import { type IPlayer, build } from './player'
import {
    type InitialState,
    ON_ADD_PLAYERS,
    ON_ADD_PLAYERS_FAIL,
    ON_ADD_PLAYERS_SUCCESS,
    ON_DELETE_PLAYERS,
    ON_DELETE_PLAYERS_FAIL,
    ON_DELETE_PLAYERS_SUCCESS,
    name,
} from './types'

const initialState: InitialState = {
    isLoading: LOADING.IDLE,
    players: [],
}

const slice = createSlice({
    name,
    initialState,
    reducers: {
        [ON_ADD_PLAYERS]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_ADD_PLAYERS_SUCCESS]: (state, action) => {
            state.isLoading = LOADING.SUCCESS
            const player = build({
                _id: uuidV4(),
                name: action.payload.name,
                score: 0,
                reveal: false,
                canAnswer: true,
                canAsk: true,
                __protocol: 'player',
            })
            state.players = [...state.players, player]
        },
        [ON_ADD_PLAYERS_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_DELETE_PLAYERS]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_DELETE_PLAYERS_SUCCESS]: (state, action) => {
            state.isLoading = LOADING.SUCCESS
            state.players = state.players.filter(
                (player: IPlayer) => player._id !== action.payload.id,
            )
        },
        [ON_DELETE_PLAYERS_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
    },
})

export default slice.reducer
