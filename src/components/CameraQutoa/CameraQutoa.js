import React from 'react'
import Quagga from 'quagga'
import classes from './CameraQutoa.scss'

type Props = {
  getCode: Function
}
export default class CameraQutoa extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.state = {}
    this.scanStart = this.scanStart.bind(this)
    this.selectImg = this.selectImg.bind(this)
  }

  // 开始扫描
  scanStart (url) {
    if (Object.prototype.toString.call(url) !== '[object String]') {
      throw new TypeError('img url agrument must be string!')
    }
    Quagga.decodeSingle({
      decoder: {
        readers: ['ean_reader'] // List of active readers
      },
      locate: true, // try to locate the barcode in the image
      src: url // or 'data:image/jpg;base64,' + data
    }, (result) => {
      if (result && result.codeResult) {
        console.log('result', result.codeResult.code)
        this.props.getCode(result.codeResult.code)
      } else {
        console.log('not detected')
      }
    })
  }
  // 选择图片
  selectImg (e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      console.log(reader)
      this.scanStart(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }
  // 根据ISBN 查询图书信息
  getBookDetail (id) {
    if (Object.prototype.toString.call(id) !== '[object Number]') {
      throw new TypeError('id argument must be number(ISBN)!')
    }
  }
  render () {
    return (
      <div className={classes['camera-container']}>
        <input type="file" onChange={this.selectImg} />camera
        <div ref="target"></div>
      </div>
    )
  }
}
