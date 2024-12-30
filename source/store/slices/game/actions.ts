import { createAction } from '@reduxjs/toolkit'

import {
    ACTION_CHANGE_ROUNDS,
    ACTION_CHANGE_ROUNDS_FAIL,
    ACTION_CHANGE_ROUNDS_SUCCESS,
} from './types'

export const onChangeRounds = createAction<{ rounds: number }>(ACTION_CHANGE_ROUNDS)
export const onChangeRoundsSuccess = createAction<{ rounds: number }>(
    ACTION_CHANGE_ROUNDS_SUCCESS,
)
export const onChangeRoundsFail = createAction(ACTION_CHANGE_ROUNDS_FAIL)
