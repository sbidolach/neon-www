const should = require('should')

const accountHandler = require('./handler')
const accountSchema = require('./schema')

describe('handler:exchangeCodeForToken', () => {
  describe('#exchangeCodeForToken', () => {
    it('should throw a ValidationError with empty data', async function () {
      try {
        const req = {body: {}}
        await accountHandler.exchangeCodeForToken(req)
      } catch (error) {
        should.equal(error.httpCode, 400)
        should.equal(error.data, undefined)
        should.equal(error.errors, undefined)
        should(error.message).be.a.String()
      }
    })
  })
})

describe('schema:exchangeCodeForToken', () => {
  describe('#exchangeCodeForToken', () => {
    it('should return an error message', async function () {
      const {error} = accountSchema.token({token: { access_token: 'access_token' }})
      should(error.message).be.a.String()
    })
  })
})
