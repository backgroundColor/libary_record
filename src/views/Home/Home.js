import React from 'react'
import classes from './Home.scss'
import { List, Button, WhiteSpace, Toast, Modal } from 'antd-mobile'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { clearUserMess } from '../../redux/modules/Admin/actions'
import { singout } from '../../api/getData'
const Item = List.Item
const mapActionCreators = { push, clearUserMess }
const alert = Modal.alert
type Props = {
  push: Function,
  clearUserMess: Function
}
class Home extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.handlerSingout = this.handlerSingout.bind(this)
  }
  handlerSingout () {
    const _this = this
    alert('退出登录', '确定退出??', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定',
        onPress: () => {
          Toast.loading('Loading')
          singout()
          .then(json => {
            if (json.code !== 0) {
              throw new Error(json.message)
            }
            _this.props.clearUserMess()
            localStorage.removeItem('userInfo')
            Toast.hide()
            _this.props.push('/login')
          })
          .catch(err => {
            console.error(err)
            Toast.info(err.message, 1)
          })
        }
      }
    ])
  }
  render () {
    const _this = this
    return (
      <div className={classes['home-container']}>
        <List renderHeader='页面导航'>
          <Item
            thumb={require('static/camera.svg')}
            arrow="horizontal"
            onClick={function () { _this.props.push('/record') }}
          >录入书籍</Item>
          <Item
            thumb={require('static/list.svg')}
            onClick={function () { _this.props.push('/list') }}
            arrow="horizontal"
          >
            查看列表
          </Item>
        </List>
        <WhiteSpace />
        <WhiteSpace />
        <Button type='warning' onClick={this.handlerSingout}>退出</Button>
      </div>
    )
  }
}

export default connect(null, mapActionCreators)(Home)
