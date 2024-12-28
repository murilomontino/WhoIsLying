import { Text } from 'react-native'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '~/store/store'

type ReduxContextProps = {
    children: React.ReactNode
}

const ReduxContext = ({ children }: ReduxContextProps) => {
    return (
        <Provider store={store}>
            <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default ReduxContext
