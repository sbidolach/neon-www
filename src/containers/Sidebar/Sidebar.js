import React, { Component } from 'react'
import { connect } from 'react-redux'
import clone from 'clone'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import Scrollbars from '../../components/utility/customScrollBar.js'
import Menu from '../../components/uielements/menu'
import SidebarWrapper from './sidebar.style'
import appActions from '../../redux/app/actions'
import Logo from '../../components/utility/logo'

const { Sider } = Layout

const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed
} = appActions

const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1)
  }
  return str
}
class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.onOpenChange = this.onOpenChange.bind(this)
  }
  handleClick (e) {
    this.props.changeCurrent([e.key])
    if (this.props.app.view === 'MobileView') {
      setTimeout(() => {
        this.props.toggleCollapsed()
        this.props.toggleOpenDrawer()
      }, 100)
    }
  }
  onOpenChange (newOpenKeys) {
    const { app, changeOpenKeys } = this.props
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    )
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    )
    let nextOpenKeys = []
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  }
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2']
    }
    return map[key] || []
  };

  render () {
    // const { url, app, toggleOpenDrawer, bgcolor } = this.props;
    const { app, toggleOpenDrawer, customizedTheme } = this.props
    const url = stripTrailingSlash(this.props.url)
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer)
    const { openDrawer } = app
    const mode = collapsed === true ? 'vertical' : 'inline'
    const onMouseEnter = event => {
      if (openDrawer === false) {
        toggleOpenDrawer()
      }
      return
    }
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer()
      }
      return
    }
    const scrollheight = app.height
    const styling = {
      backgroundColor: customizedTheme.backgroundColor
    }
    const submenuColor = {
      color: customizedTheme.textColor
    }
    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width="240"
          className="isomorphicSidebar"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={styling}
        >
          <Logo collapsed={collapsed} />
          <Scrollbars style={{ height: scrollheight - 70 }}>
            <Menu
              onClick={this.handleClick}
              theme="dark"
              mode={mode}
              openKeys={collapsed ? [] : app.openKeys}
              selectedKeys={app.current}
              onOpenChange={this.onOpenChange}
              className="isoDashboardMenu"
            >

              <Menu.Item key="newclub">
                <Link to={`${url}/newclub`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-aperture" />
                    <span className="nav-text">
                      New Club
                    </span>
                  </span>
                </Link>
              </Menu.Item>

              <Menu.Item key="invest">
                <Link to={`${url}/invest`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-ios-list-outline" />
                    <span className="nav-text">
                      Invest
                    </span>
                  </span>
                </Link>
              </Menu.Item>

              <Menu.Item key="stats">
                <Link to={`${url}/stats`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-arrow-graph-up-right" />
                    <span className="nav-text">
                      Dashboard
                    </span>
                  </span>
                </Link>
              </Menu.Item>

              <Menu.Item key="leaderboard">
                <Link to={`${url}/leaderboard`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-ios-person" />
                    <span className="nav-text">
                      Leaderboard
                    </span>
                  </span>
                </Link>
              </Menu.Item>

            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    )
  }
}

export default connect(
  state => ({
    app: state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().sidebarTheme
  }),
  { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
)(Sidebar)
