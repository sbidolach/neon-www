import Auth from '../../helpers/auth'
import SubscriptionApi from '../../helpers/api/subscription'

const subscriptionsActions = {
  CHANGE_SUBSCRIPTIONS: 'CHANGE_SUBSCRIPTIONS',
  restoreSubscriptions: () => {
    return async (dispatch, getState) => {
      // get user id
      const firebaseToken = await Auth.getIdToken()
      const response = await SubscriptionApi.getActiveSubscriptions(firebaseToken)
      const subscriptions = response.data || []
      dispatch({
        type: subscriptionsActions.CHANGE_SUBSCRIPTIONS,
        subscriptions
      })
    }
  }
}

export default subscriptionsActions
