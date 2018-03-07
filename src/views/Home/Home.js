import React from 'react'
import classes from './Home.scss'
import { Button } from 'antd-mobile'
import { Link } from 'react-router'
export default class Home extends React.Component {
  render () {
    return (
      <div className={classes['home-container']}>
        <Button type="ghost">
          <Link to="/record">record</Link>
        </Button>
        <Button type="ghost">
          <Link to="/list">list</Link>
        </Button>
      </div>
    )
  }
}
