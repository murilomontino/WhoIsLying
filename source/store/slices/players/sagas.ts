import { all, fork, put, takeLatest } from 'redux-saga/effects'

import type { PayloadAction } from '@reduxjs/toolkit'

import {
    onAddPlayersFail,
    onAddPlayersSuccess,
    onDeletePlayersFail,
    onDeletePlayersSuccess,
} from './actions'
import { ACTION_ADD_PLAYERS, ACTION_DELETE_PLAYERS } from './types'

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

export function* watchOnAddPlayers() {
    yield takeLatest(ACTION_ADD_PLAYERS, onAddPlayers)
}

export function* watchOnDeletePlayers() {
    yield takeLatest(ACTION_DELETE_PLAYERS, onDeletePlayers)
}

function* Sagas() {
    yield all([fork(watchOnAddPlayers), fork(watchOnDeletePlayers)])
}

export default Sagas
