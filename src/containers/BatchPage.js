import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { AddStudentForm } from './AddStudentForm'
import StudentItem from './StudentItem'

import { createStudent } from '../actions/students/create'
import fetchStudents, { fetchBatchById } from '../actions/batches/fetch'
import updateBatch, { updateEvaluation, updateBatchPerformance } from '../actions/batches/update'
import {deleteBatch} from '../actions/batches/delete'

import './BatchPage.css'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionDelete from 'material-ui/svg-icons/action/delete';

export class BatchPage extends PureComponent {

  componentWillMount() {
    this.props.fetchBatchById(this.props.match.params.batchId)
  }

  pickStudent = () => {
    const randomNumber = Math.random()
    const student = (this.getStudent(randomNumber))

    alert(student.name)
  }

  getStudent = (randomNumber) => {
    const codeRed = this.filterByColor('red')
    const codeGreen = this.filterByColor('green')
    const codeOrange = this.filterByColor('orange')

    if ( randomNumber <= 0.5 ) {
      return codeRed[Math.floor(Math.random()*codeRed.length)]
    } else if ( randomNumber > 0.5 && randomNumber <= 0.8 ) {
      return codeOrange[Math.floor(Math.random()*codeOrange.length)]
    } else {
      return codeGreen[Math.floor(Math.random()*codeGreen.length)]
    }
  }

  getLastEvaluation() {
    const batchPerformance = this.props.students.map(student => {
      return {...student, latestEvaluation: student.evaluations[student.evaluations.length-1]}
    })
    return batchPerformance
  }

  showPercentage(color) {
    const totalStudents = this.props.students.length
    const colorPercentage = this.filterByColor(color)

    return (colorPercentage.length / totalStudents) * 100
  }

  filterByColor(color) {
    const batchPerformance = this.getLastEvaluation()
    const colorPercentage = batchPerformance.filter(student => student.latestEvaluation.color === color)

    return colorPercentage
  }

  renderStudents() {
    const students = this.props.students

    return students.map(student => <StudentItem batchId={this.props.selectedBatch._id}
                                                studentId={student._id}
                                                key={student._id}
                                                name={student.name}
                                                photo={student.photo}
                                                evaluations={student.evaluations} />)
  }

  handleClick = () => {
    const batchId = this.props.selectedBatch._id

    this.props.deleteBatch(batchId)
  }

  render() {
    if (!this.props.students || !this.props.selectedBatch) return null
    const { number, startDate, endDate } = this.props.selectedBatch
    const greenPercentage = this.showPercentage('green')
    const orangePercentage = this.showPercentage('orange')
    const redPercentage = this.showPercentage('red')

    return (
      <div className="batch-container">
        <header>
          <div className="batch-info">
            <h1>Batch #{ number }</h1>
            <div className="batch-dates">
              <p>Start date: { new Date(startDate).toDateString() }</p>
              <p>End date: { new Date(endDate).toDateString() }</p>
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
            <button onClick={this.pickStudent} primary="true">Unlucky student</button>
          </div>
          <AddStudentForm batchId={this.props.match.params.batchId} createStudent={this.props.createStudent} />
        </div>
        <div className="batch-performance">
          <div className='green-bar' style={{ width: `${greenPercentage}%`}}>{ `${greenPercentage}%` || null }</div>
          <div className='orange-bar'style={{ width: `${orangePercentage}%`}}>{ `${orangePercentage}%` || null }</div>
          <div className='red-bar'style={{ width: `${redPercentage}%`}}>{ `${redPercentage}%` || null }</div>
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
