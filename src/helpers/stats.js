import moment from 'moment'
import _ from 'lodash'

const getTransactionCategory = (transaction) => {
  const categories = transaction.categories || ['Other']
  return categories[0]
}

export const getCategoryPercent = (transactions) => {
  let stats = {}
  let total = 0
  // get sum from categories
  transactions.forEach(t => {
    const transactionCategory = getTransactionCategory(t)
    const sum = stats[transactionCategory] || 0
    stats[transactionCategory] = sum + Math.abs(t.price)
    total += Math.abs(t.price)
  })
  // calculate percentage
  Object.keys(stats).map((key, index) => {
    const percent = (stats[key] / total) * 100
    stats[key] = Math.round(percent)
    return null
  })
  return stats
}

export const getCategorySpendings = (transactions) => {
  if (!transactions.length) {
    return []
  }

  // sort transactionsActions
  var sortedTransactions = _.sortBy(transactions, 'date')

  let stats = {}
  let uniqueCategory = {}
  for (let i = 0; i < sortedTransactions.length; i++) {
    const t = sortedTransactions[i]
    const date = moment(t.date).format('MM.YYYY')
    if (!stats[date]) {
      stats[date] = {}
    }
    const transactionCategory = getTransactionCategory(t)
    const sum = stats[date][transactionCategory] || 0
    stats[date][transactionCategory] = sum + Math.abs(t.price)
    uniqueCategory[transactionCategory] = ''
  }

  const header = []
  header.push('Month')
  for (let catKey in uniqueCategory) {
    header.push(catKey)
  }

  const data = []
  data.push(header)

  for (const statsKey in stats) {
    const month = stats[statsKey]
    const row = []
    row.push(statsKey)
    for (let catKey in uniqueCategory) {
      row.push(month[catKey] || 0)
    }
    data.push(row)
  }

  return data
}

export const getMonthSpendings = (transactions) => {
  if (!transactions.length) {
    return []
  }

  // sort transactionsActions
  const sortedTransactions = _.sortBy(transactions, 'date')

  let stats = {}
  for (let i = 0; i < sortedTransactions.length; i++) {
    const t = sortedTransactions[i]
    const date = moment(t.date).format('MM.YYYY')
    const sum = stats[date] || 0
    stats[date] = sum + Math.abs(t.price)
  }

  const data = []
  data.push([
    'Month',
    'Expenses', {
      role: 'style'
    }])

  const color = [
    'fill-color: #48A6F2; fill-opacity: 0.4',
    'fill-color: #f64744; fill-opacity: 0.4',
    'fill-color: #ffbf00; fill-opacity: 0.4',
    'fill-color: #511E78; fill-opacity: 0.4'
  ]

  let index = 0
  for (const statsKey in stats) {
    const c = color[index++] || color[0]
    const total = stats[statsKey]
    data.push([statsKey, total, c])
  }

  return data
}

export const getMonthSpendingsStackedChart = (transactions) => {
  if (!transactions.length) {
    return []
  }

  const sortedTransactions = _.sortBy(transactions, 'date')

  let stats = {}
  let uniqueCategory = {}
  for (let i = 0; i < sortedTransactions.length; i++) {
    const t = sortedTransactions[i]
    const date = moment(t.date).format('MM.YYYY')
    if (!stats[date]) {
      stats[date] = {}
    }
    const transactionCategory = getTransactionCategory(t)
    const sum = stats[date][transactionCategory] || 0
    stats[date][transactionCategory] = sum + Math.abs(t.price)
    uniqueCategory[transactionCategory] = ''
  }

  let data = []
  for (const statsKey in stats) {
    let row = {}
    row['name'] = statsKey
    const month = stats[statsKey]
    for (let catKey in uniqueCategory) {
      row[catKey] = month[catKey] || 0
    }
    data.push(row)
  }
  return data
}

export const getHistogram = (transactions) => {
  if (!transactions.length) {
    return []
  }

  const sortedTransactions = _.sortBy(transactions, 'date')

  const data = []
  data.push(['Expense', 'Amount'])
  for (let i = 0; i < sortedTransactions.length; i++) {
    const t = sortedTransactions[i]
    data.push([t.name, Math.abs(t.price)])
  }

  return data
}
