import AsyncStorage from '@react-native-async-storage/async-storage'
import { type PersistConfig, persistReducer } from 'redux-persist'
import autoMergeLevel from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import game from './slices/game/slice'
import type { InitialState as GameState } from './slices/game/types'
import players from './slices/players/slice'
import type { InitialState as PlayersState } from './slices/players/types'
import skills from './slices/skills/slice'

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

const persistedReducersGame = persistReducer<GameState>(
    makePersistConfig('@who-is-lying/game'),
    game,
)

const reducers = {
    players: persistedReducersPlayers,
    game: persistedReducersGame,
    skills,
}

export default reducers
