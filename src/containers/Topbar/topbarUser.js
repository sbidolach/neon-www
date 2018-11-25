import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Popover from '../../components/uielements/popover'
import IntlMessages from '../../components/utility/intlMessages'
import defaultUserPic from '../../image/user1.png'
import authAction from '../../redux/auth/actions'
import TopbarDropdownWrapper from './topbarDropdown.style'

const { logout } = authAction

const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1)
  }
  return str
}

class TopbarUser extends Component {
  constructor (props) {
    super(props)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
    this.hide = this.hide.bind(this)
    this.state = {
      visible: false
    }
  }
  componentDidMount () {
    // Auth.getUserProfile()
    //   .then(user => {
    //     if (user && user.photoURL) {
    //       this.setState({
    //         userpic: user.photoURL,
    //         username: user.displayName
    //       })
    //     }
    //   })
  }
  hide () {
    this.setState({ visible: false })
  }
  handleVisibleChange () {
    this.setState({ visible: !this.state.visible })
  }
  render () {
    const url = stripTrailingSlash(this.props.url)

    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <Link to={`${url}/account`} className="isoDropdownLink" onClick={this.hide}>
          <IntlMessages id="themeSwitcher.account" />
        </Link>
        <a className="isoDropdownLink" onClick={this.props.logout}>
          <IntlMessages id="topbar.logout" />
        </a>
      </TopbarDropdownWrapper>
    )

    let { userpic, username } = this.state
    if (!userpic) {
      userpic = defaultUserPic
    }

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div className="isoImgWrapper">
          <img alt={username} src={userpic} />
          <span className="userActivity online" />
        </div>
      </Popover>
    )
  }
}

export default connect(
  null,
  { logout }
)(TopbarUser)
