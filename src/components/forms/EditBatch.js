import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'
import { updateBatch } from '../../actions/batches/update'

const buttonStyle = {
  marginRight: '0',
  marginTop: '1rem'
}

export class EditBatch extends PureComponent {
  static propTypes = {
    udpateBatch: PropTypes.func.isRequired,
  }

  state = {
    startDate: this.props.startDate,
    endDate: this.props.endDate,
  }

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

  submitForm(event) {
    event.preventDefault()

    const id = this.props._id

    const updates = {
      number: this.refs.number.getValue() || this.props.number,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    }

    this.props.updateBatch(id, updates)
    this.props.handleClose()
  }

  render() {
    if (!this.props._id) return null

    const {number, startDate, endDate } = this.props

    return (
      <form onSubmit={this.submitForm.bind(this)} className="edit-batch">
          <TextField
            fullWidth={true}
            ref="number"
            type="text"
            floatingLabelText="Batch number:"
            floatingLabelFixed={true}
            placeholder={number}
            errorText={ this.state.numberError}
          />
          <DatePicker
            ref="startDate"
            fullWidth={true}
            autoOk={true}
            onChange={this.handleChangeStartDate}
            floatingLabelText="Start date:"
            floatingLabelFixed={true}
            placeholder={(startDate).substring(0, 10)}
            disableYearSelection={false}
            mode="landscape"
          />

          <DatePicker
            ref="endDate"
            fullWidth={true}
            autoOk={true}
            onChange={this.handleChangeEndDate}
            floatingLabelText="End date:"
            floatingLabelFixed={true}
            placeholder={(endDate).substring(0, 10)}
            disableYearSelection={false}
            mode="landscape"
          />

        <div className="submit-form-btns">
          <RaisedButton
            style={ buttonStyle }
            onClick={ this.submitForm.bind(this) }
            label="Save changes"
            primary={true} />
          <FlatButton
            style={ buttonStyle }
            onClick={ this.props.handleClose }
            label="Cancel"
            primary={true} />
        </div>
      </form>
    )
  }
}

export default connect(null, { updateBatch })(EditBatch)
