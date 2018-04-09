import React from 'react'
import { NavBar, Icon, Menu, ActivityIndicator, Toast } from 'antd-mobile'
import { singout } from '../../api/getData'
import classes from './HeaderNav.scss'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { clearUserMess } from '../../redux/modules/Admin/actions'
import R from 'ramda'
const mapActionCreators = { push, clearUserMess }
const data = [
  {
    value: '1',
    path: '/record',
    label: '录入'
  }, {
    value: '2',
    path: '/list',
    label: '图书了列表'
  },
  {
    value: '3',
    label: '退出',
    isLeaf: true
  }
]

type Props = {
  push: Function,
  clearUserMess: Function
}
class HeaderNav extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.state = {
      initData: '',
      show: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.onMaskClick = this.onMaskClick.bind(this)
    this.jumpPage = this.jumpPage.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onChange (value) {
    let label = ''
    data.forEach((dataItem) => {
      if (dataItem.value === value[0]) {
        label = dataItem.label
        if (dataItem.children && value[1]) {
          dataItem.children.forEach((cItem) => {
            if (cItem.value === value[1]) {
              label += ` ${cItem.label}`
            }
          })
        }
      }
    })
    this.jumpPage(value)
  }

  jumpPage (val) {
    if (!val) throw new Error('value must be!!')
    switch (Number(val)) {
      case 1:
        this.props.push('/record')
        break
      case 2:
        this.props.push('/list')
        break
      case 3:
        Toast.loading('Loading')
        singout()
        .then(json => {
          if (json.code !== 0) {
            throw new Error(json.message)
          }
          this.props.clearUserMess()
          localStorage.removeItem('userInfo')
          Toast.hide()
          this.props.push('/login')
        })
        .catch(err => {
          console.error(err)
          Toast.info(err.message, 1)
        })
        break
      default:
        return
    }
    this.setState({ show: false })
  }

  handleClick (e) {
    e.preventDefault()
    this.setState({
      show: !this.state.show
    })
    if (!this.state.initData) {
      this.setState({
        initData: data
      })
      // setTimeout(() => {
      //   this.setState({
      //     initData: data
      //   })
      // }, 500)
    }
  }

  onMaskClick () {
    this.setState({ show: false })
  }
  render () {
    const { show, initData } = this.state
    const currentVal = R.find(R.propEq('path', window.location.pathname))(data)
      ? R.find(R.propEq('path', window.location.pathname))(data)['value']
      : '1'
    const menuEl = (
      <Menu
        className={classes['single-foo-menu']}
        data={initData}
        value={[currentVal]}
        level={1}
        onChange={this.onChange}
      />
    )

    const loadingEl = (
      <div style={{ position: 'absolute', width: '100%',
        height: document.documentElement.clientHeight * 0.6, display: 'flex',
        justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </div>
    )

    const userEl = (
      <img className={classes['user-img']}
        key='1'
        src={require('../../static/defaultUser.svg')}
        onClick={this.handleClick} />
    )
    return (
      <div className={classes['nav-bar']}>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={function () { window.history.back() }}
          rightContent={[userEl]}
        >
          Navbar
        </NavBar>
        {show ? initData ? menuEl : loadingEl : null}
        {show ? <div className={classes['menu-mask']} onClick={this.onMaskClick} /> : null}
      </div>
    )
  }
}

export default connect(null, mapActionCreators)(HeaderNav)
// rightContent={[<Icon key="1" type="ellipsis" onClick={this.handleClick} />]}
// <div className={classes['login-mess']} onClick={this.loginClick}>
// <div className={classes['login-img']}>
// <img src={require('../../static/ceshi.jpg')} width='100%' />
// </div>
// </div>
