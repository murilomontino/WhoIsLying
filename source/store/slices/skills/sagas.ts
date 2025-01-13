import type { PayloadAction } from '@reduxjs/toolkit'
import { all, put, select, takeLatest } from 'redux-saga/effects'
import type { Skill } from '~/components/molecules/card-skill/card-skill'
import { selectPlayers } from '~/store/selectors'
import type { RootState } from '~/store/store'
import { onUpdateSkillsInGame } from '../game/actions'
import {
    onChangePlayers,
    onUpdateHistoricSkills,
    onUpdateSkillAttack,
    onUpdateSkillDefense,
} from '../players/actions'
import type { IPlayer } from '../players/player'
import {
    onAddSkillHistoric as onAddSkillHistoricAction,
    onAddSkillHistoricFail,
    onAddSkillHistoricSuccess,
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

export function* onAddSkillHistoric({
    payload,
}: PayloadAction<{
    skill: Skill
    player: IPlayer
}>) {
    try {
        yield put(
            onUpdateHistoricSkills({
                player: payload.player,
                skill: payload.skill,
                type: 'add',
            }),
        )
        yield put(onAddSkillHistoricSuccess())
    } catch (_) {
        yield put(onAddSkillHistoricFail())
    }
}

export function* onBuySkill({
    payload,
}: PayloadAction<{
    skill: Skill
    source: IPlayer
    target: IPlayer
}>) {
    try {
        yield put(
            onChangeBalanceAction({
                player: payload.source,
                skill: payload.skill,
            }),
        )
        yield put(
            onAddSkillHistoricAction({
                player: payload.source,
                skill: payload.skill,
            }),
        )

        switch (payload.skill.identifier) {
            // ATAQUE
            case '#all_or_nothing': // Tudo ou nada
            case '#cloudy_day':
            case '#omen':
            case '#block_vote':
            case '#manipulation':
            case '#corrupt':
            case '#silence':
                yield put(
                    onUpdateSkillAttack({
                        player: payload.target,
                        skill: payload.skill,
                        type: 'add',
                    }),
                )
                break
            // DEFESA
            case '#vigil':
            case '#protection':
                yield put(
                    onUpdateSkillDefense({
                        player: payload.target,
                        skill: payload.skill,
                        type: 'add',
                    }),
                )
                break
            case '#mirror':
            case '#erase_trace':
                yield put(
                    onUpdateSkillDefense({
                        player: payload.source,
                        skill: payload.skill,
                        type: 'add',
                    }),
                )
                break
            // CONTEXT GAME
            case '#counter_espionage':
            case '#crime_concealment':
            case '#confusion':
                yield put(
                    onUpdateSkillsInGame({
                        skill: payload.skill,
                        type: 'add',
                    }),
                )
                break
            // USO IMEDIATO A COMPRA
            case '#target_inversion':
            case '#reverse_espionage':
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

export function* watchOnAddSkillHistoric() {
    yield takeLatest(ACTION_BALANCE_CHANGE, onAddSkillHistoric)
}

function* Sagas() {
    yield all([
        watchOnBuySkill(),
        watchOnChangeBalance(),
        watchOnAddSkillHistoric(),
    ])
}

export default Sagas
