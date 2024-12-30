import type { LOADING } from '~/store/slices/constants'

export type InitialState = {
    isLoading: LOADING
    rounds: number
    points: number
}

export const name = 'game'

export const ON_CHANGE_ROUNDS = 'ON_CHANGE_ROUNDS'
export const ON_CHANGE_ROUNDS_SUCCESS = 'ON_CHANGE_ROUNDS_SUCCESS'
export const ON_CHANGE_ROUNDS_FAIL = 'ON_CHANGE_ROUNDS_FAIL'

export const ON_CHANGE_POINTS = 'ON_CHANGE_POINTS'
export const ON_CHANGE_POINTS_SUCCESS = 'ON_CHANGE_POINTS_SUCCESS'
export const ON_CHANGE_POINTS_FAIL = 'ON_CHANGE_POINTS_FAIL'

export const ACTION_CHANGE_ROUNDS = `${name}/${ON_CHANGE_ROUNDS}`
export const ACTION_CHANGE_ROUNDS_SUCCESS = `${name}/${ON_CHANGE_ROUNDS_SUCCESS}`
export const ACTION_CHANGE_ROUNDS_FAIL = `${name}/${ON_CHANGE_ROUNDS_FAIL}`

export const ACTION_CHANGE_POINTS = `${name}/${ON_CHANGE_POINTS}`
export const ACTION_CHANGE_POINTS_SUCCESS = `${name}/${ON_CHANGE_POINTS_SUCCESS}`
export const ACTION_CHANGE_POINTS_FAIL = `${name}/${ON_CHANGE_POINTS_FAIL}`
