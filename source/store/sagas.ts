import { all, fork } from 'redux-saga/effects'
import CategoriesSagas from './slices/categories/sagas'
import GameSagas from './slices/game/sagas'
import PlayersSagas from './slices/players/sagas'

export default function* rootSaga() {
    yield all([fork(PlayersSagas), fork(CategoriesSagas), fork(GameSagas)])
}
