import React from 'react'
import classes from './InfoCard.scss'
import { InputItem, TextareaItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import { connect } from 'react-redux'
import { getFormData } from '../../redux/modules/Record/action'
import R from 'ramda'
const mapActionCreators = { getFormData }
const mapStateToProps = (state) => {
  const { currentState } = state.recordReducer
  return { currentState }
}
type Props = {
  result: Object,
  form: Object,
  currentState: Boolean,
  getFormData: Function
}
class InfoCard extends React.Component {
  props: Props

  componentWillReceiveProps (nextProps) {
    if (!R.equals(nextProps.currentState, this.props.currentState) && nextProps.currentState) {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.props.getFormData(values)
        }
      })
    }
  }

  render () {
    const {src, name, auth, factory, desc, images} = this.props.result
    const { getFieldDecorator } = this.props.form
    return (
      <div className={classes['info-container']}>
        <div className={classes['info-body']}>
          <div className={classes['img-container']}>
            <img src={src} width="100%" />
          </div>
          <div className={classes['msg-container']}>
            <ul>
              <li>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入书名' }],
                  initialValue: name || ''
                })(
                  <InputItem
                    placeholder="请输入书名"
                    type="text"
                    clear
                  >书&emsp;名:</InputItem>
                )}
              </li>
              <li>
                {getFieldDecorator('auth', {
                  initialValue: auth || ''
                })(
                  <InputItem
                    placeholder="请输入作者"
                    type="text"
                    clear
                  >作&emsp;者:</InputItem>
                )}
              </li>
              <li>
                {getFieldDecorator('factory', {
                  initialValue: factory || ''
                })(
                  <InputItem
                    placeholder="请输入出版社"
                    type="text"
                    clear
                  >出版社:</InputItem>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className={classes['desc_container']}>
          {getFieldDecorator('desc', {
            initialValue: desc || ''
          })(
            <TextareaItem
              placeholder="请输入描述"
              rows={5}
              clear
            />
          )}
        </div>
        <div className={classes['desc_container']} style={{display: 'none'}}>
          {getFieldDecorator('images', {
            initialValue: JSON.stringify(images) || []
          })(
            <TextareaItem
              placeholder="请输入描述"
              rows={5}
              clear
            />
          )}
        </div>
      </div>
    )
  }
}
const Info = createForm()(InfoCard)

export default connect(mapStateToProps, mapActionCreators)(Info)
