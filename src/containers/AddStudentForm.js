import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { createStudent } from '../actions/students/create'
import './AddStudentForm.css'

const inputStyle = {
  marginTop: '1rem',
}

const buttonStyle = {
  marginRight: '0',
  marginTop: '1rem'
}

export class AddStudentForm extends PureComponent {
  static propTypes = {
    createStudent: PropTypes.func.isRequired,
  }

  state = {}

  submitForm(event) {
    event.preventDefault()

    const batchId = this.props.batchId

    if (this.validateName() && this.validatePhoto()) {
      const newStudent = {
        name: this.refs.name.getValue(),
        photo: this.refs.photo.getValue(),
        evaluations: [{
          day: Date.now,
          color: 'orange',
          remark: ''
        }]
      }

      this.props.createStudent(batchId, newStudent)
      this.props.handleClose()
    }

    return false
  }

  validateName() {
    const { name } = this.refs

    if (name.getValue().length > 1) {
      this.setState({
        nameError: null
      })

      return true
    }

    this.setState({
      nameError: 'Name is required'
    })

    return false
  }

  validatePhoto() {
    const { photo } = this.refs

    if (photo.getValue().length > 1) {
      this.setState({
        photoError: null
      })

      return true
    }

    this.setState({
      photoError: 'Photo URL is required'
    })

    return false
  }

  render() {
    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <div className="input">
          <TextField ref="name" type="text" hintText="Student name:"
            fullWidth={true}
            onChange={this.validateName.bind(this)}
            errorText={ this.state.nameError}
          />

          <TextField ref="photo" type="text" hintText="Student photo(url):"
            fullWidth={true}
            style={ inputStyle }
            onChange={this.validatePhoto.bind(this)}
            errorText={ this.state.photoError}
          />
        </div>
        <div className="submit-form-btns">
          <RaisedButton
            style={ buttonStyle }
            onClick={ this.submitForm.bind(this) }
            label="Add new student"
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

export default connect(null, { createStudent })(AddStudentForm)
