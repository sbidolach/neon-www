import React, { Component } from 'react'
import { connect } from 'react-redux'
import Actions from '../../redux/themeSwitcher/actions.js'
import LanguageSwitcher from '../LanguageSwitcher'
import settingsSVG from '../../image/icons-settings.svg'
import IntlMessages from '../../components/utility/intlMessages'
import ThemeSwitcherStyle from './themeSwitcher.style'

const { switchActivation, changeTheme } = Actions

class ThemeSwitcher extends Component {
  render () {
    const {
      isActivated,
      sidebarTheme,
      switchActivation
    } = this.props

    const styleButton = { background: sidebarTheme.buttonColor }

    return (
      <ThemeSwitcherStyle
        className={isActivated ? 'isoThemeSwitcher active' : 'isoThemeSwitcher'}
      >
        <div className="componentTitleWrapper" style={styleButton}>
          <h3 className="componentTitle">
            <IntlMessages id="themeSwitcher.settings" />
          </h3>
        </div>

        <div className="SwitcherBlockWrapper">
          <LanguageSwitcher />
        </div>

        <button
          type="primary"
          className="switcherToggleBtn"
          style={styleButton}
          onClick={() => {
            switchActivation()
          }}
        >
          <img src={process.env.PUBLIC_URL + settingsSVG} alt="bucket" />
        </button>
      </ThemeSwitcherStyle>
    )
  }
}
function mapStateToProps (state) {
  return {
    ...state.ThemeSwitcher.toJS(),
    LanguageSwitcher: state.LanguageSwitcher.toJS()
  }
}
export default connect(mapStateToProps, {
  switchActivation,
  changeTheme
})(ThemeSwitcher)
