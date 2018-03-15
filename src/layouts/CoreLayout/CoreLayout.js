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
        <div className={classes['view-container']}>
          {children}
        </div>
      </div>
    )
  }
}

export default CoreLayout
