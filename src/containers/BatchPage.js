import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

import { AddStudentForm } from './AddStudentForm'
import StudentItem from './StudentItem'
import { batchShape } from './BatchItem'

import { createStudent } from '../actions/students/create'
import fetchStudents, { fetchBatchById } from '../actions/batches/fetch'
import updateBatch, { updateEvaluation, updateBatchPerformance } from '../actions/batches/update'
import {deleteBatch} from '../actions/batches/delete'

import './BatchPage.css'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionDelete from 'material-ui/svg-icons/action/delete';

export class BatchPage extends PureComponent {
  static PropTypes = {
    ...batchShape
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
    const totalStudents = this.props.selectedBatch.students.length

    return (arr.length / totalStudents) * 100
  }

  renderStudents() {
    const students = this.props.students

    return students.map(student => <StudentItem batchId={this.props.selectedBatch._id}
                                                studentId={student._id}
                                                name={student.name}
                                                photo={student.photo}
                                                evaluations={student.evaluations} />)
  }

  handleClick = () => {
    const batchId = this.props.selectedBatch._id

    this.props.deleteBatch(batchId)
  }

  render() {
    const { number, startDate, endDate, batchPerformance, students, _id } = this.props

    return (
      <div className="batch-container">
        <header>
          <div className="batch-info">
            <h1>Batch #{ number }</h1>
            <div className="batch-dates">
              <p>Start date: { startDate && startDate.slice(0, 10) }</p>
              <p>End date: { endDate && endDate.slice(0, 10) }</p>
            </div>
          </div>
          <div className="edit-buttons">
            <div>
              <FloatingActionButton>
                <ContentCreate />
              </FloatingActionButton>
            </div>
            <div>
              <FloatingActionButton>
                <ActionDelete onClick={this.handleClick} />
              </FloatingActionButton>
            </div>
          </div>
        </header>
        <div className="add-student">
          <div className="random-student">
            <button onClick={this.pickStudent} primary={true}>Unlucky student</button>
          </div>
          <AddStudentForm batchId={this.props.match.params.batchId} createStudent={this.props.createStudent} />
        </div>
        <div className="batch-performance">
          <div className='green-bar'>{ (batchPerformance && this.showPercentage(batchPerformance.green)) || 0 }%</div>
          <div className='orange-bar'>{ (batchPerformance && this.showPercentage(batchPerformance.orange)) || 0 }%</div>
          <div className='red-bar'>{ (batchPerformance && this.showPercentage(batchPerformance.red)) || 0 }%</div>
        </div>
        <div className="students-list">
          {this.renderStudents()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedBatch: state.batches.selectedBatch,
  students: state.batches.selectedBatch.students
})

export default connect(mapStateToProps, { fetchBatchById, createStudent, fetchStudents, updateEvaluation, updateBatchPerformance, updateBatch, deleteBatch })(BatchPage)
