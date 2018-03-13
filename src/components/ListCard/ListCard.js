import React from 'react'
import classes from './ListCard.scss'
import { Modal } from 'antd-mobile'
const alert = Modal.alert
type Props = {
  value: Object,
  deleteFn: Function,
  editFn: Function,
  disabled: Boolean,
  keepFn: Function,
  reserveFn: Function
}
export default class ListCard extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.edit = this.edit.bind(this)
    this.deleteFn = this.deleteFn.bind(this)
    this.keep = this.keep.bind(this)
    this.reserve = this.reserve.bind(this)
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

  keep () {
    this.props.keepFn(this.props.value)
  }

  reserve () {
    this.props.reserveFn(this.props.value)
  }
  render () {
    const { value, disabled } = this.props
    return (
      <div className={classes['card']} style={{ backgroundColor: disabled ? '#f5f5f5' : '#fff' }}>
        <header className={classes['header']}><h4>{value.name || '-----'}</h4></header>
        <article className={classes['body']}>
          <img src={value.images && value.images.small ? value.images.small : ''} />
          <div className={classes['content']}>
            <div className={classes['item']}>{value.auth}</div>
            <div className={classes['item']}>{value.factory}</div>
          </div>
        </article>
        <footer>
          <span style={{ display: disabled ? 'block' : 'none', float: 'left', lineHeight: '25px', color: '#7d7d7d' }}>
            {disabled ? `${value.keeper} 已借阅` : ''}
          </span>
          <button disabled={disabled} onClick={this.keep}>
            <img src={require('../../static/control.svg')} />
          </button>&emsp;
          <button disabled={disabled} onClick={this.edit}><img src={require('../../static/edit.svg')} /></button>&emsp;
          <button disabled={disabled} onClick={this.deleteFn}>
            <img src={require('../../static/delete.svg')} />
          </button>&emsp;
          {
            // <button disabled={disabled} onClick={this.reserve}>
            //   <img src={require('../../static/reserve.svg')} />
            // </button>
          }
        </footer>
      </div>
    )
  }
}
