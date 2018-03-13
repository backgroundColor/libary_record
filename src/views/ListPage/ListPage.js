import React from 'react'
import ReactDOM from 'react-dom'
import { SearchBar, Toast, Modal, Button, PullToRefresh } from 'antd-mobile'
import classes from './ListPage.scss'
import ListCard from '../../components/ListCard'
import InfoCard from '../../components/InfoCard'
import { getBookList, deleteBook, updateBook } from '../../api/getData'
import { connect } from 'react-redux'
import { changeFormState } from '../../redux/modules/Record/action'
import R from 'ramda'
const mapActionCreators = { changeFormState }
const mapStateToProps = (state) => {
  const { formdata, currentState } = state.recordReducer
  return { formdata, currentState }
}
const prompt = Modal.prompt
type Props = {
  changeFormState: Function
}
class ListPage extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.state = {
      lists: [],
      visible: false,
      result: {},
      refreshing: false,
      height: 0,
      page: 1,
      pageSize: 5,
      pullState: true,
      bottomText: '上拉加载',
      scrollStatus: false
    }
    this.getBooks = this.getBooks.bind(this)
    this.deleteBookFn = this.deleteBookFn.bind(this)
    this.editBookFn = this.editBookFn.bind(this)
    this.onClose = this.onClose.bind(this)
    this.updateRecord = this.updateRecord.bind(this)
    this.submitData = this.submitData.bind(this)
    this.pageLoad = this.pageLoad.bind(this)
    this.keepBookFn = this.keepBookFn.bind(this)
    this.keepBook = this.keepBook.bind(this)
    this.scrollFn = this.scrollFn.bind(this)
    this.scrollTop = this.scrollTop.bind(this)
    this.searchFn = this.searchFn.bind(this)
  }
  componentDidMount () {
    const { pageSize = 10, page = 1 } = this.state
    this.getBooks({pageSize, page})
    setTimeout(() => {
      this.setState({
        height: document.getElementById('coreLayout').clientHeight - 65
      })
    }, 0)

    this.scrollFn()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentState && !R.isEmpty(nextProps.formdata)) {
      const res = Object.keys(nextProps.formdata).reduce((res, curr) => {
        if (curr !== 'images') {
          res[curr] = nextProps.formdata[curr]
        } else {
          res[curr] = JSON.parse(nextProps.formdata[curr])
        }
        return res
      }, {})
      this.submitData(res)
    }
  }

  getBooks (params) {
    Toast.loading('Loading')
    getBookList(params)
    .then(json => {
      if (json.code !== 0) throw new Error(json.message)
      this.setState((preState) => {
        const { lists } = preState
        const ids = lists.map(item => item.id)
        const newData = json.body
        if (lists.length === 0) {
          return { lists: json.body }
        } else if (newData.length !== 0) {
          let cloneList = R.clone(lists)
          newData.map(item => item.id).map(id => {
            if (ids.indexOf(id) > -1) {
              cloneList = R.update(R.findIndex(R.propEq('id', id), lists),
              newData[R.findIndex(R.propEq('id', id), newData)], cloneList)
            } else {
              cloneList.push(newData[R.findIndex(R.propEq('id', id), newData)])
            }
          })
          console.log(cloneList)
          return {
            lists: cloneList
          }
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

  deleteBookFn (id) {
    Toast.loading('Loading')
    deleteBook(id)
    .then(json => {
      if (json.code !== 0) throw new Error(json.message)
      Toast.hide()
      this.getBooks({pageSize: this.state.pageSize, page: this.state.page})
    })
    .catch(err => {
      console.error(err)
      Toast.hide()
      Toast.info(err.message, 1)
    })
  }

  editBookFn (value) {
    this.setState({
      visible: true,
      result: {
        id: value.id,
        src: value.images.medium,
        name: value.name,
        auth: value.auth,
        factory: value.factory,
        desc: value.desc,
        images: value.images
      }
    })
  }

  onClose () {
    this.setState({ visible: false })
    this.props.changeFormState(false)
  }

  updateRecord () {
    this.props.changeFormState(true)
  }

  submitData (val) {
    Toast.loading('Loading')
    updateBook(val)
    .then(json => {
      if (json.code !== 0) throw new Error(json.message)
      Toast.hide()
      this.setState({ visible: false })
      this.props.changeFormState(false)
      this.getBooks({pageSize: this.state.pageSize, page: this.state.page})
    })
    .catch(err => {
      console.error(err)
      this.props.changeFormState(false)
      Toast.hide()
      Toast.info(err.message, 1)
    })
  }

  pageLoad () {
    const { pageSize, page, pullState } = this.state
    if (!pullState) {
      this.setState({ bottomText: '已经到底' })
      return
    }
    const currentPage = page + 1
    this.setState({ refreshing: true })
    getBookList({pageSize, page: currentPage})
    .then(json => {
      if (json.code !== 0) throw new Error(json.message)
      this.setState((preState) => {
        return {
          refreshing: false,
          page: currentPage,
          lists: preState.lists.concat(json.body),
          pullState: json.body.length === 0
        }
      })
    })
    .catch(err => {
      console.error(err)
      this.setState({ refreshing: false })
      Toast.info(err.message, 1)
    })
    // setTimeout(() => {
    //   this.setState({ refreshing: false })
    // }, 1000)
  }

  keepBookFn (val) {
    if (!val) throw new Error('id is empty!')
    prompt(`借阅《${val.name}》`, '请输入借阅者名字', [
      {
        text: '取消',
        onPress: () => {}
      },
      {
        text: '确定',
        onPress: value => new Promise((resolve, reject) => {
          const regEx = /^([\u4e00-\u9fa5\·]{2,4})$/
          if (!value || !regEx.test(value)) {
            Toast.info('请正确输入借阅者姓名！')
            reject()
            return
          }
          this.keepBook(val.id, value)
          resolve()
        })
      }
    ], 'default', null, ['请输入借阅者名字'])
  }

  keepBook (id, value) {
    if (!id || !value) throw new Error('id, value must be input!')
    this.submitData({id, keeper: value, status: 1})
  }

  scrollFn () {
    let scrollTimeOut
    ReactDOM.findDOMNode(this.ptr).addEventListener('scroll', (e) => {
      clearTimeout(scrollTimeOut)
      scrollTimeOut = setTimeout(() => {
        const distance = ReactDOM.findDOMNode(this.ptr).scrollTop
        // console.log(distance)
        if (distance > 300) {
          this.setState({ scrollStatus: true })
        } else {
          this.setState({ scrollStatus: false })
        }
      }, 80)
    }, false)
    clearTimeout(scrollTimeOut)
  }

  scrollTop () {
    ReactDOM.findDOMNode(this.ptr).scrollTop = 0
  }

  searchFn (val) {
    if (val) {
      this.setState({ lists: [] })
      this.getBooks({name: val})
      return
    }
    const { pageSize = 10, page = 1 } = this.state
    this.getBooks({pageSize, page})
  }
  render () {
    const { lists, visible, result, refreshing, height, bottomText, scrollStatus } = this.state
    const that = this
    return (
      <div>
        <PullToRefresh
          ref={function (el) { that.ptr = el }}
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
          <div className={classes['container']}>
            <div>
              <SearchBar placeholder="搜索书名/ISBN" maxLength={8} onSubmit={this.searchFn} />
            </div>
            <div className={classes['card-content']}>
              {
                lists.map((item, index) => <ListCard value={item} key={`list${index}`}
                  disabled={item.status === 1}
                  editFn={this.editBookFn}
                  keepFn={this.keepBookFn}
                  deleteFn={this.deleteBookFn} />)
              }
            </div>
            <Modal
              popup
              visible={visible}
              onClose={this.onClose}
              animationType="slide-up"
            >
              <div>
                <InfoCard result={result} />
                <div className={classes['btn-item']}>
                  <Button type="warning" onClick={this.onClose}>取消</Button>
                </div>
                <div className={classes['btn-item']}>
                  <Button type="primary" onClick={this.updateRecord}>确定</Button>
                </div>
              </div>
            </Modal>
          </div>
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

export default connect(mapStateToProps, mapActionCreators)(ListPage)
