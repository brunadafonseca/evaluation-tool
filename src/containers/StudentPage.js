import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down'
import ActionThumbsUpDown from 'material-ui/svg-icons/action/thumbs-up-down'
import { updateEvaluation } from '../actions/batches/update'
import { fetchStudentById } from '../actions/batches/fetch'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import './StudentPage.css'

let color = ''

const buttonStyle = {
  marginRight: '0',
  marginTop: '1rem'
}

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

  updateBatchPerformance = () => {
    const batchId = this.props.match.params.batchId
    const { students } = this.props
    console.log(this.props)

    const greenStudents = (students.filter(student => {
      const evaluations = student.evaluations
      const latestEvaluation = evaluations[evaluations.length-1]
      return latestEvaluation.color === 'green'
    }))

    const orangeStudents = (students.filter(student => {
      const evaluations = student.evaluations
      const latestEvaluation = evaluations[evaluations.length-1]
      return latestEvaluation.color === 'orange'
    }))

    const redStudents = (students.filter(student => {
      const evaluations = student.evaluations
      const latestEvaluation = evaluations[evaluations.length-1]
      return latestEvaluation.color === 'red'
    }))

    const batchPerformance = {
      id: batchId,
      batchPerformance: {
        green: greenStudents,
        orange: orangeStudents,
        red: redStudents
      }
    }

    this.props.updateBatch(batchId, batchPerformance)
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
    console.log(this.props)
    const student = this.props.batches

    return (
      <div className="student-container">
        <div className="student">
          <div className="student-photo">
            <img src={ student && student.photo } alt=''/>
          </div>
          <div>
            <h1>{ student && student.name }</h1>
            <div class="evaluation-history">
              { student.evaluations && student.evaluations.map(evaluation => <div className={evaluation.color}></div>) }
            </div>
          </div>
        </div>

        <form onSubmit={this.submitForm.bind(this)}>
          <h1>Daily evaluation for {(new Date()).toDateString()}</h1>
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
            <RaisedButton
              style={ buttonStyle }
              onClick={ this.submitForm.bind(this) }
              label="Save"
              primary={true} />
            <RaisedButton
              style={ buttonStyle }
              onClick={ this.submitForm.bind(this) }
              label="Save and next"
              primary={true} />
          </form>
        </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps, { fetchStudentById, updateEvaluation })(StudentPage)
