import { all, fork, put, takeLatest } from 'redux-saga/effects'

import type { PayloadAction } from '@reduxjs/toolkit'

import {
    onChangePointsFail,
    onChangePointsSuccess,
    onChangeQuestionRoundFail,
    onChangeQuestionRoundSuccess,
    onChangeRoundsFail,
    onChangeRoundsSuccess,
} from './actions'
import {
    ACTION_CHANGE_POINTS,
    ACTION_CHANGE_QUESTION_ROUND,
    ACTION_CHANGE_ROUNDS,
} from './types'

export function* onChangeRounds({ payload }: PayloadAction<{ rounds: number }>) {
    try {
        yield put(onChangeRoundsSuccess(payload))
    } catch (_) {
        yield put(onChangeRoundsFail())
    }
}

export function* onChangeQuestionRounds({
    payload,
}: PayloadAction<{ questionRound: number }>) {
    try {
        yield put(onChangeQuestionRoundSuccess(payload))
    } catch (_) {
        yield put(onChangeQuestionRoundFail())
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

export function* watchOnChangeQuestionRounds() {
    yield takeLatest(ACTION_CHANGE_QUESTION_ROUND, onChangeQuestionRounds)
}

function* Sagas() {
    yield all([
        fork(watchOnChangeRounds),
        fork(watchOnChangePoints),
        fork(watchOnChangeQuestionRounds),
    ])
}

export default Sagas
