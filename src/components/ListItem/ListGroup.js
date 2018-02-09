import React from 'react'
import { connect } from 'react-redux'
// import { changeItemFocus } from '../../redux/modules/List/actions'
type Props = {
  children: Element,
  currentItem: String
}

const mapStateToProps = (state) => {
  const { currentItem } = state.listReducer
  return { currentItem }
}
class ListGroup extends React.Component {
  props: Props

  render () {
    const { children, currentItem } = this.props
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { currentItem }))
    return (
      <div>
        {childrenWithProps}
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(ListGroup)
