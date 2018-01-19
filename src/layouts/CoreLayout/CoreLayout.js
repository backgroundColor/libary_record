import React, { PropTypes } from 'react'
import HeaderNav from 'components/HeaderNav'
import '../../styles/core.scss'
import classes from './CoreLayout.scss'
function CoreLayout ({ children }) {
  return (
    <div className={classes['container']}>
      <HeaderNav />
      <div className={classes['view-container']}>
        {children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
