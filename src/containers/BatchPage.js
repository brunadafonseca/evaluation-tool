import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBatchById } from '../actions/batches/fetch'
import { AddStudentForm } from './AddStudentForm'
import updateBatch, { addStudent, updateEvaluation, updateBatchPerformance } from '../actions/batches/update'
import fetchStudents from '../actions/batches/fetch'
import StudentItem from './StudentItem'
import { batchShape } from './BatchItem'
import './BatchPage.css'
import RaisedButton from 'material-ui/RaisedButton'

export class BatchPage extends PureComponent {
  static propTypes = {
    ...batchShape,
    addStudent: PropTypes.func.isRequired,
    fetchBatchById: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchBatchById(this.props.match.params.batchId)
  }

  pickStudent = () => {
  const randomNumber = Math.random()
  const student = (this.getStudent(randomNumber))
  alert(student.name)
  }

  getStudent = (randomNumber) => {
    const codeRed = this.props.batchPerformance.red
    const codeGreen = this.props.batchPerformance.green
    const codeOrange = this.props.batchPerformance.orange

    if ( randomNumber <= 0.5 ) {
      return codeRed[Math.floor(Math.random()*codeRed.length)]
    } else if ( randomNumber > 0.5 && randomNumber <= 0.8 ) {
      return codeOrange[Math.floor(Math.random()*codeOrange.length)]
    } else {
      return codeGreen[Math.floor(Math.random()*codeGreen.length)]
    }
  }

  componentWillUpdate() {
    const { students } = this.props
    if ( students &&
      students.evaluations &&
      students.evaluations[students.evaluation.length-1] ) {
      this.updateBatchPerformance()
    }
  }

  checkClassProgress = () => {
    const batchId = this.props.match.params.batchId
    const { students } = this.props
    console.log(this.props)

    const redStudents = (students && students.filter(student => {
      const evaluations = student.evaluations
      const latestEvaluation = evaluations[evaluations.length-1]
      return latestEvaluation && latestEvaluation.color === 'red'
    }))

    const orangeStudents = (students && students.filter(student => {
      const evaluations = student.evaluations
      const latestEvaluation = evaluations[evaluations.length-1]
      return latestEvaluation && latestEvaluation.color === 'orange'
  }))

    const greenStudents = (students && students.filter(student => {
      const evaluations = student.evaluations
      const latestEvaluation = evaluations[evaluations.length-1]
      return latestEvaluation && latestEvaluation.color === 'green'
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

  showPercentage(arr) {
    const totalStudents = this.props.students.length
    return (arr.length / totalStudents) * 100
  }

  render() {
    const { number, startDate, endDate, batchPerformance } = this.props

    return (
      <div className="batch-container">
        <div className="batch-page">
          <h1>Batch #{ number }</h1>
          <div className="batch-dates">
            <p>Start date: { startDate && startDate.slice(0, 10) }</p>
            <p>End date: { endDate && endDate.slice(0, 10) }</p>
          </div>
        </div>
        <RaisedButton label="Check class progress" onClick={this.checkClassProgress} primary={true} />
        <RaisedButton label="Random Student" onClick={this.pickStudent} primary={true} />
        <div className="add-student">
          <AddStudentForm batchId={this.props.match.params.batchId} addStudent={this.props.addStudent} />
        </div>
        <div className="batch-performance">
          <div className='green-bar'>{ (batchPerformance && this.showPercentage(batchPerformance.green)) || 0 }%</div>
          <div className='orange-bar'>{ (batchPerformance && this.showPercentage(batchPerformance.orange)) || 0 }%</div>
          <div className='red-bar'>{ (batchPerformance && this.showPercentage(batchPerformance.red)) || 0 }%</div>
        </div>
        <div className="students-list">
          {this.props.students && this.props.students.map(student => <StudentItem updateEvaluation={this.props.updateEvaluation} { ...student } /> )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }, { match }) => {
  const batch = batches.reduce((prev, next) => {
    if (next._id === match.params.batchId) {
      return next
    }
    return prev
  }, {})

  return {
    ...batch
  }
}

export default connect(mapStateToProps, { fetchBatchById, addStudent, fetchStudents, updateEvaluation, updateBatchPerformance, updateBatch })(BatchPage)
