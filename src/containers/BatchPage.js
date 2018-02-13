import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { AddStudentForm } from './AddStudentForm'
import StudentItem from './StudentItem'

import { createStudent } from '../actions/students/create'
import fetchStudents, { fetchBatchById } from '../actions/batches/fetch'
import updateBatch, { updateEvaluation, updateBatchPerformance } from '../actions/batches/update'
import {deleteBatch} from '../actions/batches/delete'

import './BatchPage.css'
import Paper from 'material-ui/Paper'
import ContentAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentCreate from 'material-ui/svg-icons/content/create'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar'
import RaisedButton from 'material-ui/RaisedButton'

const customContentStyle = {
  width: '400px',
  minHeight: '360px',
  maxWidth: '400px',
}

export class BatchPage extends PureComponent {

  componentWillMount() {
    this.props.fetchBatchById(this.props.match.params.batchId)
  }

  state = {
    open: false,
    message: "Student created!"
  }

  pickStudent = () => {
    const student = (this.getStudent())

    alert(student.name)
  }

  getStudent = () => {
    const randomNumber = Math.random()
    const codeRed = this.filterByColor('red')
    const codeGreen = this.filterByColor('green')
    const codeOrange = this.filterByColor('orange')

    if ( randomNumber <= 0.5 ) {
      if ( codeRed.length > 0 ) {
        return codeRed[Math.floor(Math.random()*codeRed.length)]
      } else {
        return this.getStudent()
      }
    }
    if ( randomNumber > 0.5 && randomNumber <= 0.8 ) {
      if ( codeOrange.length > 0 ) {
        return codeOrange[Math.floor(Math.random()*codeOrange.length)]
      } else {
        return this.getStudent()
      }
    }
    if ( randomNumber > 0.8 ) {
      if ( codeGreen.length > 0 ) {
      return codeGreen[Math.floor(Math.random()*codeGreen.length)]
    } else {
      return this.getStudent()
    }
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

    return Math.round((colorPercentage.length / totalStudents) * 100)
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

  deleteBatch = () => {
    const batchId = this.props.selectedBatch._id

    this.props.deleteBatch(batchId)
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    if (!this.props.students || !this.props.selectedBatch) return null

    const { number, startDate, endDate } = this.props.selectedBatch

    const greenPercentage = this.showPercentage('green')
    const orangePercentage = this.showPercentage('orange')
    const redPercentage = this.showPercentage('red')

    return (
      <div className="batch-container">
        <Paper className="batch-card">
          <div className="batch-info">
            <h1>Batch #{ number }</h1>
            <div className="batch-dates">
              <p>Start date: { new Date(startDate).toDateString() }</p>
              <p>End date: { new Date(endDate).toDateString() }</p>
            </div>
          </div>
          <div className="edit-buttons">
              <FloatingActionButton secondary={true}>
                <ContentCreate />
              </FloatingActionButton>

              <FloatingActionButton onClick={this.deleteBatch} secondary={true}>
                <ActionDelete />
              </FloatingActionButton>

              <FloatingActionButton onClick={this.handleOpen} secondary={true}>
                <ContentAdd />
              </FloatingActionButton>
              <Dialog
                title="Add new student"
                modal={false}
                contentStyle={customContentStyle}
                open={this.state.open}
                onRequestClose={this.handleClose} >

                <AddStudentForm
                  handleClose={this.handleClose}
                  createStudent={this.props.createStudent}
                  switchSnackbarState={this.switchSnackbarState}
                  batchId={this.props.match.params.batchId}
                />
              </Dialog>

              <Snackbar
                open={this.state.openSnackbar}
                message={this.state.message}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
              />
          </div>
        </Paper>
        { (this.props.students.length > 0) &&
          <div>
            <div className="batch-performance">
              {greenPercentage > 0 && <div className='green-bar' style={{ width: `${greenPercentage}%`}}>{ `${greenPercentage}%` || null }</div>}
              {orangePercentage > 0 && <div className='orange-bar'style={{ width: `${orangePercentage}%`}}>{ `${orangePercentage}%` || null }</div>}
              {redPercentage > 0 && <div className='red-bar'style={{ width: `${redPercentage}%`}}>{ `${redPercentage}%` || null }</div>}
            </div>

          <div className="header">
            <h1 className="batches-header">Students: </h1>
            <div className="random-student">
              <RaisedButton label="Random student" onClick={this.pickStudent} secondary={true} />
            </div>
          </div>

          <div className="students-list">
            {this.renderStudents()}
          </div>
          </div>
          }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedBatch: state.batches.selectedBatch,
  students: state.batches.selectedBatch.students
})

export default connect(mapStateToProps, { fetchBatchById, createStudent, fetchStudents, updateEvaluation, updateBatchPerformance, updateBatch, deleteBatch })(BatchPage)
