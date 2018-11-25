import { Map } from 'immutable'
import transactionActions from './actions'

const initState = new Map({
  transactions: []
})

export default function transactionReducer (state = initState, action) {
  switch (action.type) {
    case transactionActions.CHANGE_TRANSACTIONS:
      return state.set('transactions', action.transactions)
    default:
      return state
  }
}
