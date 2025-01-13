import type { LOADING } from '~/store/slices/constants'

export type InitialState = {
    isLoading: LOADING
}

export const name = 'skills'

export const ON_BUY_SKILL = 'ON_BUY_SKILL'
export const ON_BUY_SKILL_SUCCESS = 'ON_BUY_SKILL_SUCCESS'
export const ON_BUY_SKILL_FAIL = 'ON_BUY_SKILL_FAIL'

export const ON_BALANCE_CHANGE = 'ON_BALANCE_CHANGE'
export const ON_BALANCE_CHANGE_SUCCESS = 'ON_BALANCE_CHANGE_SUCCESS'
export const ON_BALANCE_CHANGE_FAIL = 'ON_BALANCE_CHANGE_FAIL'

export const ACTION_BUY_SKILL = `${name}/${ON_BUY_SKILL}`
export const ACTION_BUY_SKILL_SUCCESS = `${name}/${ON_BUY_SKILL_SUCCESS}`
export const ACTION_BUY_SKILL_FAIL = `${name}/${ON_BUY_SKILL_FAIL}`

export const ACTION_BALANCE_CHANGE = `${name}/${ON_BALANCE_CHANGE}`
export const ACTION_BALANCE_CHANGE_SUCCESS = `${name}/${ON_BALANCE_CHANGE_SUCCESS}`
export const ACTION_BALANCE_CHANGE_FAIL = `${name}/${ON_BALANCE_CHANGE_FAIL}`
