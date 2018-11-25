import { Map } from 'immutable'
import bankAccountActions from './actions'

const initState = new Map({
  bankAccounts: []
})

export default function bankAccountReducer (state = initState, action) {
  switch (action.type) {
    case bankAccountActions.ADD_BANKACCOUNTS:
      return state.set('bankAccounts', action.bankAccounts)
    case bankAccountActions.CHANGE_BANKACCOUNTS:
      return state.set('bankAccounts', action.bankAccounts)
    default:
      return state
  }
}
