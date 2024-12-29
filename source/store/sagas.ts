import { all, fork } from 'redux-saga/effects'
import PlayersSagas from './slices/players/sagas'

export default function* rootSaga() {
    yield all([fork(PlayersSagas)])
}
