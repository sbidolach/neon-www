import ReactGA from 'react-ga'
import { googleConfig } from '../config.js'

export const initGA = () => {
  ReactGA.initialize(googleConfig.analyticsKey)
}

export const logPageView = (pathname) => {
  ReactGA.set({ page: pathname })
  ReactGA.pageview(pathname)
}

export const logEvent = (category = '', action = '', label) => {
  if (category && action && label) {
    ReactGA.event({ category, action, label })
  } else if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}
