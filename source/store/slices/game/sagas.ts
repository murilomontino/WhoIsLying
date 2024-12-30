import { all, fork, put, takeLatest } from 'redux-saga/effects'

import type { PayloadAction } from '@reduxjs/toolkit'

import {
    onChangePointsFail,
    onChangePointsSuccess,
    onChangeRoundsFail,
    onChangeRoundsSuccess,
} from './actions'
import { ACTION_CHANGE_POINTS, ACTION_CHANGE_ROUNDS } from './types'

export function* onChangeRounds({ payload }: PayloadAction<{ rounds: number }>) {
    try {
        yield put(onChangeRoundsSuccess(payload))
    } catch (_) {
        yield put(onChangeRoundsFail())
    }
}

export function* onChangePoints({ payload }: PayloadAction<{ points: number }>) {
    try {
        yield put(onChangePointsSuccess(payload))
    } catch (_) {
        yield put(onChangePointsFail())
    }
}

export function* watchOnChangeRounds() {
    yield takeLatest(ACTION_CHANGE_ROUNDS, onChangeRounds)
}

export function* watchOnChangePoints() {
    yield takeLatest(ACTION_CHANGE_POINTS, onChangePoints)
}

function* Sagas() {
    yield all([fork(watchOnChangeRounds), fork(watchOnChangePoints)])
}

export default Sagas
