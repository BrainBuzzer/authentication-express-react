import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUserLogout } from '../actions/auth'
import { Button } from 'antd'
import axios from 'axios'

/**
 * @description This is protected route where
 * you cannot get in without authentication.
 */
class Protected extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      token: localStorage.getItem('API_TOKEN')
    }
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    axios.get('/protected', {
      headers: {
        'token': this.props.auth.token
      }
    }).then(res => {
      this.setState({ data: res.data.message })
    })
  }

  logout(e) {
    e.preventDefault()
    this.setState({ redirect: true })
    this.props.dispatch(handleUserLogout())
  }

  render() {
    if(this.props.auth.token === null || this.state.token === null || this.state.redirect) {
      return <Redirect to='/' />
    }
    return (
      <div>
        Protected Data fetched from server: {this.state.data}
        <Button onClick={this.logout}>Logout</Button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Protected);