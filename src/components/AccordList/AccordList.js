import React from 'react'
import classes from './AccordList.scss'
export default class AccordList extends React.Component {
  handlerLock () {
    console.log('locked...')
  }

  handlerDelete () {
    console.log('delete...')
  }
  render () {
    return (
      <div className={classes['list']}>
        <header>
          <img role='user' src={require('static/defaultUser.svg')} />
          <span className={classes['button-container']}>
            <span onClick={this.handlerLock}>
              <img src={require('static/lock.svg')} />锁定
            </span>
            <span onClick={this.handlerDelete}>
              <img src={require('static/delete.svg')} />删除
            </span>
          </span>
        </header>
        <article>
          <span className={classes['list-mess']}>
            <span><b>Name:</b> xxxxxsssssssssxx</span>
            <span><b>Email:</b> XXXXXXX</span>
          </span>
        </article>
      </div>
    )
  }
}
