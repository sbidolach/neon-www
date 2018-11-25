import { all, takeEvery, fork } from 'redux-saga/effects'
import subscriptionsActions from './actions'

export function* changedSubscriptions () {
  yield takeEvery(subscriptionsActions.CHANGE_SUBSCRIPTIONS, function () {

  })
}

export default function* rootSaga () {
  yield all([
    fork(changedSubscriptions)
  ])
}
