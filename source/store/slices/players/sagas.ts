import { all, fork, put, takeLatest } from 'redux-saga/effects'

import type { PayloadAction } from '@reduxjs/toolkit'

import {
    onAddPlayersFail,
    onAddPlayersSuccess,
    onDeletePlayersFail,
    onDeletePlayersSuccess,
    onResetPlayersFail,
    onResetPlayersSuccess,
    onUpdateCanPlayerVoteFail,
    onUpdateCanPlayerVoteSuccess,
    onUpdatePlayerCanAnswerFail,
    onUpdatePlayerCanAnswerSuccess,
    onUpdatePlayerCanAskFail,
    onUpdatePlayerCanAskSuccess,
    onUpdatePlayerNameFail,
    onUpdatePlayerNameSuccess,
    onUpdatePlayerRevealFail,
    onUpdatePlayerRevealSuccess,
    onUpdatePlayerScoreFail,
    onUpdatePlayerScoreSuccess,
} from './actions'
import {
    ACTION_ADD_PLAYERS,
    ACTION_DELETE_PLAYERS,
    ACTION_RESET_PLAYERS,
    ACTION_UPDATE_CAN_PLAYER_VOTE,
    ACTION_UPDATE_PLAYER_CAN_ANSWER,
    ACTION_UPDATE_PLAYER_CAN_ASK,
    ACTION_UPDATE_PLAYER_NAME,
    ACTION_UPDATE_PLAYER_REVEAL,
    ACTION_UPDATE_PLAYER_SCORE,
} from './types'

export function* onAddPlayers({ payload }: PayloadAction<{ name: string }>) {
    try {
        yield put(onAddPlayersSuccess(payload))
    } catch (_) {
        yield put(onAddPlayersFail())
    }
}

export function* onDeletePlayers({ payload }: PayloadAction<{ id: string }>) {
    try {
        yield put(onDeletePlayersSuccess(payload))
    } catch (_) {
        yield put(onDeletePlayersFail())
    }
}

export function* onUpdatePlayerScore({
    payload,
}: PayloadAction<{ _id: string; score: number }>) {
    try {
        yield put(onUpdatePlayerScoreSuccess(payload))
    } catch (_) {
        yield put(onUpdatePlayerScoreFail())
    }
}

export function* onUpdatePlayerReveal({
    payload,
}: PayloadAction<{ _id: string; reveal: boolean }>) {
    try {
        yield put(onUpdatePlayerRevealSuccess(payload))
    } catch (_) {
        yield put(onUpdatePlayerRevealFail())
    }
}

export function* onUpdatePlayerCanAnswer({
    payload,
}: PayloadAction<{ _id: string; canAnswer: boolean }>) {
    try {
        yield put(onUpdatePlayerCanAnswerSuccess(payload))
    } catch (_) {
        yield put(onUpdatePlayerCanAnswerFail())
    }
}

export function* onUpdatePlayerCanAsk({
    payload,
}: PayloadAction<{ _id: string; canAsk: boolean }>) {
    try {
        yield put(onUpdatePlayerCanAskSuccess(payload))
    } catch (_) {
        yield put(onUpdatePlayerCanAskFail())
    }
}

export function* onUpdatePlayerName({
    payload,
}: PayloadAction<{ _id: string; name: string }>) {
    try {
        yield put(onUpdatePlayerNameSuccess(payload))
    } catch (_) {
        yield put(onUpdatePlayerNameFail())
    }
}

export function* onResetPlayers() {
    try {
        yield put(onResetPlayersSuccess())
    } catch (_) {
        yield put(onResetPlayersFail())
    }
}

export function* onUpdateCanPlayerVote({
    payload,
}: PayloadAction<{ _id: string; canVote: boolean }>) {
    try {
        yield put(onUpdateCanPlayerVoteSuccess(payload))
    } catch (_) {
        yield put(onUpdateCanPlayerVoteFail())
    }
}

export function* watchOnResetPlayers() {
    yield takeLatest(ACTION_RESET_PLAYERS, onResetPlayers)
}

export function* watchOnAddPlayers() {
    yield takeLatest(ACTION_ADD_PLAYERS, onAddPlayers)
}

export function* watchOnDeletePlayers() {
    yield takeLatest(ACTION_DELETE_PLAYERS, onDeletePlayers)
}

export function* watchOnUpdatePlayerScore() {
    yield takeLatest(ACTION_UPDATE_PLAYER_SCORE, onUpdatePlayerScore)
}

export function* watchOnUpdatePlayerReveal() {
    yield takeLatest(ACTION_UPDATE_PLAYER_REVEAL, onUpdatePlayerReveal)
}

export function* watchOnUpdatePlayerCanAnswer() {
    yield takeLatest(ACTION_UPDATE_PLAYER_CAN_ANSWER, onUpdatePlayerCanAnswer)
}

export function* watchOnUpdatePlayerCanAsk() {
    yield takeLatest(ACTION_UPDATE_PLAYER_CAN_ASK, onUpdatePlayerCanAsk)
}

export function* watchOnUpdatePlayerName() {
    yield takeLatest(ACTION_UPDATE_PLAYER_NAME, onUpdatePlayerName)
}

export function* watchOnUpdateCanPlayerVote() {
    yield takeLatest(ACTION_UPDATE_CAN_PLAYER_VOTE, onUpdateCanPlayerVote)
}

function* Sagas() {
    yield all([
        fork(watchOnAddPlayers),
        fork(watchOnDeletePlayers),
        fork(watchOnUpdatePlayerScore),
        fork(watchOnUpdatePlayerReveal),
        fork(watchOnUpdatePlayerCanAnswer),
        fork(watchOnUpdatePlayerCanAsk),
        fork(watchOnUpdatePlayerName),
        fork(watchOnResetPlayers),
        fork(watchOnUpdateCanPlayerVote),
    ])
}

export default Sagas
