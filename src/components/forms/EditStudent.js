import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { updateStudent } from '../../actions/students/update'

const buttonStyle = {
  marginRight: '0',
  marginTop: '1rem'
}

export class AddStudent extends PureComponent {
  static propTypes = {
    createStudent: PropTypes.func.isRequired,
  }

  submitForm(event) {
    event.preventDefault()

    const id = this.props.batchId

    const updates = {
      name: this.refs.name.getValue() || this.props.name,
      photo: this.refs.photo.getValue() || this.props.photo
    }

    const updatedStudent = {
      ...this.props,
      ...updates
    }

    this.props.updateStudent(id, updatedStudent)
    this.props.handleClose()
  }

  render() {
    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <div className="input">
          <TextField ref="name" type="text"
            fullWidth={true}
            floatingLabelText="Name:"
            floatingLabelFixed={true}
            placeholder={this.props.name}
          />

          <TextField ref="photo" type="text"
            fullWidth={true}
            floatingLabelText="Photo:"
            floatingLabelFixed={true}
            placeholder={this.props.photo}
          />
        </div>
        <div className="submit-form-btns">
          <RaisedButton
            style={ buttonStyle }
            onClick={ this.submitForm.bind(this) }
            label="Save changes"
            primary={true} />
          <FlatButton
            style={ buttonStyle }
            onClick={ this.props.toggleOpenState }
            label="Cancel"
            primary={true} />
        </div>
      </form>
    )
  }
}

export default connect(null, { updateStudent })(AddStudent)
