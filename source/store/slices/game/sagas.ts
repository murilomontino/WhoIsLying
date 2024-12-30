import { all, fork, put, takeLatest } from 'redux-saga/effects'

import type { PayloadAction } from '@reduxjs/toolkit'

import { onChangeRoundsFail, onChangeRoundsSuccess } from './actions'
import { ACTION_CHANGE_ROUNDS } from './types'

export function* onChangeRounds({ payload }: PayloadAction<{ rounds: number }>) {
    try {
        yield put(onChangeRoundsSuccess(payload))
    } catch (_) {
        yield put(onChangeRoundsFail())
    }
}

export function* watchOnChangeRounds() {
    yield takeLatest(ACTION_CHANGE_ROUNDS, onChangeRounds)
}

function* Sagas() {
    yield all([fork(watchOnChangeRounds)])
}

export default Sagas
