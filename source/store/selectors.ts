import type { RootState } from './store'

export const selectGames = (state: RootState) => state.game
export const selectPlayers = (state: RootState) => state.players
