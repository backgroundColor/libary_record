import React from 'react'
import classes from './AccordList.scss'
import { Toast, Modal } from 'antd-mobile'
import { lockOrUnlockUser, deleteUser } from '../../api/getData'
import { connect } from 'react-redux'
import { deleteControl } from '../../redux/modules/Users/actions'
const mapActionCreators = { deleteControl }
type Props = {
  data: Object,
  deleteControl: Function
}

const alert = Modal.alert
class AccordList extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.state = {
      lock: this.props.data.status
    }
    this.lockFn = this.lockFn.bind(this)
    this.deleteFn = this.deleteFn.bind(this)
    this.handlerLock = this.handlerLock.bind(this)
    this.handlerDelete = this.handlerDelete.bind(this)
  }
  handlerLock () {
    console.log('locked...')
    const { user_name } = this.props.data
    const { lock } = this.state
    const text = lock ? '解锁' : '锁定'
    alert(text, `确定${text}${user_name}?`, [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定',
        onPress: () => { this.lockFn() }
      }
    ])
  }

  handlerDelete () {
    console.log('delete...')
    const { user_name } = this.props.data
    alert('删除', `确定删除${user_name}?`, [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定',
        onPress: () => { this.deleteFn() }
      }
    ])
  }

  lockFn () {
    const { user_name } = this.props.data
    Toast.loading('loading')
    lockOrUnlockUser({user_name})
    .then(json => {
      if (json.code !== 0) {
        throw new Error(json.message)
      }
      Toast.hide()
      Toast.info(json.message, 1)
      this.setState({
        lock: json.body.status
      })
    })
    .catch(err => {
      console.error(err)
      Toast.hide()
      Toast.info(err.message, 1)
    })
  }

  deleteFn () {
    const { user_name } = this.props.data
    Toast.loading('loading')
    deleteUser({user_name})
    .then(json => {
      if (json.code !== 0) {
        throw new Error(json.message)
      }
      this.props.deleteControl(true, user_name)
      Toast.hide()
      Toast.info(json.message, 1)
    })
    .catch(err => {
      console.error(err)
      Toast.hide()
      Toast.info(err.message, 1)
    })
  }
  render () {
    const { data } = this.props
    const { lock } = this.state
    const img = lock ? require('static/unlock.svg') : require('static/lock.svg')
    const btnText = lock ? '解锁' : '锁定'
    return (
      <div className={classes['list']}>
        <header>
          <img role='user' src={require('static/defaultUser.svg')} />
          <span className={classes['button-container']}>
            <span onClick={this.handlerLock} style={{background: lock ? '#CEF0B9' : ''}}>
              <img src={img} />{btnText}
            </span>
            <span onClick={this.handlerDelete}>
              <img src={require('static/delete.svg')} />删除
            </span>
          </span>
        </header>
        <article>
          <span className={classes['list-mess']}>
            <span><b>Name:</b> {data.user_name || '---'}</span>
            <span><b>Email:</b> {data.email || '---'}</span>
          </span>
        </article>
      </div>
    )
  }
}

export default connect(null, mapActionCreators)(AccordList)
