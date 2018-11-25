const express = require('express')
const routeBuilder = require('express-route-builder')

const { buildHandler, authorizor, captcha } = require('lib/middleware')

// Run any authorization middlewares
routeBuilder.addMiddleware({
  name: 'authorizors',
  include: 'optional',
  generator: authorizor
})

// perform the controller operation
routeBuilder.addMiddleware({
  name: 'handler',
  include: 'all',
  generator: buildHandler
})

// Run captcha if required
// routeBuilder.addMiddleware({
//   name: 'captcha',
//   include: 'optional',
//   generator: captcha
// })

/**
 * Generate a router from a set of routes data
 * @param   {Array}           routes      route configuration to build into a router
 * @returns {express.Router}              express router object
 */
module.exports = function addRouter (routes = []) {
  const router = new express.Router()

  return routeBuilder.buildRouter(router, routes)
}
