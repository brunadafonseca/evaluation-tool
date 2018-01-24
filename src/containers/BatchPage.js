import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBatchById } from '../actions/batches/fetch'
import { AddStudentForm } from './AddStudentForm'
import addStudent from '../actions/batches/add-student'
import fetchStudents from '../actions/batches/fetch'
import Student from './Student'
import { batchShape } from './BatchItem'
import './BatchPage.css'
import { Link } from 'react-router-dom'

export class BatchPage extends PureComponent {
  state = {
    students: []
  }
  static propTypes = {
    ...batchShape,
    addStudent: PropTypes.func.isRequired,
    fetchBatchById: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchBatchById(this.props.match.params.batchId)
  }

  render() {
    const { _id, number, startDate, endDate } = this.props
    console.log(this.props.students)

    return (
      <div className="batch-container">
        <div className="batch">
          <p>Batch #{ number }</p>
          <p>Start date: { startDate }</p>
          <p>End date: { endDate }</p>
        </div>
        <div className="add-student">
          <AddStudentForm batchId={_id} addStudent={this.props.addStudent} />
        </div>
        <div className="students-list">
          {this.props.students && this.props.students.map(student => <Link to={`/students/${student._id}`}><Student  { ...student } /></Link>)}
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

export default connect(mapStateToProps, { fetchBatchById, addStudent, fetchStudents })(BatchPage)
