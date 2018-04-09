import React from 'react'

export default function requireAuth (Component) {
  if (Component.AuthentocatedComponent) {
    return Component.AuthentocatedComponent
  }

  class AuthentocatedComponent extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object.isRequired
    }

    state = {
      login: true
    }

    componentWillMount () {
      this.checkAuth()
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth()
    }

    checkAuth () {
      const userInfo = localStorage.getItem('userInfo')
      const status = userInfo && JSON.parse(userInfo).user_name
      // debugger
      if (!status) {
        // let redirect = window.location.pathname + window.location.search
        // this.context.router.push(`/login?message=401&redirect_uri=${encodeURIComponent(redirect)}`)
        // console.log(redirect)
        this.context.router.push('/login')
        return
      }
      this.setState({ login: status })
    }
    render () {
      const { login } = this.state
      return login ? <Component {...this.props} /> : null
    }
  }

  Component.AuthentocatedComponent = AuthentocatedComponent
  return Component.AuthentocatedComponent
}
