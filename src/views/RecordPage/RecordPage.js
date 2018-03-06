import React from 'react'
import CameraQutoa from 'components/CameraQutoa'
import { getBookInfo, saveBook, deleteBook } from '../../api/getData'
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
  const { formdata } = state.recordReducer
  return { formdata }
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
  }

  componentWillReceiveProps (nextProps) {
    if (!R.equals(nextProps.formdata, this.props.formdata) && !R.isEmpty(nextProps.formdata)) {
      console.log('formdata: ', JSON.stringify(nextProps.formdata, null, 4))
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
      console.log(res)
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
  }

  addRecord () {
    this.props.changeFormState(true)
  }

  submitData (val) {
    Toast.loading('Loading')
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

  updateBook (id) {
    console.log(id)
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
              id={`listItem${item}`} value={his} deleteFn={this.deleteBookFn} updateFn={this.updateBook} />)
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
