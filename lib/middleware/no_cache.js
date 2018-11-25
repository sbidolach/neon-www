module.exports = function () {
  return function noCacheMiddleware (req, res, next) {
    res.setHeader('Cache-Control', 'no-store, no-cache')
    res.setHeader('Pragma', 'no-cache')

    next()
  }
}
