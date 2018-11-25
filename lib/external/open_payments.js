const Opc = require('open_payments_cloud_application_api')
const uuid = require('uuid/v1')

const config = require('config')

Opc.ApiClient.instance.basePath = config.opc.urlApi

const {opc: { programmeKey, programmeId, username, password, ownerId, currency, country, issuingProvider, processingProvider, disabled }} = config
const {opc: {profile: { managedCard, managedAccount, externalAccount, deposit, transfer }}} = config

function getToken (correlationId) {
  const api = new Opc.AuthApi()
  const request = new Opc.LoginParams(programmeId, username, password)
  const opt = {xCallref: correlationId || uuid()}
  return api.authLogin(programmeKey, request, opt)
}

exports.createAccount = async function createAccount (externalName, register) {
  const correlationId = uuid()
  const { token } = await getToken(correlationId)
  const opt = {xCallref: correlationId}

  // create external account
  const api = new Opc.ExternalAccountsApi()
  const branchCode = register.swiftCode.substring(6)
  const bankCode = register.ibanCode.substring(8, 14)
  const bankAccountNumber = register.ibanCode.substring(15)

  const params = {
    profileId: externalAccount,
    ownerId: {
      id: ownerId,
      type: 'corporate'
    },
    friendlyName: externalName,
    externalAccountInfo: {
      bankAccountNumber,
      payee: register.owner,
      bankName: register.bankName,
      bankCode,
      branchCode,
      ibanCode: register.ibanCode,
      swiftCode: register.swiftCode,
      country,
      currency
    }
  }

  const request = Opc.CreateExternalAccountParams.constructFromObject(params)
  return api.externalAccountsIdCreate(programmeKey, token, request, opt)
}

exports.getExternalAccounts = async function getExternalAccounts (friendlyName) {
  if (disabled) return {externalAccounts: [{externalAccountInfo: {bankName: 'NO_DATA', payee: 'NO_DATA'}}]}
  const correlationId = uuid()
  const { token } = await getToken(correlationId)
  const opt = {xCallref: correlationId}

  const api = new Opc.ExternalAccountsApi()
  const request = Opc.ExternalAccountFilter.constructFromObject({
    profileId: {value: externalAccount, hasValue: true},
    programmeId: {value: programmeId, hasValue: true},
    ownerId: {value: ownerId, hasValue: true},
    friendlyName: friendlyName
  })

  return api.externalAccountsGet(programmeKey, token, request, opt)
}

exports.getManagedAccounts = async function getManagedAccounts (friendlyName) {
  if (disabled) return {accounts: [{friendlyName: 'NO_DATA', balances: {actual: 0}, id: {id: 0}}]}
  const correlationId = uuid()
  const {token} = await getToken(correlationId)
  const opt = {xCallref: correlationId}

  const api = new Opc.ManagedAccountsApi()
  let params = {
    profileId: {value: managedAccount, hasValue: true},
    programmeId: {value: programmeId, hasValue: true},
    ownerId: {value: ownerId, hasValue: true}
  }

  if (friendlyName) {
    params['friendlyName'] = friendlyName
  }

  const request = Opc.ManagedAccountsFilter.constructFromObject(params)
  return api.managedAccountsGet(programmeKey, token, request, opt)
}

exports.createManagedAccount = async function createManagedAccount (managedName) {
  const correlationId = uuid()
  const { token } = await getToken(correlationId)
  const opt = {xCallref: correlationId}

  const params = {
    profileId: managedAccount,
    ownerId: {
      id: ownerId,
      type: 'corporate'
    },
    friendlyName: managedName,
    currency,
    issuingProvider
  }

  const api = new Opc.ManagedAccountsApi()
  const request = Opc.CreateManagedAccountParams.constructFromObject(params)
  return api.managedAccountsIdCreate(programmeKey, token, request, opt)
}

exports.getManagedAccountStatement = async function getManagedAccountStatement (projectId) {
  if (disabled) return {entries: [{transactionAmount: {amount: 0, currency: 'GBP'}, txId: {type: 'NO_DATA'}}]}
  const correlationId = uuid()
  const { token } = await getToken(correlationId)
  const opt = {xCallref: correlationId}

  const api = new Opc.ManagedAccountsApi()
  const request = new Opc.GetManagedAccountStatementRequestParams()

  return api.managedAccountsIdStatementGet(projectId, programmeKey, token, request, opt)
}

exports.createDeposit = async function createDeposit (value, extId, managedId) {
  const correlationId = uuid()
  const { token } = await getToken(correlationId)
  const opt = {xCallref: correlationId}

  const amount = {currency, amount: (value * 100)}

  // TODO pay in simulator, only for testing
  const apiTest = new Opc.BankTransferSimulatorApi()
  const requestTest = Opc.PayinSimulationParams.constructFromObject({
    providerKey: 'dummy',
    details: {
      bankAmount: amount,
      appliedAmount: amount,
      externalAccountId: extId,
      additionalInfo: 'SOTEC-TEST-PAYIN'
    }
  })

  const payin = await apiTest.bankTransferSimulatorIdPayin(programmeKey, requestTest, opt)

  const api = new Opc.DepositsApi()
  const sourceInstrumentId = {id: extId, type: 'external_accounts'}
  const destinationInstrumentId = {id: managedId, type: 'managed_accounts'}
  const request = Opc.CreateExternalAccountDepositParams.constructFromObject({
    profileId: deposit,
    amount,
    sourceInstrumentId,
    sourcePayinId: payin.payinId,
    destinationInstrumentId
  })

  return api.depositsIdCreateFromExternalAccount(programmeKey, token, request, opt)
}

exports.getManagedCards = async function getManagedCards (friendlyName) {
  if (disabled) return {cards: [{balances: {}, cardNumber: 'NO_DATA', nameOnCard: 'NO_DATA'}]}
  const correlationId = uuid()
  const { token } = await getToken(correlationId)
  const opt = {xCallref: correlationId}

  const api = new Opc.ManagedCardsApi()
  const params = {
    profileId: {value: managedCard, hasValue: true},
    programmeId: {value: programmeId, hasValue: true},
    ownerId: {value: ownerId, hasValue: true}
  }

  if (friendlyName) {
    params['friendlyName'] = friendlyName
  }

  const request = Opc.ManagedCardFilter.constructFromObject(params)
  return api.managedCardsGet(programmeKey, token, request, opt)
}

exports.getManagedCardCvv = async function getManagedCardCvv (cardId) {
  if (disabled) return {cvv: 111}
  const correlationId = uuid()
  const { token } = await getToken(correlationId)
  const opt = {xCallref: correlationId}

  const api = new Opc.ManagedCardsApi()
  return api.managedCardsIdCvvGet(cardId, programmeKey, token, opt)
}

exports.getManagedCardStatement = async function getManagedCardStatement (cardId) {
  if (disabled) return {entries: [{transactionAmount: {amount: 0, currency: 'GBP'}, txId: {type: 'NO_DATA'}}]}
  const correlationId = uuid()
  const { token } = await getToken(correlationId)
  const opt = {xCallref: correlationId}

  const api = new Opc.ManagedCardsApi()
  const request = new Opc.GetManagedCardStatementRequestParams()

  return api.managedCardsIdStatementGet(cardId, programmeKey, token, request, opt)
}

exports.createCard = async function createCard (nameOnCard) {
  const correlationId = uuid()
  const { token } = await getToken(correlationId)
  const opt = {xCallref: correlationId}
  const friendlyName = 'SOTEC.' + uuid()

  // create card
  const api = new Opc.ManagedCardsApi()
  const request = Opc.CreateManagedCardParams.constructFromObject({
    profileId: managedCard,
    ownerId: {
      id: ownerId,
      type: 'corporate'
    },
    friendlyName,
    currency,
    issuingProvider,
    processingProvider,
    nameOnCard: nameOnCard || 'sotec payment solution'
  })

  return api.managedCardsIdCreate(programmeKey, token, request, opt)
}

exports.blockCard = async function blockCard (id) {
  const correlationId = uuid()
  const { token } = await getToken(correlationId)
  const opt = {xCallref: correlationId}

  // block card
  const api = new Opc.ManagedCardsApi()
  var request = Opc.BlockManagedCardParams.constructFromObject({
    block: {blockType: 'OPERATOR'}
  })

  return api.managedCardsIdBlock(id, programmeKey, token, request, opt)
}

exports.unblockCard = async function unblockCard (id) {
  const correlationId = uuid()
  const { token } = await getToken(correlationId)
  const opt = {xCallref: correlationId}

  // unblock card
  const api = new Opc.ManagedCardsApi()
  // TODO: NO_BLOCK should work, but getting field required instead
  var request = Opc.UnblockManagedCardParams.constructFromObject({
    block: {blockType: 'NO_BLOCK'}
  })

  return api.managedCardsIdUnblock(id, programmeKey, token, request, opt)
}

exports.destroyCard = async function destroyCard (id) {
  const correlationId = uuid()
  const { token } = await getToken(correlationId)
  const opt = {xCallref: correlationId}

  // destroy card
  const api = new Opc.ManagedCardsApi()
  // TODO: Validate if destroyType is correct
  var request = Opc.DestroyManagedCardParams.constructFromObject({
    destroyType: 'OPERATOR'
  })

  return api.managedCardsIdDestroy(id, programmeKey, token, request, opt)
}

exports.createTransfer = async function createDeposit (value, managedId, cardId) {
  const correlationId = uuid()
  const { token } = await getToken(correlationId)
  const opt = {xCallref: correlationId}

  const amount = {currency, amount: (value * 100)}

  const api = new Opc.TransfersApi()
  const sourceInstrumentId = {id: managedId, type: 'managed_accounts'}
  const destinationInstrumentId = {id: cardId, type: 'managed_cards'}
  const request = Opc.CreateTransferParams.constructFromObject({
    profileId: transfer,
    amount,
    sourceInstrumentId,
    destinationInstrumentId
  })

  return api.transfersIdCreate(programmeKey, token, request, opt)
}
