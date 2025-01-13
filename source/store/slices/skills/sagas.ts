import type { PayloadAction } from '@reduxjs/toolkit'
import { all, put, select, takeLatest } from 'redux-saga/effects'
import type { Skill } from '~/components/molecules/card-skill/card-skill'
import { selectPlayers } from '~/store/selectors'
import type { RootState } from '~/store/store'
import { onChangePlayers } from '../players/actions'
import type { IPlayer } from '../players/player'
import {
    onBuySkillFail,
    onBuySkillSuccess,
    onChangeBalance as onChangeBalanceAction,
    onChangeBalanceFail,
    onChangeBalanceSuccess,
} from './actions'
import { ACTION_BALANCE_CHANGE, ACTION_BUY_SKILL } from './types'

export function* onChangeBalance({
    payload,
}: PayloadAction<{
    skill: Skill
    player: IPlayer
}>) {
    try {
        const { players }: RootState['players'] = yield select(selectPlayers)
        const player = players.find((p) => p._id === payload.player._id)

        if (!player) {
            throw new Error('Player not found')
        }

        if (player.balance < payload.skill.price) {
            throw new Error('Insufficient balance')
        }

        const newPlayers = players.map((p) =>
            p._id === payload.player._id
                ? {
                      ...p,
                      balance: p.balance - payload.skill.price,
                  }
                : p,
        )

        yield put(onChangePlayers({ players: newPlayers }))
        yield put(onChangeBalanceSuccess())
    } catch (_) {
        yield put(onChangeBalanceFail())
    }
}

export function* onBuySkill({
    payload,
}: PayloadAction<{
    skill: Skill
    player: IPlayer
}>) {
    try {
        yield put(onChangeBalanceAction(payload))
        switch (payload.skill.identifier) {
            case '#espionage': // Espionagem
                break
            case '#counter_espionage': // Contra-espionagem
                break
            case '#all_or_nothing': // Tudo ou nada
                break
            case '#crime_concealment':
                break
            case '#block_vote':
                break
            case '#confusion':
                break
            case '#manipulation':
                break
            case '#corrupt':
                break
            case '#silence':
                break
            case '#protection':
                break
            case '#target_inversion':
                break
            case '#mirror':
                break
            case '#erase_trace':
                break
            case '#reverse_espionage':
                break
            case '#omen':
                break
            case '#cloudy_day':
                break
            case '#vigil':
                break
            default:
                break
        }
        yield put(onBuySkillSuccess())
    } catch (_) {
        yield put(onBuySkillFail())
    }
}

export function* watchOnBuySkill() {
    yield takeLatest(ACTION_BUY_SKILL, onBuySkill)
}

export function* watchOnChangeBalance() {
    yield takeLatest(ACTION_BALANCE_CHANGE, onChangeBalance)
}

function* Sagas() {
    yield all([watchOnBuySkill(), watchOnChangeBalance()])
}

export default Sagas
