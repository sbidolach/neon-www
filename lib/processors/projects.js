const openPayments = require('lib/external/open_payments')
const { Project } = require('lib/models')
const { maskCard } = require('lib/util')

async function getProjects (orgId, access) {
  let query = {
    organization: orgId,
    status: 'active'
  }

  if (access) {
    query['access'] = access
  }

  let projectList = await Project.find(query).exec()
  if (projectList.length) {
    // TODO filter doesn't work properly in ixaris.
    // No filter by friendlyName or IDs
    const managedAccounts = await openPayments.getManagedAccounts()
    const pIds = projectList.map((item) => { return item.managedAccountName })

    let mAccounts = {}
    managedAccounts.accounts
      .filter((item) => { return pIds.includes(item.friendlyName) })
      .forEach((item) => {
        const actual = item.balances.actual
        mAccounts[item.friendlyName] = {
          balances: {
            actual: (actual) ? (actual / 100) : 0
          },
          created: item.creationTimestamp
        }
      })

    const projects = projectList.map((item) => {
      const isManaged = mAccounts[item.managedAccountName] || {}
      return {
        name: item.name,
        access: item.access,
        default: item.default,
        description: item.description,
        balances: isManaged.balances || {},
        created: isManaged.created || {},
        id: item.id,
        cards: 10
      }
    })

    return projects
  } else {
    return []
  }
}

async function getCardsFromOpenPayment (cardList) {
  let cards = []
  for (let i = 0; i < cardList.length; i++) {
    const card = cardList[i]
    const managedCards = await openPayments.getManagedCards(card.virtualCardName)
    const managedCard = managedCards.cards[0]
    if (managedCard) {
      let { actual } = managedCard.balances
      actual = (actual) ? (actual / 100) : 0
      cards.push({
        id: card.id,
        name: card.name,
        status: card.status,
        state: managedCard.state,
        cardBrand: managedCard.cardBrand,
        cardNumber: maskCard(managedCard.cardNumber),
        balances: {
          actual: actual
        },
        projectId: card.project,
        userId: card.user,
        startDate: managedCard.startDate,
        endDate: managedCard.endDate
      })
    }
  }

  return cards
}

module.exports = {
  getProjects,
  getCardsFromOpenPayment
}
