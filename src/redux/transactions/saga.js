import { all, takeEvery, fork } from 'redux-saga/effects'
import transactionActions from './actions'

export function* changedTransactions () {
  yield takeEvery(transactionActions.CHANGE_TRANSACTIONS, function () {

  })
}

export default function* rootSaga () {
  yield all([
    fork(changedTransactions)
  ])
}
