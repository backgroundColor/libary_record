import React from 'react'
import CameraQutoa from 'components/CameraQutoa'
import { getBookInfo } from '../../api/getData'
import { Toast, Modal, Button } from 'antd-mobile'
import classes from './RecordPage.scss'
import R from 'ramda'
import InfoCard from 'components/InfoCard'
import { connect } from 'react-redux'
import { changeFormState } from '../../redux/modules/Record/action'
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
      }
    }
    this.getCode = this.getCode.bind(this)
    this.onClose = this.onClose.bind(this)
    this.addRecord = this.addRecord.bind(this)
    this.submitData = this.submitData.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (!R.equals(nextProps.formdata, this.props.formdata) && !R.isEmpty(nextProps.formdata)) {
      console.log('formdata: ', JSON.stringify(nextProps.formdata, null, 4))
      this.submitData(JSON.stringify(nextProps.formdata, null, 4))
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
          desc: res.summary
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
    console.log(val)
    this.setState({
      visible: false
    })
  }
  render () {
    const { visible, result } = this.state

    return (
      <div className={classes['record-container']}>
        <CameraQutoa getCode={this.getCode} />
        <div className={classes['list-view-container']}>
          <ListItem />
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
