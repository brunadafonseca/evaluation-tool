import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './CreateBatchForm.css'

//material-ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import createBatch from '../actions/batches/create'
import DatePicker from 'material-ui/DatePicker'

export class CreateBatchForm extends PureComponent {
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

  submitForm(event) {
    event.preventDefault()

    if (this.validateNumber() && this.validateStartDate() && this.validateEndDate()) {
      const batch = {
        number: this.refs.number.getValue(),
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }

      this.props.createBatch(batch)
      this.props.handleClose()
      this.props.switchSnackbarState()
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
            onChange={this.handleChangeStartDate}
            autoOk={true}
            floatingLabelText="Start Date"
            disableYearSelection={false}
            mode="landscape"
          />
          <p className="error-text">{this.state.startDateError}</p>

          <DatePicker
            ref="endDate"
            fullWidth={true}
            onChange={this.handleChangeEndDate}
            autoOk={true}
            floatingLabelText="End Date"
            disableYearSelection={false}
            mode="landscape"
          />
          <p className="error-text">{this.state.endDateError}</p>
        </div>

        <div className="buttons">
          <RaisedButton
            onClick={ this.submitForm.bind(this) }
            label="Submit"
            primary={true}
          />

          <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.props.handleClose}
          />
        </div>
      </form>
    )
  }
}

export default connect(null, { createBatch })(CreateBatchForm)
