import { all, fork, put, takeLatest } from 'redux-saga/effects'

import type { PayloadAction } from '@reduxjs/toolkit'

import { onChangeCategoryFail, onChangeCategorySuccess } from './actions'
import { ACTION_CHANGE_CATEGORY } from './types'

export function* onChangeCategory({
    payload,
}: PayloadAction<{ category: string }>) {
    try {
        yield put(onChangeCategorySuccess(payload))
    } catch (_) {
        yield put(onChangeCategoryFail())
    }
}

export function* watchOnChangeCategory() {
    yield takeLatest(ACTION_CHANGE_CATEGORY, onChangeCategory)
}

function* Sagas() {
    yield all([fork(watchOnChangeCategory)])
}

export default Sagas
