import React from 'react'
import CameraQutoa from 'components/CameraQutoa'
import { getBookInfo } from '../../api/getData'
import { Toast, Modal, Button } from 'antd-mobile'
import classes from './RecordPage.scss'
import InfoCard from 'components/InfoCard'
export default class RecordPage extends React.Component {
  constructor () {
    super()
    this.state = {
      visible: true
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
    const res = {
      src: '',
      name: 'test',
      auth: 'dong',
      desc: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }
    return (
      <div className={classes['record-container']}>
        <CameraQutoa getCode={this.getCode} />
        <Modal
          popup
          visible={visible}
          onClose={this.onClose}
          animationType="slide-up"
        >
          <div>
            <InfoCard result={res} />
            <div className={classes['btn-item']}>
              <Button type="warning">取消</Button>
            </div>
            <div className={classes['btn-item']}>
              <Button type="primary">确定</Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
