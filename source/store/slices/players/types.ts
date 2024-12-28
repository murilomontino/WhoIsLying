import type { LOADING } from '~/store/slices/constants'
import type { Player } from './player'

export type InitialState = {
    isLoading: LOADING
    players: Player[]
}

export const name = 'players'

export const ON_CHANGE_PLAYERS = 'ON_CHANGE_PLAYERS'
export const ON_CHANGE_PLAYERS_SUCCESS = 'ON_CHANGE_PLAYERS_SUCCESS'
export const ON_CHANGE_PLAYERS_FAIL = 'ON_CHANGE_PLAYERS_FAIL'

export const ACTION_CHANGE_PLAYERS = `${name}/${ON_CHANGE_PLAYERS}`
export const ACTION_CHANGE_PLAYERS_SUCCESS = `${name}/${ON_CHANGE_PLAYERS_SUCCESS}`
export const ACTION_CHANGE_PLAYERS_FAIL = `${name}/${ON_CHANGE_PLAYERS_FAIL}`
