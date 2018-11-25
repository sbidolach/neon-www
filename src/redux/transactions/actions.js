import SubscriptionApi from '../../helpers/api/subscription'
import Auth from '../../helpers/auth'

const transactionActions = {
  CHANGE_TRANSACTIONS: 'CHANGE_TRANSACTIONS',
  restoreTransactions: () => {
    return async (dispatch, getState) => {
      const firebaseToken = await Auth.getIdToken()
      const response = await SubscriptionApi.getSubscriptionHistory(firebaseToken)
      const responseData = response.data || []
      const transactions = responseData.filter(t => t.name !== null)
      dispatch({
        type: transactionActions.CHANGE_TRANSACTIONS,
        transactions
      })
    }
  }
}

export default transactionActions
