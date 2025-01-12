import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { Categories, Category } from '~/constants/categories'
import { LOADING } from '~/store/slices/constants'
import { drawPlayer } from '~/utils/drawPlayer'
import type { IPlayer } from '../players/player'
import {
    type Difficulty,
    type InitialState,
    ON_CHANGE_CATEGORY,
    ON_CHANGE_CATEGORY_FAIL,
    ON_CHANGE_CATEGORY_SUCCESS,
    ON_CHANGE_DIFFICULTY,
    ON_CHANGE_DIFFICULTY_FAIL,
    ON_CHANGE_DIFFICULTY_SUCCESS,
    ON_CHANGE_MOST_VOTED,
    ON_CHANGE_MOST_VOTED_FAIL,
    ON_CHANGE_MOST_VOTED_SUCCESS,
    ON_CHANGE_PLAY_ROUND,
    ON_CHANGE_PLAY_ROUND_FAIL,
    ON_CHANGE_PLAY_ROUND_SUCCESS,
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
    ON_GENERATE_ITEM,
    ON_GENERATE_ITEM_SUCCESS,
    ON_RESET_GAME,
    ON_RESET_GAME_FAIL,
    ON_RESET_GAME_SUCCESS,
    ON_SCORE_PLAYERS,
    ON_SCORE_PLAYERS_FAIL,
    ON_SCORE_PLAYERS_SUCCESS,
    ON_VOTE_IN_THE_DISGUISED,
    ON_VOTE_IN_THE_DISGUISED_FAIL,
    ON_VOTE_IN_THE_DISGUISED_SUCCESS,
    ON_VOTING_ITEM,
    ON_VOTING_ITEM_FAIL,
    ON_VOTING_ITEM_SUCCESS,
    name,
} from './types'

const initialState: InitialState = {
    isLoading: LOADING.IDLE,
    rounds: 5,
    round: 1,
    points: 500,
    disguisedPlayer: null,
    questionRound: 1,
    difficulty: 1,
    votingItem: '',
    item: null,
    category: null,
    mostVoted: null,
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
        [ON_VOTING_ITEM]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_VOTING_ITEM_SUCCESS]: (
            state,
            action: PayloadAction<{ votingItem: string }>,
        ) => {
            state.isLoading = LOADING.SUCCESS
            state.votingItem = action.payload.votingItem
        },
        [ON_VOTING_ITEM_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_SCORE_PLAYERS]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_SCORE_PLAYERS_SUCCESS]: (state) => {
            state.isLoading = LOADING.SUCCESS
        },
        [ON_SCORE_PLAYERS_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_RESET_GAME]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_RESET_GAME_SUCCESS]: (state) => {
            state.isLoading = LOADING.SUCCESS
            state.rounds = 5
            state.round = 1
            state.points = 500
            state.disguisedPlayer = null
            state.questionRound = 1
            state.votingItem = ''
            state.mostVoted = null
        },
        [ON_RESET_GAME_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_VOTE_IN_THE_DISGUISED]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_VOTE_IN_THE_DISGUISED_SUCCESS]: (
            state,
            action: PayloadAction<{ player_id: string }>,
        ) => {
            state.isLoading = LOADING.SUCCESS
            state.disguisedPlayer?.votes.push(action.payload.player_id)
        },
        [ON_VOTE_IN_THE_DISGUISED_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_CHANGE_PLAY_ROUND]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_CHANGE_PLAY_ROUND_SUCCESS]: (
            state,
            action: PayloadAction<{
                round: number
            }>,
        ) => {
            state.isLoading = LOADING.SUCCESS
            state.round = action.payload.round
        },
        [ON_CHANGE_PLAY_ROUND_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_CHANGE_MOST_VOTED]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_CHANGE_MOST_VOTED_SUCCESS]: (
            state,
            action: PayloadAction<{ mostVoted: IPlayer }>,
        ) => {
            state.isLoading = LOADING.SUCCESS
            state.mostVoted = action.payload.mostVoted
        },
        [ON_CHANGE_MOST_VOTED_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_GENERATE_ITEM]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_GENERATE_ITEM_SUCCESS]: (
            state,
            action: PayloadAction<{ item: Categories }>,
        ) => {
            state.isLoading = LOADING.SUCCESS
            state.item = action.payload.item
        },
        [ON_CHANGE_DIFFICULTY]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_CHANGE_DIFFICULTY_SUCCESS]: (
            state,
            action: PayloadAction<{ difficulty: Difficulty }>,
        ) => {
            state.isLoading = LOADING.SUCCESS
            state.difficulty = action.payload.difficulty
        },
        [ON_CHANGE_DIFFICULTY_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
        [ON_CHANGE_CATEGORY]: (state) => {
            state.isLoading = LOADING.PENDING
        },
        [ON_CHANGE_CATEGORY_SUCCESS]: (
            state,
            action: PayloadAction<{ category: Category }>,
        ) => {
            state.isLoading = LOADING.SUCCESS
            state.category = action.payload.category
        },
        [ON_CHANGE_CATEGORY_FAIL]: (state) => {
            state.isLoading = LOADING.FAILED
        },
    },
})

export default slice.reducer
