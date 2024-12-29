import { all, fork, put, takeLatest } from 'redux-saga/effects'

import type { PayloadAction } from '@reduxjs/toolkit'

import { onAddPlayersFail, onAddPlayersSuccess } from './actions'
import { ACTION_ADD_PLAYERS } from './types'

export function* onAddPlayers({ payload }: PayloadAction<{ name: string }>) {
    try {
        yield put(onAddPlayersSuccess(payload))
    } catch (_) {
        yield put(onAddPlayersFail())
    }
}

// export function* onChangePlayers({ payload }: PayloadAction) {
//     try {
//         yield delay(2000)
//         yield put(onChangePlayersSuccess())
//     } catch (_) {
//         yield put(onChangePlayersFail())
//     }
// }

// export function* watchOnChangePlayers() {
//     yield takeLatest(ACTION_CHANGE_PLAYERS, onChangePlayers)
// }

export function* watchOnAddPlayers() {
    yield takeLatest(ACTION_ADD_PLAYERS, onAddPlayers)
}

function* Sagas() {
    yield all([fork(watchOnAddPlayers)])
}

export default Sagas
