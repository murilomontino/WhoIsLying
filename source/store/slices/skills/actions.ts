import { createAction } from '@reduxjs/toolkit'
import type { Skill } from '~/components/molecules/card-skill/card-skill'
import type { IPlayer } from '../players/player'
import {
    ACTION_BALANCE_CHANGE,
    ACTION_BALANCE_CHANGE_FAIL,
    ACTION_BALANCE_CHANGE_SUCCESS,
    ACTION_BUY_SKILL,
    ACTION_BUY_SKILL_FAIL,
    ACTION_BUY_SKILL_SUCCESS,
} from './types'

export const onBuySkill = createAction<{ skill: Skill; player: IPlayer }>(
    ACTION_BUY_SKILL,
)
export const onBuySkillSuccess = createAction(ACTION_BUY_SKILL_SUCCESS)
export const onBuySkillFail = createAction(ACTION_BUY_SKILL_FAIL)

export const onChangeBalance = createAction<{ skill: Skill; player: IPlayer }>(
    ACTION_BALANCE_CHANGE,
)

export const onChangeBalanceSuccess = createAction(ACTION_BALANCE_CHANGE_SUCCESS)
export const onChangeBalanceFail = createAction(ACTION_BALANCE_CHANGE_FAIL)
