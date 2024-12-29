import { createAction } from '@reduxjs/toolkit'

import {
    ACTION_ADD_PLAYERS,
    ACTION_ADD_PLAYERS_FAIL,
    ACTION_ADD_PLAYERS_SUCCESS,
    ACTION_CHANGE_PLAYERS,
    ACTION_CHANGE_PLAYERS_FAIL,
    ACTION_CHANGE_PLAYERS_SUCCESS,
    ACTION_DELETE_PLAYERS,
    ACTION_DELETE_PLAYERS_FAIL,
    ACTION_DELETE_PLAYERS_SUCCESS,
} from './types'

export const onChangePlayers = createAction(ACTION_CHANGE_PLAYERS)
export const onChangePlayersSuccess = createAction(ACTION_CHANGE_PLAYERS_SUCCESS)
export const onChangePlayersFail = createAction(ACTION_CHANGE_PLAYERS_FAIL)

export const onAddPlayers = createAction<{ name: string }>(ACTION_ADD_PLAYERS)
export const onAddPlayersSuccess = createAction<{ name: string }>(
    ACTION_ADD_PLAYERS_SUCCESS,
)
export const onAddPlayersFail = createAction(ACTION_ADD_PLAYERS_FAIL)

export const onDeletePlayers = createAction<{ id: string }>(ACTION_DELETE_PLAYERS)
export const onDeletePlayersSuccess = createAction<{ id: string }>(
    ACTION_DELETE_PLAYERS_SUCCESS,
)
export const onDeletePlayersFail = createAction(ACTION_DELETE_PLAYERS_FAIL)
