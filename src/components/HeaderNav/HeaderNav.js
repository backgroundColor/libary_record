import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import classes from './HeaderNav.scss'
import R from 'ramda'

type Props = {}
class HeaderNav extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.state = {
      title: ''
    }

    this.changeTitle = this.changeTitle.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (!R.equals(nextProps, this.props)) {
      this.changeTitle(nextProps.location.pathname)
    }
  }

  changeTitle (path) {
    let title
    if (path.indexOf('record') > -1) {
      title = '录入书籍'
    } else if (path.indexOf('list') > -1) {
      title = '查看列表'
    } else if (path.indexOf('users') > -1) {
      title = '用户列表'
    } else {
      title = ''
    }

    this.setState({ title })
  }
  render () {
    const { title } = this.state
    const userEl = (
      <img className={classes['user-img']}
        key='1'
        src={require('../../static/superman.svg')}
         />
    )

    return (
      <div className={classes['nav-bar']}>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={function () { window.history.back() }}
          rightContent={[userEl]}
        >
          {title}
        </NavBar>
      </div>
    )
  }
}

export default HeaderNav
