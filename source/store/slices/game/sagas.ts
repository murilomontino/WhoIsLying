import { all, fork, put, select, takeLatest } from 'redux-saga/effects'

import type { PayloadAction } from '@reduxjs/toolkit'

import { selectPlayers } from '~/store/selectors'
import type { RootState } from '~/store/store'
import {
    type NewPlayersScore,
    onChangePlayRoundFail,
    onChangePlayRoundSuccess,
    onChangePointsFail,
    onChangePointsSuccess,
    onChangeQuestionRoundFail,
    onChangeQuestionRoundSuccess,
    onChangeRoundsFail,
    onChangeRoundsSuccess,
    onGenerateDisguisedFail,
    onGenerateDisguisedSuccess,
    onResetGameFail,
    onResetGameSuccess,
    onScorePlayersFail,
    onScorePlayersSuccess,
    onVoteInTheDisguisedFail,
    onVoteInTheDisguisedSuccess,
    onVotingItemFail,
    onVotingItemSuccess,
} from './actions'

import { onChangePlayers, onResetPlayers, onResetScore } from '../players/actions'
import type { IPlayer } from '../players/player'
import {
    ACTION_CHANGE_PLAY_ROUND,
    ACTION_CHANGE_POINTS,
    ACTION_CHANGE_QUESTION_ROUND,
    ACTION_CHANGE_ROUNDS,
    ACTION_GENERATE_DISGUISED,
    ACTION_RESET_GAME,
    ACTION_SCORE_PLAYERS,
    ACTION_VOTE_IN_THE_DISGUISED,
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

export function* onChangePlayRound({ payload }: PayloadAction<{ round: number }>) {
    try {
        yield put(onChangePlayRoundSuccess(payload))
    } catch (_) {
        yield put(onChangePlayRoundFail())
    }
}

export function* onScorePlayers({
    payload,
}: PayloadAction<{
    playersScore: NewPlayersScore[]
}>) {
    try {
        const { players }: RootState['players'] = yield select(selectPlayers)
        const newPlayers = players.map((player) => {
            const newScore = payload.playersScore.find((p) => player._id === p._id)
            if (!newScore) throw new Error('Player not found')
            return {
                ...player,
                score: newScore.score + newScore.sumScore,
            } as IPlayer
        })
        yield put(onChangePlayers({ players: newPlayers }))
        yield put(onScorePlayersSuccess())
    } catch (_) {
        yield put(onScorePlayersFail())
    }
}

export function* onResetGame() {
    try {
        yield put(onResetPlayers())
        yield put(onResetScore())
        yield put(onResetGameSuccess())
    } catch (_) {
        yield put(onResetGameFail())
    }
}

export function* onVoteInTheDisguised({
    payload,
}: PayloadAction<{ player_id: string }>) {
    try {
        yield put(onVoteInTheDisguisedSuccess(payload))
    } catch (_) {
        yield put(onVoteInTheDisguisedFail())
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

export function* watchOnScorePlayers() {
    yield takeLatest(ACTION_SCORE_PLAYERS, onScorePlayers)
}

export function* watchOnResetGame() {
    yield takeLatest(ACTION_RESET_GAME, onResetGame)
}

export function* watchOnVoteInTheDisguised() {
    yield takeLatest(ACTION_VOTE_IN_THE_DISGUISED, onVoteInTheDisguised)
}

export function* watchOnChangePlayRound() {
    yield takeLatest(ACTION_CHANGE_PLAY_ROUND, onChangePlayRound)
}

function* Sagas() {
    yield all([
        fork(watchOnChangeRounds),
        fork(watchOnChangePoints),
        fork(watchOnChangeQuestionRounds),
        fork(watchOnGenerateDisguised),
        fork(watchOnVotingItem),
        fork(watchOnScorePlayers),
        fork(watchOnResetGame),
        fork(watchOnVoteInTheDisguised),
        fork(watchOnChangePlayRound),
    ])
}

export default Sagas
