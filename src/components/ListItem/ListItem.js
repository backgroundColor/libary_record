import React from 'react'
import classes from './ListItem.scss'
import FingerTouch from '../FingerTouch'
import { connect } from 'react-redux'
import { changeItemFocus } from '../../redux/modules/List/actions'
import { Modal } from 'antd-mobile'
import R from 'ramda'
const mapActionCreators = { changeItemFocus }
const alert = Modal.alert
type Props = {
  value: Object,
  id: String,
  changeItemFocus: Function,
  currentItem: String,
  deleteFn: Function,
  updateFn: Function
}
class ListItem extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.handleSwipe = this.handleSwipe.bind(this)
    this.handleDoubleTap = this.handleDoubleTap.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    // 保证多个Item 只能有一个可滑动
    if (!R.equals(nextProps.currentItem, this.props.currentItem) &&
    nextProps.currentItem !== this.props.id &&
    this.props.currentItem !== '') {
      const targetItem = this.refs['listItem']
      targetItem.style.transform = 'translateX(-80px)'
    }
  }

  handleSwipe (e) {
    if (!this.refs['listItem']) throw new Error('target is not found, must be add id to query')
    const direction = e.direction
    const targetItem = this.refs['listItem']
    this.props.changeItemFocus(this.props.id)
    if (direction.toLocaleUpperCase() === 'LEFT') {
      console.log('left')
      targetItem.style.transform = 'translateX(-160px)'
    }

    if (direction.toLocaleUpperCase() === 'RIGHT') {
      targetItem.style.transform = 'translateX(0px)'
      console.log('right')
    }

    if (direction.toLocaleUpperCase() === 'NOCHANGE') {
      console.log('nochange')
      targetItem.style.transform = 'translateX(-80px)'
    }
  }

  handleDoubleTap (e) {
    // console.log(this)
    const targetItem = this.refs['listItem']
    targetItem.style.transform = 'translateX(-80px)'
  }

  modify () {
    console.log('modify')
  }

  delete () {
    console.log(this.props.value)
    const { value, deleteFn } = this.props
    alert('删除', `确定删除${value.name}`, [
      {text: '取消', onPress: () => console.log(value.id), style: 'default'},
      {text: '确定', onPress: () => deleteFn(value.id), style: 'default'}
    ])
  }

  changeRadio (id) {
    console.log(id, 'change radio....')
  }

  render () {
    const { value, id } = this.props
    // const _this = this
    return (
      <FingerTouch
        onSwipe={this.handleSwipe}
        onDoubleTap={this.handleDoubleTap}
        key={id}
        onBlur={this.delete}
        >
        <div className={classes['list-item']} htmlFor={id}>
          <div className={classes['list-container']} ref="listItem">
            <div className={classes['control-btn']} onClick={this.modify}>编辑</div>
            <div className={classes['list-img']}>
              <img src={value.images.small || require('../../static/ceshi.jpg')} />
            </div>
            <div className={classes['list-content']}>
              <p>{`${value.name} ${value.auth}` || '---'}</p>
            </div>
            <div className={classes['control-btn']} onClick={this.delete}>删除</div>
          </div>
        </div>
      </FingerTouch>
    )
  }
}

export default connect(null, mapActionCreators)(ListItem)
