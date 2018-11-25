
import { all, takeEvery, put, fork } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { getToken, clearToken } from '../../helpers/utility'
import actions from './actions'
import Auth from '../../helpers/auth/index'

export function* loginRequest () {
  yield takeEvery('LOGIN_REQUEST', function* () {
    // const isAuth = yield Auth.isAuthenticated()
    // if (isAuth) {
    // const accessToken = yield Auth.getIdToken()
    const accessToken = 'acces_neo_token'
    yield put({
      type: actions.LOGIN_SUCCESS,
      token: accessToken,
      profile: 'Profile'
    })
    yield put(push('/dashboard'))
    // } else {
    //   yield put({ type: actions.LOGIN_ERROR })
    // }
  })
}

export function* loginSuccess () {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    yield localStorage.setItem('id_token', payload.token)
  })
}

export function* loginError () {
  yield takeEvery(actions.LOGIN_ERROR, function*() {})
}

export function* logout () {
  yield takeEvery(actions.LOGOUT, function* () {
    yield Auth.logout()
    clearToken()
    yield put(push('/'))
  })
}

export function* checkAuthorization () {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const token = getToken().get('idToken')
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: 'Profile'
      })
    }
  })
}

export default function* rootSaga () {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout)
  ])
}
