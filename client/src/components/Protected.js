import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUserLogout } from '../actions/auth'

class Protected extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.logout = this.logout.bind(this)
  }

  logout(e) {
    e.preventDefault()
    this.setState({ redirect: true })
    this.props.dispatch(handleUserLogout())
  }

  render() {
    if(this.props.auth.token === null || this.state.redirect) {
      return <Redirect to='/' />
    }
    return (
      <div>
        Protected Data
        <button onClick={this.logout}>Logout</button>
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