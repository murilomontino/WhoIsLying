import type { RootState } from './store'

export const selectCategories = (state: RootState) => state.categories
export const selectGames = (state: RootState) => state.game
export const selectPlayers = (state: RootState) => state.players
