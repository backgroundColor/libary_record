import React from 'react'
import classes from './ListItem.scss'
import FingerTouch from '../FingerTouch'
export default class ListItem extends React.Component {
  constructor () {
    super()
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
  render () {
    return (
      <FingerTouch
        onSwipe={this.handleSwipe}
        onDoubleTap={this.handleDoubleTap}
        key="list-item"
        >
        <div className={classes['list-item']}>
          <div className={classes['list-container']} ref="listItem">
            <div className={classes['control-btn']}>编辑</div>
            <div className={classes['list-img']}>
              <img src={require('../../static/ceshi.jpg')} />
            </div>
            <div className={classes['list-content']}>
              <p>sdgsagsdggdsdgagsdgsdgdsg</p>
            </div>
            <div className={classes['control-btn']}>删除</div>
          </div>
        </div>
      </FingerTouch>
    )
  }
}
