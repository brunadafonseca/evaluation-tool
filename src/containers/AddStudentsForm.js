import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import addStudent from '../actions/batches/add'
import Title from '../components/UI/Title'
import DatePicker from 'material-ui/DatePicker'

const dialogStyle = {
  width: '400px',
  margin: '50px auto',
  padding: '2rem',
}

const buttonStyle = {
  float: 'right',
  marginLeft: '2rem',
}

export class AddStudentsForm extends PureComponent {
  static propTypes = {
    addStudent: PropTypes.func.isRequired,
  }

  state = {}

  submitForm(event) {
    event.preventDefault()
    if (this.validateNumber() && this.validatePhoto()) {
      const student = {
        name: this.refs.name.getValue(),
        photo: this.refs.photo.getValue(),
      }
      this.props.addStudent(student)
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
      <Paper style={ dialogStyle }>
        <Title content="Add student" level={2} />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <TextField ref="name" type="text" hintText="Student name:"
              onChange={this.validateName.bind(this)}
              errorText={ this.state.nameError}
            />
          <TextField ref="photo" type="text" hintText="Student photo(url):"
              onChange={this.validatePhoto.bind(this)}
              errorText={ this.state.photoError}
            />
          </div>
        </form>
        <RaisedButton
          style={ buttonStyle }
          onClick={ this.submitForm.bind(this) }
          label="Create new batch"
          primary={true} />
      </Paper>
    )
  }
}



export default connect(null, { createBatch })(CreateBatch)
