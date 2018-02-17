import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import createBatch from '../../actions/batches/create'

//material-ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'

import './CreateBatch.css'

export class CreateBatch extends PureComponent {
  static propTypes = {
    createBatch: PropTypes.func.isRequired,
  }

  state = {}

  handleChangeStartDate = (event, date) => {
    this.setState({
      startDate: date
    })
  }

  handleChangeEndDate = (event, date) => {
    this.setState({
      endDate: date
    })
  }

  validateNumber() {
    const { number } = this.refs

    if (number.getValue().length >= 1) {
      this.setState({
        numberError: null
      })
      return true
    }

    this.setState({
      numberError: 'Please provide a number for your new batch'
    })
    return false
  }

  validateStartDate() {
    const { startDate } = this.state
    if (startDate) {
      this.setState({
        startDateError: null
      })
      return true
    }

    this.setState({
      startDateError: 'Starting date is required'
    })
    return false
  }

  validateEndDate() {
    const { endDate } = this.state

    if (endDate) {
      this.setState({
        endDateError: null
      })
      return true
    }

    this.setState({
      endDateError: 'Ending date is required'
    })
    return false
  }

  validateAll() {
    return(
      this.validateNumber() &&
      this.validateStartDate() &&
      this.validateEndDate()
    )
  }

  submitForm(event) {
    event.preventDefault()

    if (this.validateAll()) {
      const batch = {
        number: this.refs.number.getValue(),
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }

      this.props.createBatch(batch)
      this.props.toggleFormState()
      this.props.toggleSnackbarState()
    }

    return false
  }

  render() {
    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <div className="input">
          <TextField
            fullWidth={true}
            ref="number"
            type="text"
            hintText="Batch number: "
            onChange={this.validateNumber.bind(this)}
            errorText={ this.state.numberError}
          />

          <DatePicker
            ref="startDate"
            fullWidth={true}
            autoOk={true}
            floatingLabelText="Start Date"
            disableYearSelection={false}
            mode="landscape"
            onChange={this.handleChangeStartDate}
            errorText={this.state.startDateError}
          />

          <DatePicker
            ref="endDate"
            fullWidth={true}
            autoOk={true}
            floatingLabelText="End Date"
            disableYearSelection={false}
            mode="landscape"
            onChange={this.handleChangeEndDate}
            errorText={this.state.endDateError}
          />
        </div>

        <div className="form-buttons">
          <RaisedButton
            label="Submit"
            primary={true}
            onClick={this.submitForm.bind(this)}
          />

          <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.props.toggleFormState}
          />
        </div>
      </form>
    )
  }
}

export default connect(null, { createBatch })(CreateBatch)
