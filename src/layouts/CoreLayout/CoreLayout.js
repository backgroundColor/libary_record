import React from 'react'
import HeaderNav from 'components/HeaderNav'
import '../../styles/core.scss'
import classes from './CoreLayout.scss'

type Props = {
  children: element,
  location: Object
}
class CoreLayout extends React.Component {
  props: Props
  render () {
    const { children, location } = this.props
    return (
      <div className={classes['container']} id="coreLayout">
        <div className={classes['header-nav']} style={{
          display: location.pathname === '/login' ? 'none' : 'block'
        }}>
          <HeaderNav />
        </div>
        <div className={classes['view-container']} style={{
          height: location.pathname === '/login' ? '100%' : 'calc(100% - 45px)'
        }}>
          {children}
        </div>
      </div>
    )
  }
}

export default CoreLayout
