import { createAction } from '@reduxjs/toolkit'

import type { IPlayer } from '../players/player'
import {
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
