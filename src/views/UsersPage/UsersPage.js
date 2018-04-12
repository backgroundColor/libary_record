import React from 'react'
import ReactDOM from 'react-dom'
import { Toast, PullToRefresh } from 'antd-mobile'
import AccordList from '../../components/AccordList'
import { getAllUsers } from '../../api/getData'
import classes from './UsersPage.scss'
import R from 'ramda'
import { connect } from 'react-redux'
import { deleteControl } from '../../redux/modules/Users/actions'
const mapActionCreators = { deleteControl }
const mapStateToProps = (state) => {
  const { deleteSta, deleteName } = state.usersReducers
  return { deleteSta, deleteName }
}

type Props = {
  deleteSta: Boolean,
  deleteName: String,
  deleteControl: Function
}
class UserPage extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      page: 1,
      pageSize: 5,
      bottomText: '上拉加载',
      refreshing: false,
      pullState: true,
      height: 0,
      scrollStatus: false
    }
    this.getUsersFn = this.getUsersFn.bind(this)
    this.pageLoad = this.pageLoad.bind(this)
    this.scrollFn = this.scrollFn.bind(this)
    this.scrollTop = this.scrollTop.bind(this)
  }
  componentDidMount () {
    const {pageSize, page} = this.state
    this.getUsersFn({pageSize, page})
    setTimeout(() => {
      this.setState({
        height: document.getElementById('coreLayout').clientHeight - 65
      })
    }, 0)
    this.scrollFn()
  }

  componentWillReceiveProps (nextProps) {
    if (!R.equals(nextProps.deleteSta, this.props.deleteSta) && nextProps.deleteSta) {
      this.getUsersFn({pageSize: this.state.pageSize, page: this.state.page}, nextProps.deleteName)
    }
  }
  getUsersFn (params, name) {
    Toast.loading('loading')
    getAllUsers(params)
    .then(json => {
      if (json.code !== 0) throw new Error(json.message)
      const currentUser = JSON.parse(localStorage.getItem('userInfo'))['user_name']
      // debugger
      this.setState((preState) => {
        const { users } = preState
        const ids = users.map(item => item.id)
        const newData = R.filter(x => x.user_name !== currentUser, json.body)
        if (users.length === 0) {
          return { users: newData }
        } else if (newData.length !== 0) {
          let cloneList = R.filter(x => x.user_name !== name, R.clone(users))
          // debugger
          newData.map(item => item.id).map(id => {
            if (ids.indexOf(id) > -1) {
              cloneList = R.update(R.findIndex(R.propEq('id', id), users),
              newData[R.findIndex(R.propEq('id', id), newData)], cloneList)
            } else {
              cloneList.push(newData[R.findIndex(R.propEq('id', id), newData)])
            }
          })
          return {
            users: cloneList
          }
        }
      })
      this.props.deleteControl(false)
      Toast.hide()
    })
    .catch(err => {
      console.error(err)
      Toast.hide()
      Toast.info(err.message, 1)
    })
  }

  pageLoad () {
    const { pageSize, page, pullState, searchParam } = this.state
    if (!pullState) {
      this.setState({ bottomText: '已经到底' })
      return
    }
    const currentPage = page + 1
    this.setState({ refreshing: true })
    const query = (() => {
      if (searchParam) {
        return {pageSize, page: currentPage, name: searchParam}
      } else {
        return {pageSize, page: currentPage}
      }
    })()

    getAllUsers(query)
    .then(json => {
      const currentUser = JSON.parse(localStorage.getItem('userInfo'))['user_name']
      this.setState((preState) => {
        return {
          users: preState.users.concat(R.filter(x => x.user_name !== currentUser, json.body)),
          refreshing: false,
          page: currentPage,
          pullState: json.body.length === 0
        }
      })
      Toast.hide()
    })
    .catch(err => {
      console.error(err)
      Toast.hide()
      Toast.info(err.message, 1)
    })
  }
// 回到顶部
  scrollFn () {
    let scrollTimeOut
    ReactDOM.findDOMNode(this.ptr).addEventListener('scroll', (e) => {
      clearTimeout(scrollTimeOut)
      scrollTimeOut = setTimeout(() => {
        const distance = ReactDOM.findDOMNode(this.ptr).scrollTop
        if (distance > 100) {
          this.setState({ scrollStatus: true })
        } else {
          this.setState({ scrollStatus: false })
        }
      }, 80)
    }, false)
    clearTimeout(scrollTimeOut)
  }
// 设置回到顶部
  scrollTop () {
    ReactDOM.findDOMNode(this.ptr).scrollTop = 0
  }

  render () {
    const { users, bottomText, refreshing, height, scrollStatus } = this.state
    const _this = this
    return (
      <div className={classes['users-container']}>
        <PullToRefresh
          ref={function (el) { _this.ptr = el }}
          indicator={bottomText}
          direction='up'
          refreshing={refreshing}
          onRefresh={this.pageLoad}
          distanceToRefresh={50}
          style={{
            height,
            overflow: 'auto'
          }}
        >
          {
            users.map((user, index) => {
              return <AccordList key={`user-${index}`} data={user} />
            })
          }
        </PullToRefresh>
        <div className={classes['topBtn']}
          style={{display: scrollStatus ? 'block' : 'none'}}
          onClick={this.scrollTop}
          >
          <img src={require('static/top.svg')} />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapActionCreators)(UserPage)
