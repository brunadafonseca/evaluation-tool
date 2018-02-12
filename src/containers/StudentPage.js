import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down'
import ActionThumbsUpDown from 'material-ui/svg-icons/action/thumbs-up-down'
import { updateStudent } from '../actions/students/update'
import { fetchStudentById } from '../actions/batches/fetch'
// import { fetchBatchById} from '../actions/batches/fetch'
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
    remark: ''
  }

  handleClick = (e) => {
    const selectedButton = e.currentTarget
    selectedButton.className = `${e.currentTarget.getAttribute('data-id')}`

    this.setState({
      color: e.currentTarget.getAttribute('data-id')
    })

    this.disableButtons(selectedButton)
  }

  handleChange = (e) => {
    this.setState({
      remark: e.target.value
    })
  }

  disableButtons = (selectedButton) => {
    const disabledButtons = selectedButton.parentNode.childNodes;

    for (var i = 0; i < disabledButtons.length; i++ ) {
      if (disabledButtons[i] !== selectedButton) {
        disabledButtons[i].className = "disabled"
      }
    }
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

  // updateBatchPerformance = () => {
  //   if (this.props.students === undefined) return null
  //   const batchId = this.props.match.params.batchId
  //   const { students } = this.props
  //   console.log(this.props)
  //
  //   const greenStudents = (students.filter(student => {
  //     const evaluations = student.evaluations
  //     const latestEvaluation = evaluations[evaluations.length-1]
  //     return latestEvaluation.color === 'green'
  //   }))
  //
  //   const orangeStudents = (students.filter(student => {
  //     const evaluations = student.evaluations
  //     const latestEvaluation = evaluations[evaluations.length-1]
  //     return latestEvaluation.color === 'orange'
  //   }))
  //
  //   const redStudents = (students.filter(student => {
  //     const evaluations = student.evaluations
  //     const latestEvaluation = evaluations[evaluations.length-1]
  //     return latestEvaluation.color === 'red'
  //   }))
  //
  //   const batchPerformance = {
  //     id: batchId,
  //     batchPerformance: {
  //       green: greenStudents,
  //       orange: orangeStudents,
  //       red: redStudents
  //     }
  //   }
  //
  //   this.props.updateBatch(batchId, batchPerformance)
  // }


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

  editRemark = (e) => {
    console.log(this.props.day)
    return <p>{this.props.day}</p>
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
            { evaluations.map(evaluation => <div className={evaluation.color} onClick={this.editRemark.bind(this)} evaluation={evaluation}></div>)}
          </div>
        </div>

        <form className="add-evaluation" onSubmit={this.submitForm.bind(this)}>
          <h3>Daily evaluation for {(new Date()).toDateString()}</h3>
            <div className="evaluation-btns">
              <div className="green"
                   data-id="green"
                   onClick={this.handleClick.bind(this)}>

                   <ActionThumbUp style={{ color: '#fff' }} />
              </div>

              <div className="orange"
                   data-id="orange"
                   onClick={this.handleClick.bind(this)}>

                   <ActionThumbsUpDown style={{ color: '#fff' }} />
              </div>

              <div className="red"
                   data-id="red"
                   onClick={this.handleClick.bind(this)}>

                   <ActionThumbDown style={{ color: '#fff' }} />
              </div>
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
                style={ buttonStyle }
                onClick={ this.submitForm.bind(this) }
                label="Save"
                primary={true} />

              <RaisedButton
                onClick={ this.submitForm.bind(this) }
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
