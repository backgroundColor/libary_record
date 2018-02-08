import React from 'react'
import classes from './ListItem.scss'
import FingerTouch from '../FingerTouch'
type Props = {
  value: Object
}
export default class ListItem extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.handleSwipe = this.handleSwipe.bind(this)
    this.handleDoubleTap = this.handleDoubleTap.bind(this)
  }
  handleSwipe (e) {
    // console.log(this)
    if (!this.refs['listItem']) throw new Error('target is not found, must be add id to query')
    const direction = e.direction
    const targetItem = this.refs['listItem']
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
    console.log('delete')
  }
  render () {
    const { value } = this.props
    return (
      <FingerTouch
        onSwipe={this.handleSwipe}
        onDoubleTap={this.handleDoubleTap}
        key="list-item"
        >
        <div className={classes['list-item']}>
          <div className={classes['list-container']} ref="listItem">
            <div className={classes['control-btn']} onClick={this.modify}>编辑</div>
            <div className={classes['list-img']}>
              <img src={value.images.small || require('../../static/ceshi.jpg')} />
            </div>
            <div className={classes['list-content']}>
              <p>{`${value.name} ${value.auth}` || 'sss'}</p>
            </div>
            <div className={classes['control-btn']} onClick={this.delete}>删除</div>
          </div>
        </div>
      </FingerTouch>
    )
  }
}
