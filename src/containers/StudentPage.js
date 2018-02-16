import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { updateStudent } from '../actions/students/update'
import { deleteStudent } from '../actions/students/delete'
import { fetchStudentById } from '../actions/students/fetch'
import { fetchBatchById } from '../actions/batches/fetch'
import EditStudent from '../components/forms/EditStudent'

import './StudentPage.css'

import {
  Paper,
  FloatingActionButton,
  ContentCreate,
  ActionDelete,
  Dialog,
  RaisedButton,
  FlatButton,
  ActionThumbUp,
  ActionThumbDown,
  ActionThumbsUpDown
} from './material-ui'

const buttonStyle = {
  marginRight: '1rem',
}

const customContentStyle = {
  width: '400px',
  maxWidth: '400px',
  fontSize: '2rem',
  textAlign: 'center',
}

const paperStyle = {
  fontFamily: 'Source Sans Pro'
}

export class StudentPage extends PureComponent {

  componentWillMount() {
    const batchId = (this.props.match.params.batchId)

    this.props.fetchBatchById(batchId)
  }

  state = {
    color: '',
    remark: '',
    today: new Date().toDateString(),
    open: false,
    showConfirmation: false,
  }

  toggleShowConfirmationState = () => {
    this.setState({
      showConfirmation: !this.state.showConfirmation,
    })
  }

  toggleOpenState = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  deleteStudent = () => {
    const studentId = this.props.student._id
    const batchId = this.props.batch._id

    this.props.deleteStudent(batchId, studentId)
    this.toggleShowConfirmationState()
  }

  handleClick = (event) => {
    event.preventDefault()

    this.setState({
      color: event.currentTarget.value
    })
  }

  handleChange = (event) => {
    this.setState({
      remark: event.target.value
    })
  }

  validateColor = () => {
    if (this.state.color.length > 1) {
      this.setState({
        colorError: null
      })
      return true
    }

    this.setState({
      colorError: 'Color tag is required'
    })
    return false
  }

  validateRemark = () => {
    if ((this.state.color === 'red' || this.state.color === 'orange') && (this.state.remark.length < 1 )) {

      this.setState({
        remarkError: 'Remark is required for orange and red color tags'
      })
      return false
    }

    this.setState({
      remarkError: null
    })
    return true
  }

  saveAndNext = () => {
    this.updateStudentEvaluations()
    this.goToNextStudent()
  }

  updateStudentEvaluations = () => {
    if (this.validateColor() && this.validateRemark()) {
      const student = this.props.student
      const batchId = this.props.match.params.batchId
      const evaluations = this.props.student.evaluations

      const newEvaluation = {
        day: new Date(),
        color: this.state.color,
        remark: this.state.remark,
      }

      const allEvaluations = evaluations.filter(evaluation => {
        const evaluationDate = new Date(evaluation.day).toDateString()
        const newEvaluationDate = new Date(newEvaluation.day).toDateString()

        return ( evaluationDate !== newEvaluationDate )
      })

      const updatedStudent = {
        ...student,
        evaluations: [ ...allEvaluations, {...newEvaluation}]
      }

      this.props.updateStudent(batchId, updatedStudent)
    }

    return false
  }

  viewEvaluation = (id) => {
    const evaluations = this.props.student.evaluations
    const selectedEvaluation = evaluations.filter(evaluation => evaluation._id === id)[0]

    this.setState({
      color: selectedEvaluation.color,
      day: selectedEvaluation.day,
      remark: selectedEvaluation.remark
    })
  }

  findNextStudentId = () => {
    const students = this.props.batch.students
    const studentId = this.props.student._id

    const studentIndex = students.findIndex(student => student._id === studentId)
    const nextStudentIndex = studentIndex + 1

    if (nextStudentIndex === students.length ) {
      return students[0]._id
    }

    return students[nextStudentIndex]._id
  }

  goToNextStudent = () => {
    const nextStudentId = this.findNextStudentId()
    const batchId = this.props.batch._id

    this.props.replace(`/batches/${batchId}/students/${nextStudentId}`)
  }

  renderButton = (color) => {
    return (
      <button className={`${color} ${this.state.color === `${color}` ? `active` : null}`}
              value={color}
              onClick={this.handleClick}>

              {(color === 'green') ? <ActionThumbUp style={{ color: '#fff' }} /> : null}
              {(color === 'orange') ? <ActionThumbsUpDown style={{ color: '#fff' }} /> : null}
              {(color === 'red') ? <ActionThumbDown style={{ color: '#fff' }} /> : null}
      </button>
    )
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.toggleShowConfirmationState}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={this.deleteStudent}
      />
    ]

    if (!this.props.batch || !this.props.student) return null
    const { name, photo, evaluations } = this.props.student

    return (
      <Paper className="student-container" style={paperStyle}>
        <div className="student">

          <div className="photo">
            <img src={ photo } alt=''/>
          </div>

          <div className="student-info">
            <h1>{ name }</h1>
            <p className="batch-number">Batch #{this.props.batch.number}</p>
            <div className="last-evaluations">
              <p>Last evaluations: </p>
              <div className="evaluations">
                { evaluations.map(evaluation => <div className={evaluation.color}
                                                     onClick={() => this.viewEvaluation(evaluation._id)}
                                                     key={evaluation._id} >
                                                </div>)}
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <FloatingActionButton secondary={true} onClick={this.toggleOpenState}>
              <ContentCreate />
            </FloatingActionButton>
            <Dialog
              title="Edit student:"
              modal={false}
              contentStyle={customContentStyle}
              open={this.state.open}
              onRequestClose={this.toggleOpenState}
            >
              <EditStudent {...this.props.student} batchId={this.props.match.params.batchId} toggleOpenState={this.toggleOpenState} /> }
            </Dialog>

            <FloatingActionButton onClick={this.toggleShowConfirmationState} secondary={true}>
              <ActionDelete />
            </FloatingActionButton>

            <Dialog
              actions={actions}
              contentStyle={customContentStyle}
              modal={false}
              open={this.state.showConfirmation}
              onRequestClose={this.handleClose}
            >
              Are you sure you want to delete this student?
            </Dialog>
          </div>
        </div>

        <form onSubmit={this.updateStudentEvaluations.bind(this)}>
          <h1>Evaluation for {(this.state.day) ? new Date(this.state.day).toDateString() : this.state.today}</h1>
          <div className="input-field">
            <div className="evaluation-btns">
              {this.renderButton('green')}
              {this.renderButton('orange')}
              {this.renderButton('red')}
            </div>

            <textarea
              placeholder="Add a remark..."
              value={this.state.remark}
              onChange={this.handleChange}>
            </textarea>

            <p className="error-text">{this.state.remarkError}</p>
            <p className="error-text">{this.state.colorError}</p>
          </div>

          <div className="submit-form">
            <RaisedButton
              style={buttonStyle}
              onClick={this.updateStudentEvaluations.bind(this)}
              label="Save"
              primary={true} />

            <RaisedButton
              onClick={this.saveAndNext}
              label="Save and next"
              primary={true} />
          </div>
        </form>
      </Paper>
    )
  }
}

const mapStateToProps = ({ batches }, { match }) => ({
  batch: batches.selectedBatch,
  student: batches.selectedBatch.students.find(student => student._id === match.params.studentId)
})

export default connect(mapStateToProps, { fetchStudentById, fetchBatchById, updateStudent, deleteStudent, replace })(StudentPage)
