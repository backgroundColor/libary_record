import React from 'react'
import classes from './InfoCard.scss'
type Props = {
  result: Object
}
export default class InfoCard extends React.Component {
  props: Props
  render () {
    const {src, name, auth, factory, desc} = this.props.result
    return (
      <div className={classes['info-container']}>
        <div className={classes['info-body']}>
          <div className={classes['img-container']}>
            <img src={src} width="100%" />
          </div>
          <div className={classes['msg-container']}>
            <ul>
              <li>
                <span>书&emsp;名:</span>
                <span>{name || '-----'}</span>
              </li>
              <li>
                <span>作&emsp;者:</span>
                <span>{auth || '-----'}</span>
              </li>
              <li>
                <span>出版社:</span>
                <span>{factory || '-----'}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes['desc_container']}>
          {desc || '-----'}
        </div>
      </div>
    )
  }
}
