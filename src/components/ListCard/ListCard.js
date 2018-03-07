import React from 'react'
import classes from './ListCard.scss'
import { Modal } from 'antd-mobile'
const alert = Modal.alert
type Props = {
  value: Object,
  deleteFn: Function,
  editFn: Function
}
export default class ListCard extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.edit = this.edit.bind(this)
    this.deleteFn = this.deleteFn.bind(this)
  }

  edit () {
    console.log('edit')
    const { value, editFn } = this.props
    editFn(value)
  }

  deleteFn () {
    const { value, deleteFn } = this.props
    alert('删除', `确定删除${value.name}`, [
      {text: '取消', onPress: () => {}, style: 'default'},
      {text: '确定', onPress: () => { deleteFn(value.id) }, style: 'default'}
    ])
  }
  render () {
    const { value } = this.props
    return (
      <div className={classes['card']}>
        <header className={classes['header']}><h4>{value.name || '-----'}</h4></header>
        <article className={classes['body']}>
          <img src={value.images && value.images.small ? value.images.small : ''} />
          <div className={classes['content']}>
            <div className={classes['item']}>{value.auth}</div>
            <div className={classes['item']}>{value.factory}</div>
          </div>
        </article>
        <footer>
          <span onClick={this.edit}><img src={require('../../static/edit.svg')} /></span>&emsp;
          <span onClick={this.deleteFn}><img src={require('../../static/delete.svg')} /></span>
        </footer>
      </div>
    )
  }
}
