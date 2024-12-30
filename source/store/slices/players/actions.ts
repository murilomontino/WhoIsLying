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
    ACTION_RESET_PLAYERS,
    ACTION_RESET_PLAYERS_FAIL,
    ACTION_RESET_PLAYERS_SUCCESS,
    ACTION_UPDATE_PLAYER_CAN_ANSWER,
    ACTION_UPDATE_PLAYER_CAN_ANSWER_FAIL,
    ACTION_UPDATE_PLAYER_CAN_ANSWER_SUCCESS,
    ACTION_UPDATE_PLAYER_CAN_ASK,
    ACTION_UPDATE_PLAYER_CAN_ASK_FAIL,
    ACTION_UPDATE_PLAYER_CAN_ASK_SUCCESS,
    ACTION_UPDATE_PLAYER_NAME,
    ACTION_UPDATE_PLAYER_NAME_FAIL,
    ACTION_UPDATE_PLAYER_NAME_SUCCESS,
    ACTION_UPDATE_PLAYER_REVEAL,
    ACTION_UPDATE_PLAYER_REVEAL_FAIL,
    ACTION_UPDATE_PLAYER_REVEAL_SUCCESS,
    ACTION_UPDATE_PLAYER_SCORE,
    ACTION_UPDATE_PLAYER_SCORE_FAIL,
    ACTION_UPDATE_PLAYER_SCORE_SUCCESS,
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

export const onUpdatePlayerScore = createAction<{ _id: string; score: number }>(
    ACTION_UPDATE_PLAYER_SCORE,
)
export const onUpdatePlayerScoreSuccess = createAction<{
    _id: string
    score: number
}>(ACTION_UPDATE_PLAYER_SCORE_SUCCESS)
export const onUpdatePlayerScoreFail = createAction(ACTION_UPDATE_PLAYER_SCORE_FAIL)

export const onUpdatePlayerReveal = createAction<{ _id: string; reveal: boolean }>(
    ACTION_UPDATE_PLAYER_REVEAL,
)
export const onUpdatePlayerRevealSuccess = createAction<{
    _id: string
    reveal: boolean
}>(ACTION_UPDATE_PLAYER_REVEAL_SUCCESS)
export const onUpdatePlayerRevealFail = createAction(
    ACTION_UPDATE_PLAYER_REVEAL_FAIL,
)

export const onUpdatePlayerCanAnswer = createAction<{
    _id: string
    canAnswer: boolean
}>(ACTION_UPDATE_PLAYER_CAN_ANSWER)
export const onUpdatePlayerCanAnswerSuccess = createAction<{
    _id: string
    canAnswer: boolean
}>(ACTION_UPDATE_PLAYER_CAN_ANSWER_SUCCESS)
export const onUpdatePlayerCanAnswerFail = createAction(
    ACTION_UPDATE_PLAYER_CAN_ANSWER_FAIL,
)

export const onUpdatePlayerCanAsk = createAction<{ _id: string; canAsk: boolean }>(
    ACTION_UPDATE_PLAYER_CAN_ASK,
)
export const onUpdatePlayerCanAskSuccess = createAction<{
    _id: string
    canAsk: boolean
}>(ACTION_UPDATE_PLAYER_CAN_ASK_SUCCESS)
export const onUpdatePlayerCanAskFail = createAction(
    ACTION_UPDATE_PLAYER_CAN_ASK_FAIL,
)

export const onUpdatePlayerName = createAction<{ _id: string; name: string }>(
    ACTION_UPDATE_PLAYER_NAME,
)
export const onUpdatePlayerNameSuccess = createAction<{
    _id: string
    name: string
}>(ACTION_UPDATE_PLAYER_NAME_SUCCESS)
export const onUpdatePlayerNameFail = createAction(ACTION_UPDATE_PLAYER_NAME_FAIL)

export const onResetPlayers = createAction(ACTION_RESET_PLAYERS)
export const onResetPlayersSuccess = createAction(ACTION_RESET_PLAYERS_SUCCESS)
export const onResetPlayersFail = createAction(ACTION_RESET_PLAYERS_FAIL)
