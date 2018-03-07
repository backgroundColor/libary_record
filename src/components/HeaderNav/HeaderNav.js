import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
export default class HeaderNav extends React.Component {
  render () {
    return (
      <div>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={function () { window.history.back() }}
        >
          Navbar
        </NavBar>
      </div>
    )
  }
}
