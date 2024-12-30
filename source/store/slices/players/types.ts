import type { LOADING } from '~/store/slices/constants'
import type { Player } from './player'

export type InitialState = {
    isLoading: LOADING
    players: (typeof Player)[]
}

export const name = 'players'

export const ON_CHANGE_PLAYERS = 'ON_CHANGE_PLAYERS'
export const ON_CHANGE_PLAYERS_SUCCESS = 'ON_CHANGE_PLAYERS_SUCCESS'
export const ON_CHANGE_PLAYERS_FAIL = 'ON_CHANGE_PLAYERS_FAIL'

export const ON_ADD_PLAYERS = 'ON_ADD_PLAYERS'
export const ON_ADD_PLAYERS_SUCCESS = 'ON_ADD_PLAYERS_SUCCESS'
export const ON_ADD_PLAYERS_FAIL = 'ON_ADD_PLAYERS_FAIL'

export const ON_DELETE_PLAYERS = 'ON_DELETE_PLAYERS'
export const ON_DELETE_PLAYERS_SUCCESS = 'ON_DELETE_PLAYERS_SUCCESS'
export const ON_DELETE_PLAYERS_FAIL = 'ON_DELETE_PLAYERS_FAIL'

export const ACTION_CHANGE_PLAYERS = `${name}/${ON_CHANGE_PLAYERS}`
export const ACTION_CHANGE_PLAYERS_SUCCESS = `${name}/${ON_CHANGE_PLAYERS_SUCCESS}`
export const ACTION_CHANGE_PLAYERS_FAIL = `${name}/${ON_CHANGE_PLAYERS_FAIL}`

export const ACTION_ADD_PLAYERS = `${name}/${ON_ADD_PLAYERS}`
export const ACTION_ADD_PLAYERS_SUCCESS = `${name}/${ON_ADD_PLAYERS_SUCCESS}`
export const ACTION_ADD_PLAYERS_FAIL = `${name}/${ON_ADD_PLAYERS_FAIL}`

export const ACTION_DELETE_PLAYERS = `${name}/${ON_DELETE_PLAYERS}`
export const ACTION_DELETE_PLAYERS_SUCCESS = `${name}/${ON_DELETE_PLAYERS_SUCCESS}`
export const ACTION_DELETE_PLAYERS_FAIL = `${name}/${ON_DELETE_PLAYERS_FAIL}`
