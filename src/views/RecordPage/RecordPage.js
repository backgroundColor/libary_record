import React from 'react'
import CameraQutoa from 'components/CameraQutoa'
import { getBookInfo } from '../../api/getData'
import { Toast, Modal } from 'antd-mobile'
import classes from './RecordPage.scss'

export default class RecordPage extends React.Component {
  constructor () {
    super()
    this.state = {
      visible: false
    }
    this.getCode = this.getCode.bind(this)
    this.onClose = this.onClose.bind(this)
  }
  getCode (code) {
    if (!code) throw new Error('isbn code is not!')
    // Toast.loading('Loading')
    this.setState({ visible: true })
    // getBookInfo(code)
    // .then(res => {
    //   console.log(res)
    //   Toast.hide()
    // })
    // .catch(err => {
    //   console.error(err)
    //   Toast.hide()
    // })
  }

  onClose () {
    this.setState({
      visible: false
    })
  }
  render () {
    const { visible } = this.state
    return (
      <div className={classes['record-container']}>
        <CameraQutoa getCode={this.getCode} />
        <Modal
          popup
          visible={visible}
          onClose={this.onClose}
          animationType="slide-up"
        >
          <div>11</div>
        </Modal>
      </div>
    )
  }
}
