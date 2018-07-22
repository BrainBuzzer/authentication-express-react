import React, { Component } from 'react';
import { userLogin } from '../utils/api'
import { connect } from 'react-redux'
import { handleUserLogin } from '../actions/auth'
import { Redirect } from 'react-router-dom'
import { message, Form, Icon, Input, Button, Layout } from 'antd';

const { Content } = Layout
const FormItem = Form.Item;

/**
 * @description This component logs user in.
 * Tokens generated on server side are stored
 * in localStorage.
 */
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: false,
      redirectR: false,
    }
    this.handleLogin = this.handleLogin.bind(this)
    let i = localStorage.getItem('API_TOKEN')
    if(i !== null) {
      this.props.dispatch(handleUserLogin(i))
    }
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
          this.props.dispatch(handleUserLogin(loginres.data.token))
        }
      }).catch(err => {
        message.error(err.message + '. Please check your credentials.')
      })
    }
  }

  render() {
    if(this.state.redirect || this.props.auth.token !== null) {
      return <Redirect to='/protected' />
    }
    if(this.state.redirectR) {
      return <Redirect to='/' />
    }
    return (
      <Content style={{ width: '900px', margin: '0 auto' }}>
        <h2>Login Page</h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange.bind(this)} />
          </FormItem>
          <FormItem>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.handleLogin} style={{ marginTop: '10px' }}>Login</Button>
            <Button type="secondary" onClick={() => this.setState({ redirectR: true })} style={{ marginTop: '10px', marginLeft: '10px' }}>Register Now</Button>
          </FormItem>
        </Form>
      </Content>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Login)