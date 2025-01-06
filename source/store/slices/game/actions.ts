import { createAction } from '@reduxjs/toolkit'

import type { IPlayer } from '../players/player'
import {
    ACTION_CHANGE_PLAY_ROUND,
    ACTION_CHANGE_PLAY_ROUND_FAIL,
    ACTION_CHANGE_PLAY_ROUND_SUCCESS,
    ACTION_CHANGE_POINTS,
    ACTION_CHANGE_POINTS_FAIL,
    ACTION_CHANGE_POINTS_SUCCESS,
    ACTION_CHANGE_QUESTION_ROUND,
    ACTION_CHANGE_QUESTION_ROUND_FAIL,
    ACTION_CHANGE_QUESTION_ROUND_SUCCESS,
    ACTION_CHANGE_ROUNDS,
    ACTION_CHANGE_ROUNDS_FAIL,
    ACTION_CHANGE_ROUNDS_SUCCESS,
    ACTION_GENERATE_DISGUISED,
    ACTION_GENERATE_DISGUISED_FAIL,
    ACTION_GENERATE_DISGUISED_SUCCESS,
    ACTION_RESET_GAME,
    ACTION_RESET_GAME_FAIL,
    ACTION_RESET_GAME_SUCCESS,
    ACTION_SCORE_PLAYERS,
    ACTION_SCORE_PLAYERS_FAIL,
    ACTION_SCORE_PLAYERS_SUCCESS,
    ACTION_VOTE_IN_THE_DISGUISED,
    ACTION_VOTE_IN_THE_DISGUISED_FAIL,
    ACTION_VOTE_IN_THE_DISGUISED_SUCCESS,
    ACTION_VOTING_ITEM,
    ACTION_VOTING_ITEM_FAIL,
    ACTION_VOTING_ITEM_SUCCESS,
} from './types'

export const onChangeRounds = createAction<{ rounds: number }>(ACTION_CHANGE_ROUNDS)
export const onChangeRoundsSuccess = createAction<{ rounds: number }>(
    ACTION_CHANGE_ROUNDS_SUCCESS,
)
export const onChangeRoundsFail = createAction(ACTION_CHANGE_ROUNDS_FAIL)

export const onChangePoints = createAction<{ points: number }>(ACTION_CHANGE_POINTS)
export const onChangePointsSuccess = createAction<{ points: number }>(
    ACTION_CHANGE_POINTS_SUCCESS,
)
export const onChangePointsFail = createAction(ACTION_CHANGE_POINTS_FAIL)

export const onChangeQuestionRound = createAction<{ questionRound: number }>(
    ACTION_CHANGE_QUESTION_ROUND,
)

export const onChangeQuestionRoundSuccess = createAction<{ questionRound: number }>(
    ACTION_CHANGE_QUESTION_ROUND_SUCCESS,
)

export const onChangeQuestionRoundFail = createAction(
    ACTION_CHANGE_QUESTION_ROUND_FAIL,
)

export const onGenerateDisguised = createAction(ACTION_GENERATE_DISGUISED)
export const onGenerateDisguisedSuccess = createAction<{ players: IPlayer[] }>(
    ACTION_GENERATE_DISGUISED_SUCCESS,
)
export const onGenerateDisguisedFail = createAction(ACTION_GENERATE_DISGUISED_FAIL)

export const onVotingItem = createAction<{ votingItem: string }>(ACTION_VOTING_ITEM)
export const onVotingItemSuccess = createAction<{ votingItem: string }>(
    ACTION_VOTING_ITEM_SUCCESS,
)
export const onVotingItemFail = createAction(ACTION_VOTING_ITEM_FAIL)

export type NewPlayersScore = {
    _id: string
    name: string
    score: number
    sumScore: number
}
export const onScorePlayers = createAction<{
    playersScore: NewPlayersScore[]
}>(ACTION_SCORE_PLAYERS)
export const onScorePlayersSuccess = createAction(ACTION_SCORE_PLAYERS_SUCCESS)
export const onScorePlayersFail = createAction(ACTION_SCORE_PLAYERS_FAIL)

export const onResetGame = createAction(ACTION_RESET_GAME)
export const onResetGameSuccess = createAction(ACTION_RESET_GAME_SUCCESS)
export const onResetGameFail = createAction(ACTION_RESET_GAME_FAIL)

export const onVoteInTheDisguised = createAction<{ player_id: string }>(
    ACTION_VOTE_IN_THE_DISGUISED,
)
export const onVoteInTheDisguisedSuccess = createAction<{ player_id: string }>(
    ACTION_VOTE_IN_THE_DISGUISED_SUCCESS,
)
export const onVoteInTheDisguisedFail = createAction(
    ACTION_VOTE_IN_THE_DISGUISED_FAIL,
)

export const onChangePlayRound = createAction<{ round: number }>(
    ACTION_CHANGE_PLAY_ROUND,
)
export const onChangePlayRoundSuccess = createAction<{ round: number }>(
    ACTION_CHANGE_PLAY_ROUND_SUCCESS,
)
export const onChangePlayRoundFail = createAction(ACTION_CHANGE_PLAY_ROUND_FAIL)
