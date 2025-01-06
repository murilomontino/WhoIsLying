import { all, fork, put, select, takeLatest } from 'redux-saga/effects'

import type { PayloadAction } from '@reduxjs/toolkit'

import { selectPlayers } from '~/store/selectors'
import type { RootState } from '~/store/store'
import {
    onChangePointsFail,
    onChangePointsSuccess,
    onChangeQuestionRoundFail,
    onChangeQuestionRoundSuccess,
    onChangeRoundsFail,
    onChangeRoundsSuccess,
    onGenerateDisguisedFail,
    onGenerateDisguisedSuccess,
    onVotingItemFail,
    onVotingItemSuccess,
} from './actions'
import {
    ACTION_CHANGE_POINTS,
    ACTION_CHANGE_QUESTION_ROUND,
    ACTION_CHANGE_ROUNDS,
    ACTION_GENERATE_DISGUISED,
    ACTION_VOTING_ITEM,
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

export function* onGenerateDisguised() {
    try {
        const { players }: RootState['players'] = yield select(selectPlayers)
        yield put(onGenerateDisguisedSuccess({ players }))
    } catch (_) {
        yield put(onGenerateDisguisedFail())
    }
}

export function* onVotingItem({ payload }: PayloadAction<{ votingItem: string }>) {
    try {
        yield put(onVotingItemSuccess(payload))
    } catch (_) {
        yield put(onVotingItemFail())
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

export function* watchOnGenerateDisguised() {
    yield takeLatest(ACTION_GENERATE_DISGUISED, onGenerateDisguised)
}

export function* watchOnVotingItem() {
    yield takeLatest(ACTION_VOTING_ITEM, onVotingItem)
}

function* Sagas() {
    yield all([
        fork(watchOnChangeRounds),
        fork(watchOnChangePoints),
        fork(watchOnChangeQuestionRounds),
        fork(watchOnGenerateDisguised),
        fork(watchOnVotingItem),
    ])
}

export default Sagas
