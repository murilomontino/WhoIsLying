import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import autoMergeLevel from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import categories from './slices/categories/slice'
import type { InitialState as CategoriesState } from './slices/categories/types'
import players from './slices/players/slice'
import type { InitialState as PlayersState } from './slices/players/types'

const makePersistConfig = (key: string) => ({
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

const reducers = {
    players: persistedReducersPlayers,
    categories: persistedReducersCategories,
}

export default reducers
