// import { persistReducer } from 'redux-persist'
import autoMergeLevel from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import AsyncStorage from '@react-native-async-storage/async-storage'

const makePersistConfig = (key: string) => ({
    key,
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel,
})

// const persistedReducersSession = persistReducer<SessionState>(
//     makePersistConfig('@dpsystem/session'),
//     // biome-ignore lint/suspicious/noExplicitAny: <explanation>
//     session as any,
// )

const reducers = {
    
}

export default reducers
