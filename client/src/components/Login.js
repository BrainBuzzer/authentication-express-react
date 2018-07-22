import React, { Component } from 'react';
import { userLogin } from '../utils/api'
import { connect } from 'react-redux'
import { handleUserLogin } from '../actions/auth'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: false,
      error: false,
      errorMsg: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handleLogin(e) {
    e.preventDefault()
    if(this.state.username !== '' && this.state.password !== '') {
      userLogin(this.state.username, this.state.password).then(loginres => {
        if(loginres.status === 200) {
          this.props.dispatch(handleUserLogin({ token: loginres.data.token, username: this.state.username }))
        }
      }).catch(err => {
        this.setState({ error: true, errorMsg: err.message})
        console.log(err)
      })
    }
  }

  render() {
    if(this.state.redirect || this.props.auth.token !== null) {
      return <Redirect to='/protected' />
    }
    return (
      <div>
        <form>
          <div className="form-field">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange.bind(this)} />
          </div>
          <div className="form-field">
            <label htmlFor="password">password:</label>
            <input type="password" id="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
          </div>
          <button type="submit" onClick={this.handleLogin}>Login</button>
        </form>
        {this.state.error && (
          <div className="error">{this.state.errorMsg}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Login)