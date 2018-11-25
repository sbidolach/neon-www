module.exports = function maskCard (cardNumber) {
  const treeDigits = cardNumber.substring(cardNumber.length - 3, cardNumber.length)
  cardNumber = cardNumber.replace(/[0-9]/g, '*')
  cardNumber = cardNumber.substring(0, cardNumber.length - 3)
  cardNumber = cardNumber.concat(treeDigits)
  return cardNumber
}
