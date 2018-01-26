import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down'
import ActionThumbsUpDown from 'material-ui/svg-icons/action/thumbs-up-down'
import { updateEvaluation } from '../actions/batches/update'
import { fetchStudentById } from '../actions/batches/fetch'
import TextField from 'material-ui/TextField'
import './StudentPage.css'

let color = ''

export class StudentPage extends PureComponent {

  componentWillMount() {
    color = ''
    const batchId = (this.props.match.params.batchId)
    const studentId = (this.props.match.params.studentId)

    this.props.fetchStudentById(batchId, studentId)
  }

  handleClick = (e) => {
    color = e.currentTarget.getAttribute('data-id')
    console.log(color)
  }

  submitForm(event) {
    event.preventDefault()
    if (this.validateColor()) {
      const batchId = this.props.match.params.batchId
      const studentId = this.props.match.params.studentId

      const newEvaluation = {
          day: Date.now,
          color: color,
          remark: this.refs.remark.getValue(),
      }

      this.props.updateEvaluation(batchId, studentId, newEvaluation)
    }
    return false
  }

  validateColor = () => {
    if (color.length > 1) {
      this.setState({
        nameError: null
      })
      return true
    }

    console.log('color is required')
    return false
  }

  render() {
    const student = this.props.student

    return (
      <div className="student-page">
        <div className="student">
          <h1>{ student && student.name }</h1>
          <img src={ student && student.photo } />
        </div>
        <div class="evaluation-history">
          { student.evaluations && student.evaluations.map(evaluation => <div className={evaluation.color}></div>) }
        </div>
        <form onSubmit={this.submitForm.bind(this)}>
          <div className="evaluation-wrap">
            <div className="evaluation-btns">
              <FloatingActionButton
                data-id="green"
                onClick={this.handleClick.bind(this)}
                className="green"
                backgroundColor="#00B749">
                <ActionThumbUp />
              </FloatingActionButton>
              <FloatingActionButton
                data-id="orange"
                onClick={this.handleClick.bind(this)}
                className="orange"
                backgroundColor="#FFBA08">
                <ActionThumbsUpDown />
              </FloatingActionButton>
              <FloatingActionButton
                data-id="red"
                onClick={this.handleClick.bind(this)}
                className="red"
                backgroundColor="#D00000">
                <ActionThumbDown />
              </FloatingActionButton>
            </div>
              <div className="remarks-field">
                <TextField
                  ref="remark"
                  type="text"
                  hintText="Add a remark" />
              </div>
            </div>
            <button onClick={this.submitForm.bind(this)}>Submit</button>
          </form>
        </div>
    )
  }
}

const mapStateToProps = ({ student }) => ({ student })

export default connect(mapStateToProps, { fetchStudentById, updateEvaluation })(StudentPage)
