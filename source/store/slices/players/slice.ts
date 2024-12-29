import { createSlice } from '@reduxjs/toolkit'

import { v4 as uuidV4 } from 'uuid'
import { LOADING } from '~/store/slices/constants'
import { Player } from './player'
import {
    type InitialState,
    ON_ADD_PLAYERS,
    ON_ADD_PLAYERS_FAIL,
    ON_ADD_PLAYERS_SUCCESS,
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
            const player = new Player(uuidV4(), action.payload.name)
            state.players = [...state.players, player]
        },
        [ON_ADD_PLAYERS_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
    },
})

export default slice.reducer
