import { all, delay, fork, put, takeLatest } from 'redux-saga/effects'

import type { PayloadAction } from '@reduxjs/toolkit'

import { onChangePlayersFail, onChangePlayersSuccess } from './actions'
import { ACTION_CHANGE_PLAYERS } from './types'

export function* onChangePlayers({ payload }: PayloadAction) {
    try {
        yield delay(2000)
        yield put(onChangePlayersSuccess())
    } catch (_) {
        yield put(onChangePlayersFail())
    }
}

export function* watchOnChangePlayers() {
    yield takeLatest(ACTION_CHANGE_PLAYERS, onChangePlayers)
}

function* crmSaga() {
    yield all([fork(watchOnChangePlayers)])
}

export default crmSaga
