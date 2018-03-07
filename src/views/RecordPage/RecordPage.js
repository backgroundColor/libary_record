import React from 'react'
import CameraQutoa from 'components/CameraQutoa'
import { getBookInfo, saveBook, deleteBook, updateBook } from '../../api/getData'
import { Toast, Modal, Button } from 'antd-mobile'
import classes from './RecordPage.scss'
import R from 'ramda'
import InfoCard from 'components/InfoCard'
import { connect } from 'react-redux'
import { changeFormState } from '../../redux/modules/Record/action'
import ListGroup from 'components/ListItem/ListGroup'
import ListItem from 'components/ListItem'
const mapActionCreators = { changeFormState }
const mapStateToProps = (state) => {
  const { formdata, currentState } = state.recordReducer
  return { formdata, currentState }
}
type Props = {
  changeFormState: Function,
  formdata: Object
}
class RecordPage extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      result: {
        src: '',
        name: '',
        auth: '',
        factory: '',
        desc: ''
      },
      histories: []
    }
    this.getCode = this.getCode.bind(this)
    this.onClose = this.onClose.bind(this)
    this.addRecord = this.addRecord.bind(this)
    this.submitData = this.submitData.bind(this)
    this.deleteBookFn = this.deleteBookFn.bind(this)
    this.modifyBook = this.modifyBook.bind(this)
    this.saveBookFn = this.saveBookFn.bind(this)
    this.updateBookFn = this.updateBookFn.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentState && !R.isEmpty(nextProps.formdata)) {
      // console.log('formdata: ', JSON.stringify(nextProps.formdata, null, 4))
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

  getCode (code) {
    if (!code) throw new Error('isbn code is not!')
    Toast.loading('Loading')
    getBookInfo(code)
    .then(res => {
      this.setState({
        result: {
          src: res.images.medium,
          name: res.title,
          auth: res.author.join('&'),
          factory: res.publisher,
          desc: res.summary,
          images: res.images
        },
        visible: true
      })
      Toast.hide()
    })
    .catch(err => {
      console.error(err)
      Toast.hide()
    })
  }

  onClose () {
    this.setState({
      visible: false
    })
    this.props.changeFormState(false)
  }

  addRecord () {
    this.props.changeFormState(true)
  }

  submitData (val) {
    Toast.loading('Loading')
    // debugger
    if (!val.id) {
      this.saveBookFn(val)
    } else {
      this.updateBookFn(val)
    }
  }

  // 保存图书
  saveBookFn (val) {
    if (!val) throw new Error('图书信息为空')
    saveBook(val)
    .then(json => {
      if (json.code !== 0) throw new Error(json.message)
      this.props.changeFormState(false)
      this.setState({
        visible: false,
        histories: this.state.histories.concat(json.body)
      })
      Toast.hide()
    })
    .catch(err => {
      console.error(err)
      Toast.hide()
      this.props.changeFormState(false)
      Toast.info(err.message, 1)
    })
  }
  // 删除图书
  deleteBookFn (id) {
    if (!id) throw new Error('book id is empty')
    Toast.loading('Loading')
    deleteBook(id)
    .then(json => {
      if (json.code !== 0) throw new Error(json.message)
      const filterFn = n => n.id !== id
      Toast.hide()
      this.setState({
        histories: R.filter(filterFn, this.state.histories)
      })
    })
    .catch(err => {
      console.error(err)
      Toast.hide()
      Toast.info(err.message, 1)
    })
  }

  // 修改图书
  updateBookFn (val) {
    if (!val || !val.id) throw new Error('图书信息为空')
    updateBook(val)
    .then(json => {
      if (json.code !== 0) throw new Error(json.message)
      this.props.changeFormState(false)
      this.setState({
        visible: false,
        histories: R.update(R.findIndex(R.propEq('id', val.id))(this.state.histories), val, this.state.histories)
      })
      Toast.hide()
    })
    .catch(err => {
      console.error(err)
      Toast.hide()
      this.props.changeFormState(false)
      Toast.info(err.message, 1)
    })
  }

  // 编辑图书按钮 弹窗
  modifyBook (value) {
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

  render () {
    const { visible, result, histories } = this.state
    return (
      <div className={classes['record-container']}>
        <CameraQutoa getCode={this.getCode} />
        <div className={classes['list-view-container']}>
          <ListGroup>
          {
            histories.map((his, item) => <ListItem key={`listItem${item}`}
              id={`listItem${item}`} value={his} deleteFn={this.deleteBookFn} updateFn={this.modifyBook} />)
          }
          </ListGroup>
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
              <Button type="primary" onClick={this.addRecord}>确定</Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapActionCreators)(RecordPage)
