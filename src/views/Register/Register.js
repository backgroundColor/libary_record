import React from 'react'
import { NavBar, Icon, InputItem, Button, WhiteSpace, Toast } from 'antd-mobile'
import classes from './Register.scss'
import { createForm } from 'rc-form'
import { EMAIL_REG, NAME_REG, PASS_REG } from '../../api/regs'
import { getVerifiCode, register, verifiCode } from '../../api/getData'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { storeUserMess } from '../../redux/modules/Admin/actions'
const mapActionCreators = {
  storeUserMess,
  push
}
type Props = {
  form: Object,
  push: Function,
  storeUserMess: Function
}
let interval
let time = 60
class Register extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.state = {
      disabled: false,
      btnText: '获取验证码',
      time: 0,
      emailError: false,
      nameError: false,
      passError: false,
      repassError: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.emailChange = this.emailChange.bind(this)
    this.errorClick = this.errorClick.bind(this)
    this.handleCode = this.handleCode.bind(this)
    this.getCode = this.getCode.bind(this)
    this.validatorEmail = this.validatorEmail.bind(this)
    this.validatorName = this.validatorName.bind(this)
    this.validatorPassword = this.validatorPassword.bind(this)
    this.validatorRePassword = this.validatorRePassword.bind(this)
  }
  handleSubmit () {
    this.props.form.validateFields((err, value) => {
      const { emailError, nameError, passError, repassError } = this.state
      console.log(value)
      if (!err && !emailError) {
        this.registerFn(value)
      } else {
        if (emailError || err.email) {
          Toast.info('请输入正确的邮箱')
          return
        }

        if (nameError || err.user_name) {
          Toast.info('请输入正确的用户名')
          return
        }

        if (passError || err.password) {
          Toast.info('请输入正确的密码')
          return
        }

        if (repassError || err.repassword) {
          Toast.info('请保证两次输入的密码一致')
          return
        }

        if (err.code) {
          Toast.info('请输入验证码')
          return
        }
      }
    })
  }

  // Register

  registerFn (val) {
    if (!val) throw new Error('register val must be')
    Toast.loading('Loading')
    verifiCode(val.code)
    .then(json => {
      if (json.code !== 0) {
        throw new Error(json.message)
      }
      register({user_name: val.user_name, password: val.password, email: val.email})
      .then(data => {
        if (data.code !== 0) {
          throw new Error(data.message)
        }
        Toast.hide()
        Toast.info(data.message, 1)
        this.props.storeUserMess({user_name: val.user_name})
        localStorage.setItem('userInfo', JSON.stringify({user_name: val.user_name}))
        this.props.push('/')
      })
      .catch(err => {
        console.error(err)
        Toast.info(err.message, 1)
      })
    })
    .catch(err => {
      console.error(err)
      Toast.hide()
      Toast.info(err.message, 1)
    })
  }

  emailChange (val) {
    console.log(EMAIL_REG.test(val))
    this.setState({
      emailVal: val,
      emailError: val ? !EMAIL_REG.test(val) : false
    })
  }

  errorClick (name) {
    // const { emailError } = this.state
    let msg
    switch (name) {
      case 'name':
        msg = '用户名为中文或英文4～8个字符'
        break
      case 'email':
        msg = '请输入正确的邮箱'
        break
      case 'password':
        msg = '6～16字母或数字'
        break
      case 'repassword':
        msg = '确认密码输入一致'
        break
      default:
        return
    }
    Toast.info(msg)
  }

  // 发送验证码
  handleCode () {
    const { emailError } = this.state
    const emailVal = this.props.form.getFieldValue('email')
    if (emailError || !emailVal) {
      Toast.info('请输入正确的邮箱')
      return
    } else {
      console.log('run ....')
      this.runTime()
      this.getCode(emailVal)
    }
  }

  // run time
  runTime () {
    time = 60
    this.setState({
      disabled: true,
      btnText: '重新获取'
    })
    clearInterval(interval)
    interval = setInterval(() => {
      time--
      if (time === 0) {
        clearInterval(interval)
        this.setState({ disabled: false })
      }
      this.setState({ time })
    }, 1000)
  }
  // 获取验证码
  getCode (email) {
    Toast.loading('Loading')
    getVerifiCode(email)
    .then(res => {
      if (res.code !== 0) {
        throw new Error(res.message)
      }
      Toast.hide()
    })
    .catch(err => {
      console.error(err)
      clearInterval(interval)
      time = 60
      this.setState({
        disabled: false,
        time: 0
      })
      Toast.info(err.message, 1)
    })
  }

  validatorEmail (rule, value, callback) {
    if (!EMAIL_REG.test(value)) {
      this.setState({ emailError: true })
      callback('请输入正确的邮箱')
      return
    }
    this.setState({ emailError: false })
    callback()
  }
  validatorName (rule, value, callback) {
    if (!NAME_REG.test(value)) {
      this.setState({ nameError: true })
      callback('用户名为中文或英文4～8个字符')
      return
    }
    this.setState({ nameError: false })
    callback()
  }

  validatorPassword (rule, value, callback) {
    if (!PASS_REG.test(value)) {
      this.setState({ passError: true })
      callback('6～16字母或数字')
      return
    }
    this.setState({ passError: false })
    callback()
  }

  validatorRePassword (rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      this.setState({ repassError: true })
      callback('确认密码输入一致')
      return
    }
    this.setState({ repassError: false })
    callback()
  }
  render () {
    const { getFieldProps } = this.props.form
    const { emailError, disabled, btnText, passError, repassError,
      time, userVal, nameError } = this.state
    const _this = this
    return (
      <div className={classes['regiser-container']}>
        <div className={classes['nav-bar']}>
          <NavBar
            icon={<Icon type='left' />}
            onLeftClick={function () { _this.props.push('/login') }}
         >
          注册
          </NavBar>
        </div>
        <WhiteSpace />
        <div className={classes['container']}>
          <InputItem
            {...getFieldProps('email', {
              rules: [
                { required: true, message: '请填写邮箱' },
                { validator: this.validatorEmail }
              ]
            })}
            type="email"
            error={emailError}
            onErrorClick={function () { _this.errorClick('email') }}
            placeholder="请输入邮箱"
            clear="true"
         >
            <img src={require('static/email.svg')} />
          </InputItem>
          <InputItem
            {...getFieldProps('user_name', {
              rules: [
                { required: true, message: '请填写用户名' },
                { validator: this.validatorName }
              ],
              initialValue: userVal
            })}
            error={nameError}
            placeholder="请填写用户名"
            clear="true"
         >
            <img src={require('static/user.svg')} />
          </InputItem>
          <InputItem
            {...getFieldProps('password', {
              rules: [
                { required: true, message: '请填写密码' },
                { validator: this.validatorPassword }
              ]
            })}
            type="password"
            error={passError}
            onErrorClick={function () { _this.errorClick('password') }}
            placeholder="请填写密码"
            clear="true"
         >
            <img src={require('static/password.svg')} />
          </InputItem>
          <InputItem
            {...getFieldProps('repassword', {
              rules: [
                { required: true, message: '请保证密码一致' },
                { validator: this.validatorRePassword }
              ]
            })}
            type="password"
            error={repassError}
            onErrorClick={function () { _this.errorClick('repassword') }}
            placeholder="请再次输入密码"
            clear="true"
         >
            <img src={require('static/repassword.svg')} />
          </InputItem>
          <InputItem
            {...getFieldProps('code', {
              rules: [{ required: true, message: '请填写验证码' }],
              initialValue: ''
            })}
            placeholder="请输入验证码"
         >
            <img src={require('static/code.svg')} />
          </InputItem>
          <WhiteSpace />
          <Button onClick={this.handleCode} disabled={disabled}>
            {`${btnText}${time !== 0 ? `(${time}s)` : ''}`}
          </Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleSubmit}>注册</Button>
        </div>
      </div>
    )
  }
}

export default connect(null, mapActionCreators)(createForm()(Register))
