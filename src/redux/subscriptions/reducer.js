import { Map } from 'immutable'
import subscriptionsActions from './actions'

const initState = new Map({
  subscriptions: []
})

export default function transactionReducer (state = initState, action) {
  switch (action.type) {
    case subscriptionsActions.CHANGE_SUBSCRIPTIONS:
      return state.set('subscriptions', action.subscriptions)
    default:
      return state
  }
}
