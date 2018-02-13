import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { updateStudent } from '../actions/students/update'
import { fetchStudentById } from '../actions/batches/fetch'

import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down'
import ActionThumbsUpDown from 'material-ui/svg-icons/action/thumbs-up-down'
import RaisedButton from 'material-ui/RaisedButton'

import './StudentPage.css'

const buttonStyle = {
  marginRight: '1rem',
}

export class StudentPage extends PureComponent {

  componentWillMount() {
    const batchId = (this.props.match.params.batchId)
    const studentId = (this.props.match.params.studentId)

    this.props.fetchStudentById(batchId, studentId)
  }

  state = {
    color: '',
    remark: '',
    today: new Date().toDateString()
  }

  handleClick = (e) => {
    e.preventDefault()

    this.setState({
      color: e.currentTarget.value
    })
  }

  handleChange = (e) => {
    this.setState({
      remark: e.target.value
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
      colorError: 'Color is required'
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

  submitForm(event) {
    event.preventDefault()

    if (this.validateColor() && this.validateRemark()) {
      const student = this.props.student
      const batchId = this.props.match.params.batchId
      const evaluations = this.props.student.evaluations

      const newEvaluation = {
          day: Date.now(),
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
    if (!this.props.student) return null
    const { name, photo, evaluations } = this.props.student

    return (
      <div className="student-container">
        <div className="student">
          <img src={ photo } alt=''/>
          <h1>{ name }</h1>

          <p>Last evaluations: </p>

          <div className="evaluations">
            { evaluations.map(evaluation => <div className={evaluation.color}
                                                 onClick={() => this.viewEvaluation(evaluation._id)}
                                                 key={evaluation._id} >
                                            </div>)}
          </div>
        </div>

        <form className="add-evaluation" onSubmit={this.submitForm.bind(this)}>
          <h3>Evaluation for {(this.state.day) ? new Date(this.state.day).toDateString() : this.state.today}</h3>

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

            <div className="submit-form">
              <RaisedButton
                style={buttonStyle}
                onClick={this.submitForm.bind(this)}
                label="Save"
                primary={true} />

              <RaisedButton
                onClick={this.submitForm.bind(this)}
                label="Save and next"
                primary={true} />
            </div>
          </form>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  student: state.batches.selectedStudent
})

export default connect(mapStateToProps, { fetchStudentById, updateStudent })(StudentPage)
