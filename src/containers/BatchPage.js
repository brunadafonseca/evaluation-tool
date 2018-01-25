import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBatchById } from '../actions/batches/fetch'
import { AddStudentForm } from './AddStudentForm'
import addStudent, { updateEvaluation } from '../actions/batches/update'
import fetchStudents from '../actions/batches/fetch'
import StudentItem from './StudentItem'
import { batchShape } from './BatchItem'
import './BatchPage.css'
import { Link } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export class BatchPage extends PureComponent {
  static propTypes = {
    ...batchShape,
    addStudent: PropTypes.func.isRequired,
    fetchBatchById: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchBatchById(this.props.match.params.batchId)
  }

  handleSubmit = () => {

  }

  // batchPerformance() {
  //   const students = this.props
  //   const green = "green"
  //   const orange = "orange"
  //   const red = "red"
  //    return students.filter(function() {
  //     return students.evaluations[0].color === green
  //     push... to blabla class=green
  //   })
  // }

  render() {
    const { _id, number, startDate, endDate, students } = this.props

    return (
      <div className="batch-container">
        <div className="batch">
          <h1>Batch #{ number }</h1>
          <div class="batch-dates">
            <p>Start date: { startDate && startDate.slice(0, 10) }</p>
            <p>End date: { endDate && endDate.slice(0, 10) }</p>
          </div>
        </div>
        <div className="batch-performance">
          <div className="green-bar"></div>
          <div className="orange-bar"></div>
          <div className="red-bar"></div>
        </div>
        <div className="add-student">
          <AddStudentForm batchId={_id} addStudent={this.props.addStudent} />
        </div>
        <div className="random-question-btn">
          <FloatingActionButton secondary={true} onClic={this.handleSubmit}>
              <ContentAdd />
          </FloatingActionButton>
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

export default connect(mapStateToProps, { fetchBatchById, addStudent, fetchStudents, updateEvaluation })(BatchPage)
