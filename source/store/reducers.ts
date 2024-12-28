import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import autoMergeLevel from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const makePersistConfig = (key: string) => ({
    key,
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel,
})

const session = (state = {}, action) => {
    switch (action.type) {
        default:
            return state
    }
}

const persistedReducersSession = persistReducer(
    makePersistConfig('@dpsystem/session'),
    session,
)

const reducers = {
    session: persistedReducersSession,
}

export default reducers
