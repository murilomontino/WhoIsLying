import type { PayloadAction } from '@reduxjs/toolkit'
import { all, put, takeLatest } from 'redux-saga/effects'
import { onBuySkillFail, onBuySkillSuccess } from './actions'
import { ACTION_BUY_SKILL } from './types'

export function* onBuySkill({
    payload,
}: PayloadAction<{
    skillId: string
    price: number
}>) {
    try {
        switch (payload.skillId) {
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

function* Sagas() {
    yield all([watchOnBuySkill()])
}

export default Sagas
