import { all, fork } from 'redux-saga/effects'
import GameSagas from './slices/game/sagas'
import PlayersSagas from './slices/players/sagas'

export default function* rootSaga() {
    yield all([fork(PlayersSagas), fork(GameSagas)])
}
