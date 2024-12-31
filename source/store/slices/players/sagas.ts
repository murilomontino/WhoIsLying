import { all, fork, put, select, takeLatest } from 'redux-saga/effects'

import type { PayloadAction } from '@reduxjs/toolkit'

import { selectPlayers } from '~/store/selectors'
import type { RootState } from '~/store/store'
import {
    onAddPlayersFail,
    onAddPlayersSuccess,
    onAnsweredTheQuestionFail,
    onAnsweredTheQuestionSuccess,
    onDeletePlayersFail,
    onDeletePlayersSuccess,
    onNewRoundFail,
    onNewRoundSuccess,
    onResetPlayersFail,
    onResetPlayersSuccess,
    onResetVotingFail,
    onResetVotingSuccess,
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
    onVoteInPlayerFail,
    onVoteInPlayerSuccess,
} from './actions'
import type { IPlayer } from './player'
import {
    ACTION_ADD_PLAYERS,
    ACTION_ANSWERED_THE_QUESTION,
    ACTION_DELETE_PLAYERS,
    ACTION_NEW_ROUND,
    ACTION_RESET_PLAYERS,
    ACTION_RESET_VOTING,
    ACTION_UPDATE_CAN_PLAYER_VOTE,
    ACTION_UPDATE_PLAYER_CAN_ANSWER,
    ACTION_UPDATE_PLAYER_CAN_ASK,
    ACTION_UPDATE_PLAYER_NAME,
    ACTION_UPDATE_PLAYER_REVEAL,
    ACTION_UPDATE_PLAYER_SCORE,
    ACTION_VOTE_IN_PLAYER,
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

export function* onAnsweredTheQuestion({
    payload,
}: PayloadAction<{ _id: string; player_ask_id: string }>) {
    try {
        const { players }: RootState['players'] = yield select(selectPlayers)
        const newPlayers: IPlayer[] = players.map((player) => {
            if (player._id !== payload._id) {
                return player
            }
            return {
                ...player,
                blackListQuestioners: [
                    ...player.blackListQuestioners,
                    payload.player_ask_id,
                ],
                canAnswer: false,
            }
        })
        yield put(onAnsweredTheQuestionSuccess({ players: newPlayers }))
    } catch (_) {
        yield put(onAnsweredTheQuestionFail())
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

export function* onResetVoting() {
    try {
        yield put(onResetVotingSuccess())
    } catch (_) {
        yield put(onResetVotingFail())
    }
}

export function* onNewRound() {
    try {
        const { players }: RootState['players'] = yield select(selectPlayers)
        const newPlayers: IPlayer[] = players.map((player) => {
            return {
                ...player,
                canAnswer: true,
                canAsk: true,
                blackListQuestioners: [],
            }
        })
        yield put(onNewRoundSuccess({ players: newPlayers }))
    } catch (_) {
        yield put(onNewRoundFail())
    }
}

export function* onVoteInPlayer({
    payload,
}: PayloadAction<{ disguised_id: string; _id: string }>) {
    try {
        yield put(onVoteInPlayerSuccess(payload))
    } catch (_) {
        yield put(onVoteInPlayerFail())
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

export function* watchOnResetVoting() {
    yield takeLatest(ACTION_RESET_VOTING, onResetVoting)
}

export function* watchOnVoteInPlayer() {
    yield takeLatest(ACTION_VOTE_IN_PLAYER, onVoteInPlayer)
}

export function* watchOnAnsweredTheQuestion() {
    yield takeLatest(ACTION_ANSWERED_THE_QUESTION, onAnsweredTheQuestion)
}

export function* watchOnNewRound() {
    yield takeLatest(ACTION_NEW_ROUND, onNewRound)
}

function* Sagas() {
    yield all([
        fork(watchOnAddPlayers),
        fork(watchOnDeletePlayers),
        fork(watchOnUpdatePlayerScore),
        fork(watchOnUpdatePlayerReveal),
        fork(watchOnUpdatePlayerCanAnswer),
        fork(watchOnAnsweredTheQuestion),
        fork(watchOnUpdatePlayerCanAsk),
        fork(watchOnUpdatePlayerName),
        fork(watchOnResetPlayers),
        fork(watchOnUpdateCanPlayerVote),
        fork(watchOnResetVoting),
        fork(watchOnVoteInPlayer),
        fork(watchOnNewRound),
    ])
}

export default Sagas
