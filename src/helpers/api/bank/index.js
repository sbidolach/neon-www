import axios from 'axios'

class Bank {
  constructor () {
    this.getActiveBanks = this.getActiveBanks.bind(this)
  }
  getActiveBanks (firebaseToken) {
    return axios.post('/api/bank/list', {firebaseToken})
  }
  createClub () {
    window.location = '/dashboard/invest'
    return axios.post('http://localhost:8088/api/bank/leadger', {})
  }
}

export default new Bank()
