import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBatchById } from '../actions/batches/fetch'
import { AddStudentForm } from './AddStudentForm'
import updateBatch, { updateEvaluation, updateBatchPerformance } from '../actions/batches/update'
import { createStudent } from '../actions/students/create'
import fetchStudents from '../actions/batches/fetch'
import StudentItem from './StudentItem'
import { batchShape } from './BatchItem'
import './BatchPage.css'
import RaisedButton from 'material-ui/RaisedButton'

export class BatchPage extends PureComponent {
  static propTypes = {
    ...batchShape,
    createStudent: PropTypes.func.isRequired,
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

  showPercentage(arr) {
    const totalStudents = this.props.students.length
    return (arr.length / totalStudents) * 100
  }

  renderStudents() {
    const students = this.props.students
    return students.map(student => <StudentItem updateEvaluation={this.props.updateEvaluation} {...student} /> )
  }

  render() {
    console.log(this.props)
    const { number, startDate, endDate, batchPerformance, students } = this.props

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
          <AddStudentForm batchId={this.props.match.params.batchId} createStudent={this.props.createStudent} />
        </div>
        <div className="batch-performance">
          <div className='green-bar'>{ (batchPerformance && this.showPercentage(batchPerformance.green)) || 0 }%</div>
          <div className='orange-bar'>{ (batchPerformance && this.showPercentage(batchPerformance.orange)) || 0 }%</div>
          <div className='red-bar'>{ (batchPerformance && this.showPercentage(batchPerformance.red)) || 0 }%</div>
        </div>
        <div className="students-list">
          {students && this.renderStudents()}
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

export default connect(mapStateToProps, { fetchBatchById, createStudent, fetchStudents, updateEvaluation, updateBatchPerformance, updateBatch })(BatchPage)
