const should = require('should')

const accountHandler = require('./handler')

describe('handler:getActiveBanks', () => {
  describe('#getActiveBanks', () => {
    it('should throw a ValidationError with empty data', async function () {
      try {
        const req = {body: {firebaseToken: 'token'}}
        await accountHandler.getActiveBanks(req)
      } catch (error) {
        should.equal(error.httpCode, undefined)
        should.equal(error.data, undefined)
        should.equal(error.errors, undefined)
        should(error.message).be.a.String()
      }
    })
  })
})
