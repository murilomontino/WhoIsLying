import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import { v4 as uuidV4 } from 'uuid'
import { LOADING } from '~/store/slices/constants'
import { type IPlayer, build } from './player'
import {
    type InitialState,
    ON_ADD_PLAYERS,
    ON_ADD_PLAYERS_FAIL,
    ON_ADD_PLAYERS_SUCCESS,
    ON_CHANGE_PLAYERS,
    ON_CHANGE_PLAYERS_FAIL,
    ON_CHANGE_PLAYERS_SUCCESS,
    ON_DELETE_PLAYERS,
    ON_DELETE_PLAYERS_FAIL,
    ON_DELETE_PLAYERS_SUCCESS,
    ON_RESET_PLAYERS,
    ON_RESET_PLAYERS_FAIL,
    ON_RESET_PLAYERS_SUCCESS,
    ON_RESET_VOTING,
    ON_RESET_VOTING_FAIL,
    ON_RESET_VOTING_SUCCESS,
    ON_UPDATE_CAN_PLAYER_VOTE,
    ON_UPDATE_CAN_PLAYER_VOTE_FAIL,
    ON_UPDATE_CAN_PLAYER_VOTE_SUCCESS,
    ON_UPDATE_PLAYER_CAN_ANSWER,
    ON_UPDATE_PLAYER_CAN_ANSWER_FAIL,
    ON_UPDATE_PLAYER_CAN_ANSWER_SUCCESS,
    ON_UPDATE_PLAYER_CAN_ASK,
    ON_UPDATE_PLAYER_CAN_ASK_FAIL,
    ON_UPDATE_PLAYER_CAN_ASK_SUCCESS,
    ON_UPDATE_PLAYER_NAME,
    ON_UPDATE_PLAYER_NAME_FAIL,
    ON_UPDATE_PLAYER_NAME_SUCCESS,
    ON_UPDATE_PLAYER_REVEAL,
    ON_UPDATE_PLAYER_REVEAL_FAIL,
    ON_UPDATE_PLAYER_REVEAL_SUCCESS,
    ON_UPDATE_PLAYER_SCORE,
    ON_UPDATE_PLAYER_SCORE_FAIL,
    ON_UPDATE_PLAYER_SCORE_SUCCESS,
    ON_VOTE_IN_PLAYER,
    ON_VOTE_IN_PLAYER_FAIL,
    ON_VOTE_IN_PLAYER_SUCCESS,
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
                canVote: true,
                votes: 0,
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
        [ON_UPDATE_PLAYER_SCORE]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_UPDATE_PLAYER_SCORE_SUCCESS]: (state, action) => {
            state.isLoading = LOADING.SUCCESS
            const player = state.players.find((p) => p._id === action.payload._id)
            if (player) {
                player.score = action.payload.score
            }
        },
        [ON_UPDATE_PLAYER_SCORE_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_UPDATE_PLAYER_REVEAL]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_UPDATE_PLAYER_REVEAL_SUCCESS]: (state, action) => {
            state.isLoading = LOADING.SUCCESS
            const player = state.players.find((p) => p._id === action.payload._id)
            if (player) {
                player.reveal = action.payload.reveal
            }
        },
        [ON_UPDATE_PLAYER_REVEAL_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_UPDATE_PLAYER_CAN_ANSWER]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_UPDATE_PLAYER_CAN_ANSWER_SUCCESS]: (state, action) => {
            state.isLoading = LOADING.SUCCESS
            const player = state.players.find((p) => p._id === action.payload._id)
            if (player) {
                player.canAnswer = action.payload.canAnswer
            }
        },
        [ON_UPDATE_PLAYER_CAN_ANSWER_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_UPDATE_PLAYER_CAN_ASK]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_UPDATE_PLAYER_CAN_ASK_SUCCESS]: (state, action) => {
            state.isLoading = LOADING.SUCCESS
            const player = state.players.find((p) => p._id === action.payload._id)
            if (player) {
                player.canAsk = action.payload.canAsk
            }
        },
        [ON_UPDATE_PLAYER_CAN_ASK_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_UPDATE_PLAYER_NAME]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_UPDATE_PLAYER_NAME_SUCCESS]: (state, action) => {
            state.isLoading = LOADING.SUCCESS
            const player = state.players.find((p) => p._id === action.payload._id)
            if (player) {
                player.name = action.payload.name
            }
        },
        [ON_UPDATE_PLAYER_NAME_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_RESET_PLAYERS]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_RESET_PLAYERS_SUCCESS]: (state) => {
            state.isLoading = LOADING.SUCCESS
            state.players = state.players.map((player) => {
                return {
                    ...player,
                    reveal: false,
                    votes: 0,
                    canAnswer: true,
                    canVote: true,
                    canAsk: true,
                }
            })
        },
        [ON_RESET_PLAYERS_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_UPDATE_CAN_PLAYER_VOTE]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_UPDATE_CAN_PLAYER_VOTE_SUCCESS]: (state, action) => {
            state.isLoading = LOADING.SUCCESS
            const player = state.players.find((p) => p._id === action.payload._id)
            if (player) {
                player.canVote = action.payload.canVote
            }
        },
        [ON_UPDATE_CAN_PLAYER_VOTE_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_CHANGE_PLAYERS]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_CHANGE_PLAYERS_SUCCESS]: (state, action) => {
            state.isLoading = LOADING.SUCCESS
            state.players = action.payload.players
        },
        [ON_CHANGE_PLAYERS_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_RESET_VOTING]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_RESET_VOTING_SUCCESS]: (state) => {
            state.isLoading = LOADING.SUCCESS
            state.players = state.players.map((player) => {
                return {
                    ...player,
                    canVote: true,
                    votes: 0,
                }
            })
        },
        [ON_RESET_VOTING_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_VOTE_IN_PLAYER]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_VOTE_IN_PLAYER_SUCCESS]: (
            state,
            action: PayloadAction<{
                disguised_id: string
                _id: string
            }>,
        ) => {
            state.isLoading = LOADING.SUCCESS
            state.players = state.players.map((player) => {
                if (player._id === action.payload.disguised_id) {
                    return {
                        ...player,
                        votes: player.votes + 1,
                    }
                }

                if (player._id === action.payload._id) {
                    return {
                        ...player,
                        canVote: false,
                    }
                }

                return player
            })
        },
        [ON_VOTE_IN_PLAYER_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
    },
})

export default slice.reducer
