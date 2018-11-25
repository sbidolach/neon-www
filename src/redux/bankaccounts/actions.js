import Auth from '../../helpers/auth'
import OpenBanking from '../../helpers/openbanking'
import BankApi from '../../helpers/api/bank'

const bankAccountActions = {
  ADD_BANKACCOUNTS: 'ADD_BANKACCOUNTS',
  CHANGE_BANKACCOUNTS: 'CHANGE_BANKACCOUNTS',
  addBankAccount: code => {
    return async (dispatch, getState) => {
      const firebaseToken = await Auth.getIdToken()
      const { data } = await OpenBanking.exchangeCodeForToken(code)
      const trueLayerToken = data.token

      const response = await OpenBanking.fetchDataFromBankAccount(trueLayerToken, firebaseToken)
      const {banks} = response.data

      dispatch({
        type: bankAccountActions.ADD_BANKACCOUNTS,
        bankAccounts: banks
      })
    }
  },
  editBankAccount: editBankAccount => {
    return (dispatch, getState) => {
      const oldBankAccounts = getState().BankAccounts.get('bankAccounts')
      const bankAccounts = []
      oldBankAccounts.forEach(bankAccount => {
        if (bankAccount.id !== editBankAccount.id) {
          bankAccounts.push(bankAccount)
        } else {
          bankAccounts.push(editBankAccount)
        }
      })
      dispatch({
        type: bankAccountActions.CHANGE_BANKACCOUNTS,
        bankAccounts
      })
    }
  },
  deleteBankAccount: deletedBankAccount => {
    return async (dispatch, getState) => {

      alert('It has not implemented yet')

      // const user = await Auth.getUserProfile()
      // // selected bank account
      // const oldBankAccounts = getState().BankAccounts.get('bankAccounts')
      // // delete bank account from database
      // await DB.deleteBankAccount(user.uid, deletedBankAccount.bankId)
      //
      // const bankAccounts = []
      // oldBankAccounts.forEach(bankAccount => {
      //   if (bankAccount.bankId !== deletedBankAccount.bankId) {
      //     bankAccounts.push(bankAccount)
      //   }
      // })

      // dispatch({
      //   type: bankAccountActions.CHANGE_BANKACCOUNTS,
      //   bankAccounts
      // })
    }
  },
  restoreBankAccounts: () => {
    return async (dispatch, getState) => {
      const firebaseToken = await Auth.getIdToken()
      const response = await BankApi.getActiveBanks(firebaseToken)
      const bankAccounts = response.data || []
      dispatch({
        type: bankAccountActions.CHANGE_BANKACCOUNTS,
        bankAccounts
      })
    }
  }
}

export default bankAccountActions
