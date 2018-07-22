import React, { Component } from 'react';
import { userRegistration, userLogin } from '../utils/api'
import { connect } from 'react-redux'
import { handleUserLogin } from '../actions/auth'
import { Redirect } from 'react-router-dom'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: false,
      error: false,
      errorMsg: ''
    }
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  /**
   * 
   * @description This function registers user via API and then logs him in.
   * Afterwards, token is stored in the redux store and it redirects to the
   * protected route.
   */
  handleRegister(e) {
    e.preventDefault()
    if(this.state.username !== '' && this.state.password !== '') {
      userRegistration(this.state.username, this.state.password)
        .then(res => {
          if(res.status === 200) {
            userLogin(this.state.username, this.state.password).then(loginres => {
              if(loginres.status === 200) {
                this.props.dispatch(handleUserLogin({ token: loginres.data.token, username: this.state.username }))
                this.setState({ redirect: true })
              }
            })
          }
        }).catch(err => {
          this.setState({ error: true, errorMsg: err.response.data.error.name})
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
          <button type="submit" onClick={this.handleRegister}>Register</button>
        </form>
        {this.state.error && (
          <div>{this.state.errorMsg}</div>
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

export default connect(mapStateToProps)(Register);