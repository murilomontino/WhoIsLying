import AsyncStorage from '@react-native-async-storage/async-storage'
import { type PersistConfig, persistReducer } from 'redux-persist'
import autoMergeLevel from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import categories from './slices/categories/slice'
import type { InitialState as CategoriesState } from './slices/categories/types'
import game from './slices/game/slice'
import type { InitialState as GameState } from './slices/game/types'
import players from './slices/players/slice'
import type { InitialState as PlayersState } from './slices/players/types'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const makePersistConfig = (key: string): PersistConfig<any> => ({
    key,
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel,
})

const persistedReducersPlayers = persistReducer<PlayersState>(
    makePersistConfig('@who-is-lying/players'),
    players,
)

const persistedReducersCategories = persistReducer<CategoriesState>(
    makePersistConfig('@who-is-lying/categories'),
    categories,
)

const persistedReducersGame = persistReducer<GameState>(
    makePersistConfig('@who-is-lying/game'),
    game,
)

const reducers = {
    players: persistedReducersPlayers,
    categories: persistedReducersCategories,
    game: persistedReducersGame,
}

export default reducers
