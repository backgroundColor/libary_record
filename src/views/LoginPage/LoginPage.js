import React from 'react'
import classes from './LoginPage.scss'
import { InputItem, Button, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import LoginSvg from '../../components/LoginSvg'
import { login } from '../../api/getData'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { clearUserMess, storeUserMess } from '../../redux/modules/Admin/actions'
const mapStateToProps = (state) => {
  const { userInfo } = state.adminReducers
  return { userInfo }
}
const mapActionCreators = {
  push, clearUserMess, storeUserMess
}
type Props = {
  form: Object,
  push: Function,
  storeUserMess: Function
}
class LoginPage extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loginFn = this.loginFn.bind(this)
  }

  handleSubmit () {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values)
        this.loginFn(values)
      }
    })
  }

  loginFn (val) {
    Toast.loading('Loading')
    login(val)
    .then(json => {
      if (json.code !== 0) {
        throw new Error(json.message)
      }
      Toast.loading('Loading')
      this.props.storeUserMess(json.body)
      this.props.push('/')
    })
    .catch(err => {
      console.error(err)
      Toast.info(err.message, 1)
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={classes['container']}>
        <header>
          <div className={classes['trape']}></div>
          <LoginSvg />
        </header>
        <article>
          <ul>
            <li id="nameForm">
              {getFieldDecorator('user_name', {
                rules: [{ required: true, message: '请输入用户名' }],
                initialValue: ''
              })(
                <InputItem
                  className={classes['myInput']}
                  placeholder="Name"
                  type="text"
                  clear
                />
              )}
            </li>
            <li id="pwdForm">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
                initialValue: ''
              })(
                <InputItem
                  className={classes['myInput']}
                  placeholder="Password"
                  type="password"
                  clear
                />
              )}
            </li>
            <li>
              <Button className={classes['loginBtn']} onClick={this.handleSubmit}>Sign in</Button>
            </li>
            <li>注册账号</li>
          </ul>
        </article>
        <footer>footer</footer>
      </div>
    )
  }
}


const Login = createForm()(LoginPage)

export default connect(mapStateToProps, mapActionCreators)(Login)
