import React from 'react'
import classes from './LoginPage.scss'
import { InputItem, Button } from 'antd-mobile'
import { createForm } from 'rc-form'
import LoginSvg from '../../components/LoginSvg'
type Props = {
  form: Object
}
class LoginPage extends React.Component {
  props: Props
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
              {getFieldDecorator('name', {
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
              <Button className={classes['loginBtn']}>Sign in</Button>
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

export default Login
