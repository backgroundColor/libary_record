import React from 'react'
import classes from './Home.scss'
import { Button, List } from 'antd-mobile'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
const Item = List.Item
const mapActionCreators = { push }

type Props = {
  push: Function
}
class Home extends React.Component {
  props: Props
  render () {
    const _this = this
    return (
      <div className={classes['home-container']}>
        <List renderHeader='页面导航'>
          <Item
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            arrow="horizontal"
            onClick={function () { _this.props.push('/record') }}
          >My wallet</Item>
          <Item
            thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
            onClick={function () { _this.props.push('/list') }}
            arrow="horizontal"
          >
            My Cost Ratio
          </Item>
        </List>
      </div>
    )
  }
}

export default connect(null, mapActionCreators)(Home)
