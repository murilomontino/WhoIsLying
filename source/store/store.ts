import { configureStore } from '@reduxjs/toolkit'

import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import rootSaga from './sagas'

const configureStoreDefault = (_initialState = {}) => {
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [sagaMiddleware]

    const store = configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                serializableCheck: false,
            }).concat(middlewares)
        },
        devTools: process.env.NODE_ENV !== 'production',
    })

    sagaMiddleware.run(rootSaga)

    return store
}

export const store = configureStoreDefault()

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
