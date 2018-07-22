import React, { Component } from 'react';
import { userRegistration, userLogin } from '../utils/api'
import { connect } from 'react-redux'
import { handleUserLogin } from '../actions/auth'
import { Redirect } from 'react-router-dom' 
import { message, Form, Icon, Input, Button, Layout } from 'antd';

const { Content } = Layout
const FormItem = Form.Item;

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: false,
      redirectL: false,
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
              } else {
                message.error('Some error occurred. Please check your credentials.')
              }
            })
          }
        }).catch(err => {
          message.error(err.message + '. Please check your credentials.')
        })
    }
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to='/protected' />
    }
    if(this.state.redirectL) {
      return <Redirect to='/login' />
    }
    return (
      <Content style={{ width: '900px', margin: '0 auto' }}>
        <h2>Register Page</h2>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange.bind(this)} />
          </FormItem>
          <FormItem>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.handleRegister} style={{ marginTop: '10px' }}>Register</Button>
            <Button type="secondary" onClick={() => this.setState({ redirectL: true })} style={{ marginTop: '10px', marginLeft: '10px' }}>Go to Login</Button>
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

export default connect(mapStateToProps)(Register);