import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  BatchesContainer,
  BatchPage,
  StudentPage,
  SignIn,
  SignUp
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div className="container">
        <Route exact path="/" component={BatchesContainer} />
        <Route exact path="/batches" component={BatchesContainer} />
        <Route exact path="/batches/:batchId" component={BatchPage} />
        <Route exact path="/batches/:batchId/students" component={BatchPage} />
        <Route exact path="/batches/:batchId/students/:studentId" component={StudentPage} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
