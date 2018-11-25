import { all, takeEvery, fork, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import bankAccountActions from './actions'

export function* addBankAccount () {
  yield takeEvery(bankAccountActions.ADD_BANKACCOUNTS, function* () {
    yield put(push('/dashboard/bankaccounts'))
  })
}

export function* changedBankAccount () {
  yield takeEvery(bankAccountActions.CHANGE_BANKACCOUNTS, function () {

  })
}

export default function* rootSaga () {
  yield all([
    fork(addBankAccount),
    fork(changedBankAccount)
  ])
}
