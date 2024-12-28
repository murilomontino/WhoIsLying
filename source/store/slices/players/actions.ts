import { createAction } from '@reduxjs/toolkit'

import {
    ACTION_CHANGE_PLAYERS,
    ACTION_CHANGE_PLAYERS_FAIL,
    ACTION_CHANGE_PLAYERS_SUCCESS,
} from './types'

export const onChangePlayers = createAction(ACTION_CHANGE_PLAYERS)
export const onChangePlayersSuccess = createAction(ACTION_CHANGE_PLAYERS_SUCCESS)
export const onChangePlayersFail = createAction(ACTION_CHANGE_PLAYERS_FAIL)
