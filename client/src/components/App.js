import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Register from './Register'
import Login from './Login'
import Protected from './Protected'

class App extends Component {
  render () {
    return (
      <div>
        <div className="container">
          <Route exact path='/' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/protected' component={Protected} />
        </div>
      </div>
    )
  }
}

export default withRouter(connect()(App))