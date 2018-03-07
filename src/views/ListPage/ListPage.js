import React from 'react'
import { SearchBar, Toast, Modal, Button } from 'antd-mobile'
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
      result: {}
    }
    this.getBooks = this.getBooks.bind(this)
    this.deleteBookFn = this.deleteBookFn.bind(this)
    this.editBookFn = this.editBookFn.bind(this)
    this.onClose = this.onClose.bind(this)
    this.updateRecord = this.updateRecord.bind(this)
    this.submitData = this.submitData.bind(this)
  }
  componentDidMount () {
    this.getBooks()
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

  getBooks () {
    Toast.loading('Loading')
    getBookList()
    .then(json => {
      if (json.code !== 0) throw new Error(json.message)
      this.setState({
        lists: json.body
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
      this.getBooks()
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
    // console.log(val)
    Toast.loading('Loading')
    updateBook(val)
    .then(json => {
      if (json.code !== 0) throw new Error(json.message)
      Toast.hide()
      this.setState({ visible: false })
      this.props.changeFormState(false)
      this.getBooks()
    })
    .catch(err => {
      console.error(err)
      this.props.changeFormState(false)
      Toast.hide()
      Toast.info(err.message, 1)
    })
  }
  render () {
    const { lists, visible, result } = this.state
    return (
      <div className={classes['container']}>
        <div>
          <SearchBar placeholder="Search" maxLength={8} />
        </div>
        <div className={classes['card-content']}>
        {
          lists.map((item, index) => <ListCard value={item} key={`list${index}`}
            editFn={this.editBookFn}
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
    )
  }
}

export default connect(mapStateToProps, mapActionCreators)(ListPage)
