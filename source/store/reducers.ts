import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import autoMergeLevel from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
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

const reducers = {
    players: persistedReducersPlayers,
}

export default reducers
