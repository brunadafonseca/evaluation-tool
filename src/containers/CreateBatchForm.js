import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import createBatch from '../actions/batches/create'
import Title from '../components/UI/Title'
import DatePicker from 'material-ui/DatePicker'
import './CreateBatchForm.css'

const dialogStyle = {
  width: '400px',
  margin: '20px auto',
  padding: '2rem',
}

const buttonStyle = {
  float: 'right',
  marginLeft: '2rem',
}

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
}

export class CreateBatchForm extends PureComponent {
  static propTypes = {
    createBatch: PropTypes.func.isRequired,
  }

  state = {}

  submitForm(event) {
    event.preventDefault()
    if (this.validateNumber()) {
      const batch = {
        number: this.refs.number.getValue(),
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }
      this.props.createBatch(batch)
      this.props.handleClose()
    }
    return false
  }

  handleChangeMinDate = (event, date) => {
    this.setState({
      startDate: date,
    })
  }

  handleChangeMaxDate = (event, date) => {
    this.setState({
      endDate: date,
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

  render() {
    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />
      ]

    return (
        <div>
          <form onSubmit={this.submitForm.bind(this)}>
            <div className="input">
              <TextField ref="number" type="text" hintText="Batch number: "
                onChange={this.validateNumber.bind(this)}
                errorText={ this.state.numberError} />
                <div style={optionsStyle}>
                  <DatePicker
                    onChange={this.handleChangeMinDate}
                    autoOk={true}
                    floatingLabelText="Start Date"
                    disableYearSelection={false}
                    mode="landscape"
                  />
                  <DatePicker
                    onChange={this.handleChangeMaxDate}
                    autoOk={true}
                    floatingLabelText="End Date"
                    disableYearSelection={false}
                    mode="landscape"
                  />
                </div>
            </div>
          </form>
          <RaisedButton
            onClick={ this.submitForm.bind(this) }
            label="Submit"
            primary={true} />
        </div>
    )
  }
}



export default connect(null, { createBatch })(CreateBatchForm)
